import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #cccc;
  border-radius: 10px;
  overflow: hidden;
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4em;
  padding: 0.5em;
  border-bottom: 1px solid #cdcdcd;
  background-color: #f5f5f5;
`;

const Row = styled.div`
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

const FinancialTable = () => {
  const { isLoading, error, CurrentStockData } = useSelector(
    (state) => state.stocks
  );

  return (
    <Container>
      <Header>
        <h4>Indian Oil Corp Ltd Key Indicators</h4>
      </Header>
      <div style={{ padding: "0.5em" }}>
        {CurrentStockData[0]?.stock_key_indices.map((point, i) =>
          Object.entries(point).map((p, i) => (
            <Row>
              <Index>{p[0]}</Index>
              <Value>{p[1]}</Value>
            </Row>
          ))
        )}
      </div>
    </Container>
  );
};

export default FinancialTable;
