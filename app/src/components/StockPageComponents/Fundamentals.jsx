import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { mobile } from "../../responsive";

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
  gap: 1.5em;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  flex: 1;
  color: #44475b;
  border-right: 1px dashed #afafaf;
  padding-right: 1em;
  ${mobile({ borderRight: "none" })}
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  flex: 1;
  color: #44475b;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Fundamentals = () => {
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

  return (
    <Container>
      <Heading>Fundamentals</Heading>
      <MainBox>
        <Left>
          <Row>
            <p>Market Cap</p>
            <h4>
              ₹{" "}
              {(CurrentStockData["basic_info"]["marketCap"] / 10000000).toFixed(
                2
              )}
              Cr
            </h4>
          </Row>
          <Row>
            <p>P/E Ratio</p>
            <h4>{CurrentStockData["basic_info"]["trailingPE"]?.toFixed(2)}</h4>
          </Row>
          <Row>
            <p>P/B ratio</p>
            <h4>{CurrentStockData["basic_info"]["priceToBook"]?.toFixed(2)}</h4>
          </Row>
          <Row>
            <p>Debt to Equity</p>
            <h4>
              {CurrentStockData["basic_info"]["debtToEquity"]?.toFixed(2)}
            </h4>
          </Row>
        </Left>
        <Right>
          <Row>
            <p>ROE</p>
            <h4>
              {(CurrentStockData["basic_info"]["returnOnEquity"] * 100).toFixed(
                2
              )}{" "}
              %
            </h4>
          </Row>
          <Row>
            <p>EPS</p>
            <h4>{CurrentStockData["basic_info"]["trailingEps"]?.toFixed(2)}</h4>
          </Row>
          <Row>
            <p>Dividend Yeild</p>
            <h4>
              {" "}
              {(
                CurrentStockData["basic_info"]["dividendYield"]?.toFixed(4) *
                100
              ).toFixed(2)}{" "}
              %
            </h4>
          </Row>
          <Row>
            <p>Book Value</p>
            <h4>{CurrentStockData["basic_info"]["bookValue"]?.toFixed(2)}</h4>
          </Row>
        </Right>
      </MainBox>
    </Container>
  );
};

export default Fundamentals;
