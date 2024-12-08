import axios from "axios";
import { publicRequest } from "../apiRequest";
import {
  GetFiftyTwoWeekHighStart,
  GetFiftyTwoWeekHighSuccess,
  GetFiftyTwoWeekLowStart,
  GetFiftyTwoWeekLowSuccess,
  GetTopGainersFailure,
  GetTopGainersSuccess,
  GetTopGainnersStart,
  GetTopLosersFailure,
  GetTopLosersStart,
  GetTopLosersSuccess,
  GetFiftyTwoWeeLowFailed,
  GetFiftyTwoweekHighFailed,
  GetCurrentStockStarted,
  GetCurrentStockSuccess,
  GetCurrentStockFailed,
  GetIndicesStart,
  GetIndicesSuccess,
  GetIndicesFailed,
} from "../redux/StockDetailsSlice";

export const GetTopGainers = async (dispatch, link, signal) => {
  dispatch(GetTopGainnersStart());

  try {
    const result = await axios.get(`${link}`);

    dispatch(GetTopGainersSuccess(result.data));
  } catch (e) {
    dispatch(GetTopGainersFailure());
  }
};

export const GetTopLosers = async (dispatch, link, signal) => {
  dispatch(GetTopLosersStart());

  try {
    const result = await axios.get(`${link}`);

    dispatch(GetTopLosersSuccess(result.data));
  } catch (e) {
    dispatch(GetTopLosersFailure());
  }
};

export const GetFiftyTwoWeekHigh = async (dispatch, link, signal) => {
  dispatch(GetFiftyTwoWeekHighStart());

  try {
    const result = await axios.get(`${link}`);

    dispatch(GetFiftyTwoWeekHighSuccess(result.data));
  } catch (e) {
    dispatch(GetFiftyTwoweekHighFailed());
  }
};

export const GetFiftyTwoWeekLow = async (dispatch, link, signal) => {
  dispatch(GetFiftyTwoWeekLowStart());

  try {
    const result = await axios.get(`${link}`);

    dispatch(GetFiftyTwoWeekLowSuccess(result.data));
  } catch (e) {
    dispatch(GetFiftyTwoWeeLowFailed());
  }
};

export const GetCurrentStock = async (dispatch, stock_name, signal) => {
  dispatch(GetCurrentStockStarted());

  try {
    const result = await axios.get(
      `${import.meta.env.VITE_STOCK_API}/stock-details-all/${stock_name}`,
      signal
    );

    dispatch(GetCurrentStockSuccess(result.data));
  } catch (e) {
    dispatch(GetCurrentStockFailed());
  }
};

export const GetIndices = async (dispatch) => {
  dispatch(GetIndicesStart());

  try {
    const res = await axios.get(`${import.meta.env.VITE_STOCK_API}/allindices`);

    dispatch(GetIndicesSuccess(res.data));
  } catch (e) {
    console.log(e);
    dispatch(GetIndicesFailed());
  }
};

//Colgate-Palmolive (India)
//colgatepalmolive-india-ltd-share-price
