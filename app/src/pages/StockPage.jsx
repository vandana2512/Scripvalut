import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { GetCurrentStock } from "../apicalls/StockApicalls";
import styled from "styled-components";
import StockInfo from "../components/StockInfo";
import StockDescriptionBox from "../components/StockDescriptionBox";
import FinancialTable from "../components/FinancialTable";
import ToggleTableFinace from "../components/ToggleTableFinace";
import StockChart from "../components/Charts/StockChart";
import { Player } from "@lottiefiles/react-lottie-player";
import Performance from "../components/StockPageComponents/Performance";
import Fundamentals from "../components/StockPageComponents/Fundamentals";
import Financials from "../components/StockPageComponents/Financials";
import AboutStock from "../components/StockPageComponents/AboutStock";
import ShareHolding from "../components/StockPageComponents/ShareHolding";
import { io } from "socket.io-client";
import { SetLivePrice } from "../redux/StockDetailsSlice";
import { tablet } from "../responsive";

const Container = styled.div`
  display: flex;
  width: 70%;
  padding: 0 1em;
  /* border: 1px solid red; */
  position: relative;
  gap: 1em;
  margin-top: 2em;
  margin-bottom: 2em;
  ${tablet({ flexDirection: "column", width: "100%" })}
`;

const Left = styled.div`
  flex: 1;
  /* border: 1px solid red; */
  max-height: 30%;
  position: sticky;
`;

const Right = styled.div`
  flex: 2.5;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

const KeyIndicators = styled.div`
  display: flex;
  gap: 1em;
`;

// const Loader = styled.iframe`
//   width: 100%;
//   height: 100vh;
//   outline: none;
//   border: none;
// `;

const Loader = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border-top: 5px solid #4be94b;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #4be94b;
  animation: rotate 5s linear infinite;
  margin-top: 2em;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const StockPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [oneDayChart, setOneDayChart] = useState([]);
  const [oneWeekChart, setOneWeekChart] = useState([]);
  const [oneMonthChart, setOneMonthChart] = useState([]);
  const [oneYearChart, setOneYearChart] = useState([]);
  const [ThreeYearChart, setThreeYearChart] = useState([]);
  const [FiveYearChart, setFiveYearChart] = useState([]);

  const { isLoading, error, CurrentStockData } = useSelector(
    (state) => state.stocks
  );

  const Fetchdata = (data, setFunction) => {
    for (let [key, value] of Object.entries(data)) {
      setFunction((prev) => [
        ...prev,
        { time: key, price: parseFloat(value).toFixed(3) },
      ]);
    }
  };

  const { pathname } = useLocation();
  const stock_name = pathname.split("/")[2];

  console.log(stock_name);

  const dispatch = useDispatch();

  console.log(stock_name);

  useEffect(() => {
    let isSubscription = true;

    if (isSubscription) {
      GetCurrentStock(dispatch, stock_name);
    }

    return () => {
      isSubscription = false;
    };
  }, [stock_name]);

  const symbol = CurrentStockData["basic_info"]?.symbol.split(".")[0];

  useEffect(() => {
    // const socket = io(
    //   "https://realtimestockchartapi-production.up.railway.app/"
    // );
    const socket = io(`${import.meta.env.VITE_SOCKET_API}`);
    // const socket = io("http://localhost:4000");
    socket.on("connect", () => {
      setIsConnected(socket.connected);

      setOneDayChart([]);
      setOneWeekChart([]);
      setOneYearChart([]);
      setOneMonthChart([]);
      setThreeYearChart([]);
      setFiveYearChart([]);
    });

    if (symbol && !isLoading) {
      socket.emit("join", symbol);
    }

    let x = setInterval(() => {
      socket.emit("started", symbol);
    }, 60 * 1000);

    let y = setInterval(() => {
      socket.emit("oneweek", symbol);
    }, 5 * 60 * 1000);

    let z = setInterval(() => {
      socket.emit("onemonth", symbol);
    }, 30 * 60 * 1000);

    socket.on("started", (data) => {
      console.log(data);
      setOneDayChart((prev) => [
        ...prev,
        { time: data[0], price: parseFloat(data[1]).toFixed(3) },
      ]);

      console.log(data[0]);
    });

    socket.on("oneweek", (data) => {
      setOneWeekChart((prev) => [
        ...prev,
        { time: data[0], price: parseFloat(data[1]).toFixed(3) },
      ]);

      console.log(data[0]);
    });

    socket.on("onemonth", (data) => {
      setOneMonthChart((prev) => [
        ...prev,
        { time: data[0], price: parseFloat(data[1]).toFixed(3) },
      ]);

      console.log(data[0]);
    });

    socket.on("join", (data) => {
      console.log(data);
      Fetchdata(data[0], setOneDayChart);
      Fetchdata(data[1], setOneWeekChart);
      Fetchdata(data[2], setOneMonthChart);
      Fetchdata(data[3], setOneYearChart);
      Fetchdata(data[4], setThreeYearChart);
      Fetchdata(data[5], setFiveYearChart);
    });

    return () => {
      socket.disconnect();
    };
  }, [symbol]);

  useEffect(() => {
    if (oneDayChart.length > 0) {
      dispatch(SetLivePrice(oneDayChart[oneDayChart.length - 1].price));
    } else {
      dispatch(SetLivePrice(0));
    }
  }, [oneDayChart]);

  if (CurrentStockData.length === 0) {
    return <Loader />;
  } else {
    return (
      <Container>
        <Left>
          <StockInfo />
        </Left>
        <Right>
          <p style={{ color: "#4be93b" }}>
            {isConnected ? "Connected" : "disconnect"}
          </p>
          {/* <small style={{ color: "#3a4beb" }}>
            Note : Server will take some time to connect due to load wait or
            refresh to get connected
          </small> */}
          <StockChart
            stockList={[
              oneDayChart,
              oneWeekChart,
              oneMonthChart,
              oneYearChart,
              ThreeYearChart,
              FiveYearChart,
            ]}
          />
          <Performance />
          <Fundamentals />
          <Financials />
          <AboutStock />
          <ShareHolding />
        </Right>
      </Container>
    );
  }
};

export default StockPage;
