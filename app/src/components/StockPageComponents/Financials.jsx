import React, { useState } from "react";
import styled from "styled-components";
import FinanceChart from "../Charts/FinanceChart";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

const Heading = styled.p`
  font-weight: 600;
  font-size: 1.3em;
  color: #44475b;
`;

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 0.5em;
`;

const BoxHeader = styled.div`
  display: flex;
  gap: 1em;
  border-bottom: 1px solid #ddd;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
  border-bottom: 5px solid transparent;
  cursor: pointer;
`;

const ChartBox = styled.div`
  min-height: 300px;

  small {
    margin-left: 10px;
    margin-top: 10px;
  }
`;

const Bottom = styled.div`
  display: flex;
  padding: 1em;

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5em 0.5em;
    width: 100px;
    background-color: #c9f1c567;
    border-radius: 20px;
    color: #2ff019;
    font-weight: 800;
  }
`;

const Financials = () => {
  const [activeTab, SetactiveTab] = useState("revenue");
  const { isLoading, error, CurrentStockData } = useSelector(
    (state) => state.stocks
  );

  if (isLoading) {
    // Render loading state or placeholder
    return <Skeleton style={{ width: "100%", height: "400px" }} />;
  }

  if (error) {
    // Render error state or error message
    return <div>Error: {error}</div>;
  }

  if (!CurrentStockData) {
    // Render null or placeholder when CurrentStockData is not available
    return null;
  }

  const RevenueData = [];

  const ProfitData = [];

  for (let [key, value] of Object.entries(CurrentStockData["finance_ratio"])) {
    console.log(key);
    let year = new Date(Number(key)).getFullYear();

    let revenue = value["OperatingRevenue"] / 10000000;

    let profit = value["NetIncome"] / 10000000;

    RevenueData.push({ year: year, amount: revenue });
    ProfitData.push({ year: year, amount: profit });
  }

  console.log(RevenueData);

  return (
    <Container>
      <Heading>Financials</Heading>
      <MainBox>
        <BoxHeader>
          <Button
            style={{
              borderBottom: activeTab === "revenue" && "5px solid #4be93b",
            }}
            onClick={() => SetactiveTab("revenue")}
          >
            Revenue
          </Button>
          <Button
            style={{
              borderBottom: activeTab === "profit" && "5px solid #4be93b",
            }}
            onClick={() => SetactiveTab("profit")}
          >
            Profit
          </Button>
        </BoxHeader>
        <ChartBox>
          <small> *All amounts are in Cr.</small>
          {activeTab === "revenue" && <FinanceChart data={RevenueData} />}
          {activeTab === "profit" && <FinanceChart data={ProfitData} />}
        </ChartBox>
        <Bottom>
          <p>Yearly</p>
        </Bottom>
      </MainBox>
    </Container>
  );
};

export default Financials;
