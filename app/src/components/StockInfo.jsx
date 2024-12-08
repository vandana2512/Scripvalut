import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { publicRequest, userRequest } from "../apiRequest";
import toast, { Toaster } from "react-hot-toast";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: #44475b;
  height: 50%;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid #2bd301;
  gap: 1em;
  padding: 1em;
`;

const Logo = styled.img`
  flex: 1;
  width: 1rem;
  border-radius: 50%;
`;

const Title = styled.div`
  flex: 4;

  h2 {
    font-weight: 600;
    font-size: 1.3em;
  }
`;

const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
`;

const IndexName = styled.div`
  width: 80px;
  height: 30px;
  border-radius: 30px;
  background-color: #2bcd2b;
  padding: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  font-weight: 600;
  color: white;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  margin-top: 1em;
  padding: 0.5em 0;
  border-bottom: 1px solid #cacaca;

  h1 {
    font-weight: 800;
    font-size: 1.4em;
  }

  p {
    font-size: 0.8em;
    font-weight: 800;
  }
`;

const Analysis = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  margin-top: 1em;
  padding: 0.5em 0;
  border-bottom: 1px solid #cacaca;

  div {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    border: 1px solid #4be94b;
    width: 100px;
    padding: 0.5em;
    border-radius: 20px;
    font-size: 0.8em;
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
  border-bottom: 1px solid #cdcdcd;
`;

const Button = styled.div`
  width: 48%;
  padding: 0.5em;
  border-radius: 20px;
  background-color: ${(props) =>
    props.type === "buy" ? "#19b086" : "#eb1f1f"};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Counter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2em;
  gap: 2em;

  label {
    font-weight: 600;
  }
`;

const CounterLeft = styled.div`
  display: flex;
  align-items: start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 0.5em;
`;

const Quantity = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5em;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 0.5em;
  max-width: 8em;
  font-size: 1em;
  text-align: center;
`;

const StockInfo = () => {
  const [stockquantity, setStockQuantity] = useState(0);

  const { isLoading, error, CurrentStockData, livePrice } = useSelector(
    (state) => state.stocks
  );

  const { userid } = useSelector((state) => state.users);

  if (isLoading) {
    // Render loading state or placeholder
    return <Skeleton style={{ width: "100%", height: "300px" }} />;
  }

  if (error) {
    // Render error state or error message
    return <div>Error: {error}</div>;
  }

  if (!CurrentStockData) {
    // Render null or placeholder when CurrentStockData is not available
    return null;
  }

  let priceChange = 0;

  if (!isLoading && livePrice) {
    priceChange = (
      livePrice - CurrentStockData["basic_info"]["regularMarketPreviousClose"]
    ).toFixed(2);
  } else {
    priceChange = (
      CurrentStockData["basic_info"]["currentPrice"] -
      CurrentStockData["basic_info"]["regularMarketPreviousClose"]
    ).toFixed(2);
  }

  const HandleBuyStock = async () => {
    const Warn = () => toast.error("Please enter quantity more than 0");

    if (stockquantity === 0) {
      Warn();
      return;
    } else {
      try {
        const data = {
          userid: userid,
          symbol: CurrentStockData["basic_info"]["symbol"].split(".")[0],
          stockname: CurrentStockData["basic_info"]["longName"],
          investedPrice: livePrice,
          quantity: stockquantity,
          status: "Active",
          industry: CurrentStockData["basic_info"]["industry"],
          sector: CurrentStockData["basic_info"]["sector"],
        };

        const res = await publicRequest.post(
          `/stocks/buystock/${userid}`,
          data
        );

        const success = () => toast.success(res.data);

        success();

        // if (res.status === 200) {
        //   window.location.href = "/investment";
        // }
      } catch (e) {
        const failure = () => toast.error(e.response.data);

        failure();
      }
    }
  };

  const HandleSellStock = async () => {
    const Warn = () => toast.error("Please enter quantity more than 0");

    if (stockquantity === 0) {
      Warn();
      return;
    } else {
      try {
        const data = {
          userid: userid,
          symbol: CurrentStockData["basic_info"]["symbol"].split(".")[0],
          stockname: CurrentStockData["basic_info"]["longName"],
          marketPrice: livePrice,
          quantity: stockquantity,
          status: "Sold",
          industry: CurrentStockData["basic_info"]["industry"],
          sector: CurrentStockData["basic_info"]["sector"],
        };

        const res = await publicRequest.post(
          `/stocks/sellstock/${userid}`,
          data
        );
        const success = () => toast.success(res.data);

        success();

        // if (res.status === 200) {
        //   window.location.href = "/investment";
        // }
      } catch (e) {
        console.log(e);
        const failure = () => toast.error(e.response.data);

        failure();
      }
    }
  };

  const HandleAddtoWatchList = async () => {
    const data = {
      userid: userid,
      stockname: CurrentStockData["basic_info"]["longName"],
      status: "Watchlist",
    };

    try {
      const res = await publicRequest.post(
        `/stocks/addtowatchlist/${userid}`,
        data
      );

      const Success = () => toast.success(res.data);
      Success();

      // if (res.status === 200) {

      //   window.location.href = "/investment";
      // }
    } catch (e) {
      const Error = () => toast.error(e.response.data);

      Error();
    }
  };

  return (
    <Container>
      <Toaster position="top-center" reverseOrder={false} duration={10000} />
      <Top>
        {/* <Logo src={CurrentStockData["basic_info"]["logoName"]} /> */}
        <Title>
          <h2>{CurrentStockData["basic_info"]["longName"]}</h2>
        </Title>
      </Top>
      <PriceSection>
        <IndexName>NSE</IndexName>
        <Price>
          <h1>
            ₹{" "}
            {!isLoading
              ? livePrice
              : CurrentStockData["basic_info"]["currentPrice"]}
          </h1>
          <p style={{ color: priceChange > 0 ? "green" : "red" }}>
            ₹ {!isLoading && livePrice ? priceChange : 0}
          </p>
        </Price>
        <Analysis>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {CurrentStockData["basic_info"]["recommendationKey"] === "none"
              ? "👎 NONE"
              : CurrentStockData["basic_info"]["recommendationKey"] === "hold"
              ? "✋ HOLD"
              : "👍 BUY"}
          </div>
        </Analysis>
        <Counter>
          <CounterLeft>
            <label>Quantity</label>
            <Quantity
              type="number"
              min="0"
              value={stockquantity}
              onChange={(e) => setStockQuantity(e.target.value)}
            />
          </CounterLeft>
          <CounterLeft>
            <label>Price</label>
            <Quantity
              type="text"
              value={
                !isLoading
                  ? livePrice
                  : CurrentStockData["basic_info"]["currentPrice"]
              }
            />
          </CounterLeft>
        </Counter>
        <Buttons>
          <Button onClick={() => HandleBuyStock()} type="buy">
            BUY
          </Button>
          <Button onClick={() => HandleSellStock()} type="sell">
            SELL
          </Button>
        </Buttons>
        <Button
          onClick={() => HandleAddtoWatchList()}
          style={{
            width: "100%",
            backgroundColor: "#189AD3",
            marginTop: "2em",
          }}
        >
          Add to Watchlist
        </Button>
      </PriceSection>
    </Container>
  );
};

export default StockInfo;
