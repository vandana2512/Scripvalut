import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  GetIndicesFailed,
  GetIndicesStart,
  GetIndicesSuccess,
} from "../redux/StockDetailsSlice";
import { publicRequest } from "../apiRequest";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const useGetIndices = () => {
  const [IndicesData, setIndicesData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetIndicesStart());

    const getData = async () => {
      console.log(`${import.meta.env.VITE_STOCK_API}`);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_STOCK_API}/allindices`
        );
        setIndicesData(res.data);

        dispatch(GetIndicesSuccess(res.data));
      } catch (e) {
        console.log(e);
        dispatch(GetIndicesFailed());
      }
    };

    getData();
  }, []);

  return [IndicesData];
};
