import React, { Children, useEffect, useState } from "react";
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
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Kolkata");

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
  word-wrap: break-word;
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

const MutualFundPortfolio = () => {
  const [MutualFundList, setMutualFundList] = useState([]);

  const { userid } = useSelector((state) => state.users);

  const { pathname } = useLocation();

  function isWithinMarketLimit() {
    const now = moment();
    const start = moment().set({ hour: 9, minute: 15, second: 0 });
    const end = moment().set({ hour: 15, minute: 30, second: 0 });

    return now.isBetween(start, end);
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/mutualfund/getAllMF`,
          { userid }
        );

        setMutualFundList(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    if (MutualFundList.length === 0) {
      getData();
    }

    let intervalId;
    if (isWithinMarketLimit()) {
      intervalId = setInterval(getData, 60000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Container>
      <TableHeader>
        <Description>Fund name</Description>
        <ColumnHeader>Quantity</ColumnHeader>
        <ColumnHeader>Market Price</ColumnHeader>
        <ColumnHeader>Invested Price</ColumnHeader>
        <ColumnHeader>Investment</ColumnHeader>
        <ColumnHeader>Current Value</ColumnHeader>
        <ColumnHeader>Gain/Loss</ColumnHeader>
      </TableHeader>
      {MutualFundList?.map((fund, i) => (
        <TableRow key={i}>
          <RowDescription to={`/mutualFund/${fund.link}/${fund.code}`}>
            {fund.fundName}
          </RowDescription>
          <Column>{fund.units.toFixed(2)}</Column>
          <Column>{fund.marketPrice}</Column>
          <Column>{fund.nav}</Column>
          <Column>{(fund.units * fund.nav).toFixed(2)}</Column>
          <Column>{(fund.units * fund.marketPrice).toFixed(2)}</Column>
          <Column
            style={{
              color:
                fund.marketPrice * fund.units - fund.nav * fund.units >= 0
                  ? "green"
                  : "red",
            }}
          >
            {(
              ((fund.units * fund.marketPrice - fund.units * fund.nav) /
                (fund.units * fund.nav)) *
              100
            ).toFixed(2)}
            %
          </Column>
        </TableRow>
      ))}
    </Container>
  );
};

export default MutualFundPortfolio;
