import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 10px;
  color: #44475b;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

  div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 2em;
  }
`;

const Title = styled.h4`
  font-weight: 600;
  font-size: 1.3em;
  color: #44475b;
`;

const Holder = styled.p`
  font-weight: 500;
`;

const Line = styled.div`
  width: ${(props) => props.type === "Promoters" && `${props.width}%`};

  width: ${(props) =>
    props.type === "Other domestic institutions" && `${props.width}%`};
  width: ${(props) => props.type === "Retail and other" && `${props.width}%`};

  height: 0.5em;
  background-color: #4be93b;
`;

const Value = styled.p`
  font-size: 0.9em;
  font-weight: 500;
`;

const ShareHolding = () => {
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

  const Promotors = (
    CurrentStockData["basic_info"]["heldPercentInsiders"] * 100
  ).toFixed(2);

  const Institutions = (
    CurrentStockData["basic_info"]["heldPercentInstitutions"] * 100
  ).toFixed(2);

  return (
    <Container>
      <Title>Share Holding Pattern</Title>
      <Box>
        <Holder>Promoters</Holder>
        <div>
          <Line type="Promoters" width={Promotors} />
          <Value>{Promotors}</Value>
        </div>
      </Box>
      <Box>
        <Holder>Other domestic institutions </Holder>
        <div>
          <Line type="Other domestic institutions" width={Institutions} />
          <Value>{Institutions}</Value>
        </div>
      </Box>
      <Box>
        <Holder>Retail and other</Holder>
        <div>
          <Line
            type="Retail and other"
            width={100 - Promotors - Institutions}
          />
          <Value>{(100 - Promotors - Institutions)?.toFixed(2)}</Value>
        </div>
      </Box>
    </Container>
  );
};

export default ShareHolding;
