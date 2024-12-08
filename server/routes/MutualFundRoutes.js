import express from "express";
import {
  GetAllMF,
  OneTimeInvestMent,
  soldMutualFund,
} from "../controllers/MutualFundControllers.js";
import { verifyTokenandUser } from "../util/verifyToken.js";

const router = express.Router();

//Buy mutual Fund

router.post("/buymutualfund/:id", OneTimeInvestMent);

//Get all mutual fund list

router.post("/getAllMF", GetAllMF);

//Sold Mutual Fund

router.post("/sellMF/:id", soldMutualFund);

export default router;
