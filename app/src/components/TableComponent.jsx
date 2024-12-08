import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import TableForTopStocks from "./TableForTopStocks";

const Container = styled.div`
  width: 70%;
  display: flex;
  align-items: start;
  flex-direction: column;
  margin-top: 1em;
  gap: 2em;
`;

const Title = styled.h2`
  font-family: "Space grotesk";
`;

const TableComponent = () => {
  const { fiftyTwoWeekHighData, fiftyTwoWeekLowData, top_gainers, top_losers } =
    useSelector((state) => state.stocks);

  const { pathname } = useLocation();

  const category = pathname.split("/")[2];

  console.log(category);

  return (
    <Container>
      <Title>Heading</Title>
      <p>
        Following is the list of companies for{" "}
        {category === "top-gainers"
          ? "Top Gainers"
          : category === "top-losers"
          ? "Top Losers"
          : category === "52-week-high"
          ? "52 Week High"
          : "52 Week Low"}
      </p>

      {category === "52-week-high" && (
        <TableForTopStocks
          table={fiftyTwoWeekHighData}
          category={"52 Week High"}
        />
      )}

      {category === "52-week-low" && (
        <TableForTopStocks
          table={fiftyTwoWeekLowData}
          category={"52 Week Low"}
        />
      )}
      {category === "top-gainers" && (
        <TableForTopStocks table={top_gainers} category={"Top Gainers"} />
      )}

      {category === "top-losers" && (
        <TableForTopStocks table={top_losers} category={"Top Losers"} />
      )}
    </Container>
  );
};

export default TableComponent;
