import React from "react";
import styled from "styled-components";
import FinancialTable from "./FinancialTable";
import ToggleTableFinace from "./ToggleTableFinace";
import ShareHolding from "./StockPageComponents/ShareHolding";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #cccc;
  border-radius: 10px;
  overflow: hidden;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  padding: 1em;
  gap: 1em;

  h4 {
  }

  p {
    font-size: 0.9em;
    line-height: 1.5;
    font-weight: 500;
    color: #707070;
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4em;
  padding: 0.5em;
  border-bottom: 1px solid #cdcdcd;
`;

const Index = styled.p`
  font-size: 0.9em;
  font-weight: 500;
  color: #525252;
`;

const Value = styled.p`
  font-size: 0.9em;
  font-weight: 500;
`;

const KeyIndicators = styled.div`
  display: flex;
  gap: 1em;
`;

const StockDescriptionBox = () => {
  const { isLoading, error, CurrentStockData } = useSelector(
    (state) => state.stocks
  );

  return (
    <Container>
      <Top>
        <h4>{CurrentStockData[0]?.stock_name} Quick Overview</h4>
        <p>{CurrentStockData[0]?.stock_profile}</p>
      </Top>
      <Bottom>
        {CurrentStockData[0]?.stock_summary.map((point, i) =>
          Object.entries(point).map((p, i) => (
            <Box key={i}>
              <Index>{p[0]}</Index>
              <Value>{p[1]}</Value>
            </Box>
          ))
        )}

        {/* <Box>
          <Index>Open</Index>
          <Value>₹ 90.95</Value>
        </Box>
        <Box>
          <Index>Market Cap</Index>
          <Value>128,926.90 Crore</Value>
        </Box>
        <Box>
          <Index>Market Cap</Index>
          <Value>128,926.90 Crore</Value>
        </Box>
        <Box>
          <Index>Market Cap</Index>
          <Value>128,926.90 Crore</Value>
        </Box> */}
      </Bottom>
    </Container>
  );
};

export default StockDescriptionBox;
