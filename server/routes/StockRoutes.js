import express from "express";
import {
  AddtoWatchList,
  BuyStock,
  GetBalance,
  GetUserAllStocks,
  GetWatchList,
  SearchStock,
  deleteFromWatchList,
  soldStock,
  // AllSectorData,
  // AllTopstocksAllCap,
  // Get52WeekSummary,
  // GetIndices,
  // GetStockDetails,
} from "../controllers/StockControllers.js";
import { verifyTokenandUser } from "../util/verifyToken.js";

const router = express.Router();

// //*Get Stock price by symbol

// router.get("/allindices", GetIndices);

// //*Get all Top Top gainers, losers,by volumes, 52W high, 52W low

// router.get("/alltopstocks", AllTopstocksAllCap);

// //*Get sector wise data

// router.get("/sector-wise-data", AllSectorData);

// //!Add all stocks in db only not for user

// // router.post("/addallstocks", AddStocks);

// //*Get individual stock details

// router.get("/stock-details", GetStockDetails);

// //*Get 52 Week data

// router.get("/fifty-two-week", Get52WeekSummary);

// Add stock to watchList

router.post("/addtowatchlist/:id", AddtoWatchList);

// buy stock

router.post("/buystock/:id", BuyStock);

//sell stock

router.post("/sellstock/:id", soldStock);

//Get all users stocks

router.post("/getAllstocks/:id", GetUserAllStocks);

//Get Wathlist of user

router.post("/getwatchlist/:id", GetWatchList);

//Get WalletBalance of user

router.post("/getBalance/:id", GetBalance);

//Search Stocks

router.get("/searchstocks", SearchStock);

//remove from watchlist

router.post("/removewatchlist", deleteFromWatchList);

export default router;
