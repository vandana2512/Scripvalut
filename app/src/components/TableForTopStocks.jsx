import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 1em;
  overflow: hidden;
  border: 1px solid #e7e3e3;
  max-height: 70vh;
  overflow-y: scroll;
  margin-bottom: 2em;

  &::-webkit-scrollbar-button {
    width: 10px;
    background-color: red;
  }
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  height: 3.5em;
  background-color: #e7e3e3;
  padding: 0.5em;
  gap: 3px;
  position: sticky;
  top: 0;
`;

const TableRow = styled.div`
  display: flex;
  align-items: center;
  height: 3.5em;
  border-bottom: 1px solid #e7e3e3;
  padding: 0.5em;
  gap: 5px;
`;

const ColumnHeader = styled.div`
  min-width: 11.66%;
  display: flex;
  align-items: center;
  font-weight: 500;
`;
const Column = styled.div`
  min-width: 11.66%;
  display: flex;
  align-items: center;
`;

const RowDescription = styled(Link)`
  flex: 2;
  display: flex;
  align-items: center;
  font-weight: 500;
  gap: 1em;
  padding: 1em;
  text-decoration: none;
  color: #000;
`;
const Description = styled.div`
  flex: 2;
  display: flex;
  align-items: flex-start;
  font-weight: 500;
  padding: 1em;
`;

const TableForTopStocks = (props) => {
  console.log(props);

  return (
    <Container>
      <TableHeader>
        <Description>Company Name</Description>
        <ColumnHeader>
          Price <small> ₹</small>
        </ColumnHeader>
        {/* <ColumnHeader>
          {props.category === "52 Week High"
            ? "Day High"
            : props.category === "52 Week Low"
            ? "Day Low"
            : props.category === "Top Gainers"
            ? "Per Change"
            : ""}
        </ColumnHeader> */}
      </TableHeader>
      {props.table?.map((row, i) => (
        <TableRow key={i}>
          <RowDescription
            to={`/stock/${row.company_name.replace(/[-()]/g, "")}`}
          >
            {row.company_name.substring(0, 20) + "..."}
          </RowDescription>
          <Column>{row.market_price}</Column>
          {/* <Column>{row.per_chg}</Column> */}
        </TableRow>
      ))}
    </Container>
  );
};

export default TableForTopStocks;
