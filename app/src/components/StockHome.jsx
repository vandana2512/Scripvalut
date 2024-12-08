import React from "react";
import styled from "styled-components";
import IndexWrapper from "./IndexWrapper";
import CompanyBox from "./CompanyBox";
import { useDispatch, useSelector } from "react-redux";
import TopGainersBox from "./TopGainersBox";
import TopLosersBox from "./TopLosersBox";
import FifityTwoweekhighBox from "./FifityTwoweekhighBox";
import FiftyTwoweeklowBox from "./FiftyTwoweeklowBox";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { GetFiftyTwoWeekHigh, GetTopGainers } from "../apicalls/StockApicalls";
import {
  GetFiftyTwoWeekHighSuccess,
  GetFiftyTwoWeekLowSuccess,
  GetIndicesSuccess,
  GetTopGainersSuccess,
  GetTopLosersSuccess,
} from "../redux/StockDetailsSlice";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 70%;
  padding: 0 1em;
`;

const StockHome = () => {
  const [StockList, setStockList] = useState([]);

  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const { top_gainers, top_losers, fiftyTwoWeekHighData, fiftyTwoWeekLowData } =
    useSelector((state) => state.stocks);

  // useEffect(() => {
  //   const getData = async () => {
  //     const result = await Promise.allSettled([
  //       axios.get(`${import.meta.env.VITE_STOCK_API}/topstocks/52-week-low`),
  //       axios.get(`${import.meta.env.VITE_STOCK_API}/topstocks/top-losers`),
  //       axios.get(`${import.meta.env.VITE_STOCK_API}/topstocks/52-week-high`),
  //       axios.get(`${import.meta.env.VITE_STOCK_API}/topstocks/52-week-low`),
  //       axios.get(`${import.meta.env.VITE_STOCK_API}/allindices`),
  //     ]);

  //     const refinedData = result.map((type) => type.value.data);

  //     dispatch(GetTopGainersSuccess(refinedData[0]));
  //     dispatch(GetTopLosersSuccess(refinedData[1]));
  //     dispatch(GetFiftyTwoWeekHighSuccess(refinedData[2]));
  //     dispatch(GetFiftyTwoWeekLowSuccess(refinedData[3]));
  //     dispatch(GetIndicesSuccess(refinedData[4]));

  //     setStockList(refinedData);
  //   };

  //   getData();
  // }, []);

  return (
    <Container>
      <IndexWrapper data={StockList[4]} />

      <CompanyBox
        info={{
          type: "Top Gainers",
          link: `${import.meta.env.VITE_STOCK_API}/all-top-stocks/top-gainers`,
        }}
      />
      {/* <TopGainersBox type={"top-gainers"} /> */}

      <CompanyBox
        info={{
          type: "Top Losers",
          link: `${import.meta.env.VITE_STOCK_API}/all-top-stocks/top-losers`,
        }}
      />
      {/* <TopLosersBox type={"top-losers"} /> */}

      <CompanyBox
        info={{
          type: "52 Week High",
          link: `${import.meta.env.VITE_STOCK_API}/all-top-stocks/52-week-high`,
        }}
      />
      {/* <FifityTwoweekhighBox type={"52-week-high"} /> */}

      <CompanyBox
        info={{
          type: "52 Week Low",
          link: `${import.meta.env.VITE_STOCK_API}/all-top-stocks/52-week-low`,
        }}
      />

      {/* <FiftyTwoweeklowBox type={"52-week-low"} /> */}
    </Container>
  );
};

export default StockHome;
