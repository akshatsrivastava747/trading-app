require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");

const YahooFinance = require("yahoo-finance2").default;
const yahooFinance = new YahooFinance();


const { HoldingsModel } = require("./model/HoldingsModel");

const { OrdersModel } = require("./model/OrdersModel");

const { UsersModel } = require("./model/UsersModel");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;
const api_key = process.env.FINNHUB_API_KEY;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.userId; // 🔥 attach user
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};



app.use(cors({
  origin: [
    "https://trading-app-frontend-35mm.onrender.com",
    "https://trading-dashboard-51vb.onrender.com"
  ]
}));

app.use(bodyParser.json());

// get logged-in user profile
app.get("/profile", authMiddleware, async (req, res) => {
  try {
    // req.userId comes from authMiddleware
    const user = await UsersModel.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json(user);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({
      error: "Server error",
    });
  }
});

app.get("/nifty", async (req, res) => {
  try {
    const data = await yahooFinance.quote("^NSEI");

    res.json({
      price: data.regularMarketPrice,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch Nifty" });
  }
});

app.get("/sensex", async (req, res) => {
  try {
    const data = await yahooFinance.quote("^BSESN");

    res.json({
      price: data.regularMarketPrice,
      change: data.regularMarketChange,
      percent: data.regularMarketChangePercent,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch Sensex" });
  }
});

app.get("/stock/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol;

    // Finnhub quote endpoint
    const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
      params: {
        symbol: symbol,
        token: api_key,
      },
    });

    const data = response.data;

    if (!data || data.c === 0 || data.c === null) {
      return res.json({
        symbol,
        price: "N/A",
        percent: "0%",
        isDown: false,
      });
    }

    res.json({
      symbol,
      price: data.c, // current price
      percent: (data.dp || 0).toFixed(2) + "%",
      isDown: data.d < 0,
    });
  } catch (err) {
    console.log("Finnhub error:", err.response?.data || err.message);

    res.json({
      symbol: req.params.symbol,
      price: "N/A",
      percent: "0%",
      isDown: false,
    });
  }
});

app.get("/search/:query", async (req, res) => {
  try {
    const query = req.params.query;

    // prevent empty search
    if (!query || query.trim() === "") {
      return res.json([]);
    }

    const response = await axios.get("https://finnhub.io/api/v1/search", {
      params: {
        q: query,
        token: api_key,
      },
    });

    // Finnhub returns many fields → we simplify
    const results = response.data.result.map((stock) => ({
      symbol: stock.symbol,
      description: stock.description,
      type: stock.type,
    }));

    res.json(results);
  } catch (err) {
    console.log("FULL ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "Stock fetch failed" });
  }
});

app.get("/allHoldings", authMiddleware, async (req, res) => {
  let allHoldings = await HoldingsModel.find({
    userId: req.userId,
  });
  res.json(allHoldings);
});

app.get("/allOrders", authMiddleware, async (req, res) => {
  let allOrders = await OrdersModel.find({
    userId: req.userId,
  });
  res.json(allOrders);
});

app.get("/holding/:symbol", authMiddleware, async (req, res) => {
  const holding = await HoldingsModel.findOne({
    symbol: req.params.symbol,
    userId: req.userId,
  });

  res.json({
    qty: holding ? holding.qty : 0,
  });
});

app.post("/newOrder", authMiddleware, async (req, res) => {
  try {
    const { symbol,name, qty, price, mode } = req.body;
    const userId = req.userId;

    if (!Number.isInteger(qty) || qty <= 0) {
      return res.status(400).send("Invalid quantity");
    }

    // BUY logic
    if (mode === "BOUGHT") {
      const existing = await HoldingsModel.findOne({
        symbol,
        userId,
      });
    
      // new holding
      if (!existing) {
        await HoldingsModel.create({
          userId,
          symbol,
          name,
          qty,
          avg: price,   // first buy price = avg
          price,
        });
      } 
      // update existing holding
      else {
        const totalCost =
          existing.qty * existing.avg + qty * price;
    
        const newQty = existing.qty + qty;
    
        existing.avg = totalCost / newQty; // ⭐ weighted average
        existing.qty = newQty;
        existing.price = price;
    
        await existing.save();
      }
    }

    // SELL logic
    if (mode === "SOLD") {
      const holding = await HoldingsModel.findOne({
        symbol,
        userId,
      });
    
      // no holding found
      if (!holding) {
        return res.status(400).send("No holdings found for this stock");
      }
    
      // not enough quantity
      if (holding.qty < qty) {
        return res.status(400).send("Not enough quantity to sell");
      }
    
      // reduce quantity
      holding.qty -= qty;
    
      if (holding.qty === 0) {
        await HoldingsModel.deleteOne({ _id: holding._id });
      } else {
        await holding.save();
      }
    }

    // save order
    let newOrder = new OrdersModel({
      userId,
      symbol,
      name,
      qty,
      price,
      mode,
    });

    await newOrder.save();

    res.send("done");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check if user already exists
    const existingUser = await UsersModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        error: "Username or email already exists",
      });
    }

    const newUser = new UsersModel({
      username,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UsersModel.findOne({ username });

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  res.json({ token });
});

app.listen(PORT, () => {
  console.log("app started");
  mongoose.connect(url);
  console.log("DB connected!");
});
