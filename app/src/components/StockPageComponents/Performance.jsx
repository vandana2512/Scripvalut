import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Heading = styled.p`
  font-weight: 600;
  font-size: 1.3em;
  color: #44475b;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  border-bottom: 1px dashed #959699;
`;

const RangeBox = styled.div`
  display: flex;
  padding: 1em;
`;

const RangeBoxLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1em;
  color: #44475b;

  p {
    font-weight: 400;
    font-size: 0.9em;
  }

  h5 {
    font-weight: 500;
    font-size: 1em;
  }
`;

const RangeBoxRight = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  flex: 1;
  gap: 1em;
  color: #44475b;

  p {
    font-weight: 400;
    font-size: 0.9em;
  }
  h5 {
    font-weight: 500;
    font-size: 1em;
  }
`;

const Range = styled.div`
  flex: 4;

  input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
  }
  input[type="range"]:focus {
    outline: none;
  }
  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    pointer-events: none;
    background: #e1e1e1;
    border-radius: 5px;
  }
  input[type="range"]::-webkit-slider-thumb {
    height: 0px;
    width: 0px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid #44475b;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: 5px;
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Box = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  min-width: 25%;
  gap: 1em;
  color: #44475b;
  padding: 1em;

  p {
    font-weight: 400;
    font-size: 0.9em;
  }
  h5 {
    font-weight: 500;
    font-size: 1em;
  }
`;

const Performance = () => {
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
  const LowerCircuit =
    CurrentStockData["basic_info"]["previousClose"] -
    CurrentStockData["basic_info"]["previousClose"] * 0.1;

  const HigherCircuit =
    CurrentStockData["basic_info"]["previousClose"] +
    CurrentStockData["basic_info"]["previousClose"] * 0.1;

  return (
    <Container>
      <Heading>Performance</Heading>
      <Top>
        <RangeBox>
          <RangeBoxLeft>
            <p>Todays Low</p>
            <h5>{CurrentStockData["basic_info"]["dayLow"]}</h5>
          </RangeBoxLeft>
          <Range>
            <input
              type="range"
              min={CurrentStockData["basic_info"]["dayLow"]}
              max={CurrentStockData["basic_info"]["dayHigh"]}
              value={CurrentStockData["basic_info"]["currentPrice"]}
            />
          </Range>
          <RangeBoxRight>
            <p>Todays High</p>
            <h5>{CurrentStockData["basic_info"]["dayHigh"]}</h5>
          </RangeBoxRight>
        </RangeBox>
        <RangeBox>
          <RangeBoxLeft>
            <p>52W Low</p>
            <h5>{CurrentStockData["basic_info"]["fiftyTwoWeekLow"]}</h5>
          </RangeBoxLeft>
          <Range>
            <input
              type="range"
              min={CurrentStockData["basic_info"]["fiftyTwoWeekLow"]}
              max={CurrentStockData["basic_info"]["fiftyTwoWeekHigh"]}
              value={CurrentStockData["basic_info"]["currentPrice"]}
            />
          </Range>
          <RangeBoxRight>
            <p>52W High</p>
            <h5>{CurrentStockData["basic_info"]["fiftyTwoWeekHigh"]}</h5>
          </RangeBoxRight>
        </RangeBox>
      </Top>
      <Bottom>
        <Box>
          <p>Open</p>
          <h5>{CurrentStockData["basic_info"]["open"]}</h5>
        </Box>
        <Box>
          <p>Prev Close</p>
          <h5>{CurrentStockData["basic_info"]["previousClose"]}</h5>
        </Box>
        <Box>
          <p>Volume</p>
          <h5>{CurrentStockData["basic_info"]["volume"]}</h5>
        </Box>
        <Box>
          <p>Upper Circuit</p>
          <h5>{HigherCircuit?.toFixed(2)}</h5>
        </Box>
        <Box>
          <p>Lower Circuit</p>
          <h5>{LowerCircuit?.toFixed(2)}</h5>
        </Box>
      </Bottom>
    </Container>
  );
};

export default Performance;
