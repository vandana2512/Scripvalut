import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useGetIndices } from "../customhooks/useGetIndices";
import { useLocation } from "react-router-dom";
import {
  GetIndicesFailed,
  GetIndicesStart,
  GetIndicesSuccess,
} from "../redux/StockDetailsSlice";
import { publicRequest } from "../apiRequest";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { tablet } from "../responsive";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 0.5em;
  margin-bottom: 2em;
`;

const TableHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 3.5em;
  padding: 0.5em;
  gap: 1em;
  border-bottom: 1px solid #e7e3e3;
`;

const TableRow = styled.div`
  display: flex;
  align-items: center;
  height: 3.5em;
  border-bottom: 1px solid #e7e3e3;
  padding: 0.5em;
  gap: 1em;
  width: 100%;
`;

const ColumnHeader = styled.div`
  min-width: 8em;
  display: flex;
  align-items: center;
  font-weight: 500;
  height: 100%;
`;
const Column = styled.div`
  min-width: 8em;
  display: flex;
  align-items: center;
`;

const RowDescription = styled.div`
  min-width: 15%;
  display: flex;
  align-items: center;
  font-weight: 500;
  gap: 1em;
`;
const Description = styled.div`
  min-width: 15%;
  display: flex;
  align-items: center;
  font-weight: 500;
`;

const IndexImage = styled.img`
  width: 2em;
  height: 2em;
  border-radius: 50%;
`;

const Table = () => {
  const { indices, isLoading, error } = useSelector((state) => state.stocks);

  const dispatch = useDispatch();

  const { pathname } = useLocation();

  useEffect(() => {
    const controller = new AbortController();

    const signal = controller.signal;

    dispatch(GetIndicesStart());

    const getData = async () => {
      try {
        const res = await publicRequest.get("/stocks/allindices", { signal });

        dispatch(GetIndicesSuccess(res.data));
      } catch (e) {
        console.log(e);
        dispatch(GetIndicesFailed());
      }
    };

    if (pathname === "/indices") {
      getData();
    }

    return () => {
      controller.abort();
    };
  }, [pathname]);

  return (
    <Container>
      <TableHeader>
        <Description>Index Name</Description>
        <ColumnHeader>Last Traded</ColumnHeader>
        <ColumnHeader>Day Change</ColumnHeader>
        <ColumnHeader>High</ColumnHeader>
        <ColumnHeader>Low</ColumnHeader>
        <ColumnHeader>Open</ColumnHeader>
        <ColumnHeader>Prev. Close</ColumnHeader>
      </TableHeader>
      {indices.length === 0
        ? Array.from({ length: 8 }).map((_, id) => (
            <Skeleton key={id} minWidth={1074} height={50} />
          ))
        : indices.map((index, id) => (
            <TableRow key={id}>
              <RowDescription>
                <IndexImage src="https://assets-netstorage.groww.in/stock-assets/logos/NSE.png" />
                <p>{index.company}</p>
              </RowDescription>
              <Column>{index.last_trade}</Column>
              <Column>
                <p
                  style={{
                    color:
                      parseFloat(index.day_chg) > 0 ? "#37c327" : "#f62b2b",
                  }}
                >
                  {console.log(parseFloat(index.day_chg) > 0)}
                  {index.day_chg}
                </p>
              </Column>

              <Column>{index.high}</Column>
              <Column>{index.low}</Column>
              <Column>{index.open}</Column>
              <Column>{index.prev_close}</Column>
            </TableRow>
          ))}
    </Container>
  );
};

export default Table;
