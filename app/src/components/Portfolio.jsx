import React, { Children, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useGetIndices } from "../customhooks/useGetIndices";
import { useLocation } from "react-router-dom";
import {
  GetIndicesFailed,
  GetIndicesStart,
  GetIndicesSuccess,
} from "../redux/StockDetailsSlice";
import { publicRequest, userRequest } from "../apiRequest";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";

const Container = styled.div`
  min-width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 1em;
  overflow: hidden;
  border: 1px solid #e7e3e3;
  flex-shrink: 0;
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  height: 3.5em;
  background-color: #e7e3e3;
  padding: 0.5em;
  gap: 0.5em;
`;

const TableRow = styled.div`
  display: flex;
  align-items: center;
  height: 3.5em;
  border-bottom: 1px solid #e7e3e3;
  padding: 0.5em;
  gap: 0.5em;
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
  min-width: 30%;
  display: flex;
  align-items: center;
  font-weight: 500;
  gap: 1em;
  text-decoration: none;
  color: #000;
`;
const Description = styled.div`
  min-width: 30%;
  display: flex;
  align-items: center;
  font-weight: 500;
`;

const IndexImage = styled.img`
  width: 2em;
  height: 2em;
  border-radius: 50%;
`;

const Portfolio = () => {
  const [portfolioList, setPortFolioList] = useState([]);

  const { userid } = useSelector((state) => state.users);

  const { pathname } = useLocation();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/stocks/getAllstocks/${userid}`,
          {
            userid: userid,
          }
        );

        setPortFolioList(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    if (portfolioList.length === 0) {
      getData();
    }

    let intervalId = setInterval(getData, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [pathname]);

  console.log(portfolioList);

  return (
    <Container>
      <TableHeader>
        <Description>Stock Name</Description>
        <ColumnHeader>Quantity</ColumnHeader>
        <ColumnHeader>Market Price</ColumnHeader>
        <ColumnHeader>Invested Price</ColumnHeader>
        <ColumnHeader>Investment</ColumnHeader>
        <ColumnHeader>Current Value</ColumnHeader>
        <ColumnHeader>Gain/Loss</ColumnHeader>
      </TableHeader>

      {portfolioList?.map((stock, id) => (
        <TableRow key={id}>
          <RowDescription
            to={`/stock/${stock.stockname.replace(/[-()]/g, "")}`}
          >
            {stock.stockname}
          </RowDescription>
          <Column>{stock.totalQuantity}</Column>
          <Column>{stock.marketPrice.toFixed(3)}</Column>
          <Column>{stock.averagePrice.toFixed(2)}</Column>
          <Column>
            {(stock.averagePrice * stock.totalQuantity).toFixed(2)}
          </Column>
          <Column>
            {(stock.marketPrice * stock.totalQuantity).toFixed(3)}
          </Column>
          <Column
            style={{
              color:
                stock.marketPrice * stock.totalQuantity -
                  stock.averagePrice * stock.totalQuantity >=
                0
                  ? "green"
                  : "red",
            }}
          >
            {(
              ((
                stock.marketPrice * stock.totalQuantity -
                stock.averagePrice * stock.totalQuantity
              ).toFixed(2) /
                (stock.averagePrice * stock.totalQuantity)) *
              100
            ).toFixed(2)}{" "}
            %
          </Column>
        </TableRow>
      ))}
    </Container>
  );
};

export default Portfolio;
