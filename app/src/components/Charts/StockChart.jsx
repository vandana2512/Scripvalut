import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useLayoutEffect,
} from "react";
import styled from "styled-components";
import OneDayChart from "./OneDayChart";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import YearChart from "./YearChart";
import { SetLivePrice } from "../../redux/StockDetailsSlice";

// const socket = io("https://scoket-api-backend.onrender.com");

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  max-height: 600px;
  /* border: 1px solid red; */
  padding: 1em;
  gap: 2rem;
  box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 0.5em;
`;

const IntervalButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #ccc;
  padding: 1em;
`;

const Button = styled.div`
  width: 3rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.9em;
  font-weight: 500;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4be93b;
  cursor: pointer;
`;

const StockChart = (props) => {
  console.log(props.stockList[0].length);

  const [activeTab, setActiveTab] = useState("1day");

  const [isConnected, setIsConnected] = useState();

  const { isLoading, error, CurrentStockData } = useSelector(
    (state) => state.stocks
  );

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     setIsConnected(true);
  //   });

  // }, []);

  // useEffect(() => {
  //   if (symbol && !isLoading) {
  //     socket.emit("join", symbol);
  //   }

  //   socket.on("join", (data) => {
  //     Fetchdata(data[0], setOneDayChart);
  //     Fetchdata(data[1], setOneWeekChart);
  //     Fetchdata(data[2], setOneMonthChart);
  //     Fetchdata(data[3], setOneYearChart);
  //     Fetchdata(data[4], setThreeYearChart);
  //     Fetchdata(data[5], setFiveYearChart);
  //   });
  // }, []);

  return (
    <Container>
      {/* <p>{props.stockList[0][props.stockList[0]?.length - 1]?.price}</p> */}

      {activeTab === "1day" && <OneDayChart data={props.stockList[0]} />}
      {activeTab === "1week" && <OneDayChart data={props.stockList[1]} />}
      {activeTab === "1month" && <OneDayChart data={props.stockList[2]} />}
      {activeTab === "1year" && <YearChart data={props.stockList[3]} />}
      {activeTab === "3year" && <YearChart data={props.stockList[4]} />}
      {activeTab === "5year" && <YearChart data={props.stockList[5]} />}
      <IntervalButton>
        <Button
          style={{ backgroundColor: activeTab === "1day" && "#4ce93b23" }}
          onClick={() => setActiveTab("1day")}
        >
          1D
        </Button>
        <Button
          style={{ backgroundColor: activeTab === "1week" && "#4ce93b23" }}
          onClick={() => setActiveTab("1week")}
        >
          1WK
        </Button>
        <Button
          style={{ backgroundColor: activeTab === "1month" && "#4ce93b23" }}
          onClick={() => setActiveTab("1month")}
        >
          1M
        </Button>
        <Button
          style={{ backgroundColor: activeTab === "1year" && "#4ce93b23" }}
          onClick={() => setActiveTab("1year")}
        >
          1Y
        </Button>
        <Button
          style={{ backgroundColor: activeTab === "3year" && "#4ce93b23" }}
          onClick={() => setActiveTab("3year")}
        >
          3Y
        </Button>
        <Button
          style={{ backgroundColor: activeTab === "5year" && "#4ce93b23" }}
          onClick={() => setActiveTab("5year")}
        >
          5Y
        </Button>
      </IntervalButton>
    </Container>
  );
};

export default StockChart;
