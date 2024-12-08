import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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

export default function BasicTable() {
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
    <TableContainer component={Paper}>
      <Table aria-label="simple table" style={{ overflowX: "scroll" }}>
        <TableHead>
          <TableRow>
            <TableCell>Index Name</TableCell>
            <TableCell align="right">Last Traded</TableCell>
            <TableCell align="right">Day Change</TableCell>
            <TableCell align="right">High</TableCell>
            <TableCell align="right">Low</TableCell>
            <TableCell align="right">Open</TableCell>
            <TableCell align="right">Prev. Close</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {indices.map((row) => (
            <TableRow
              key={row.company}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.company}
              </TableCell>
              <TableCell align="right">{row.last_trade}</TableCell>
              <TableCell align="right">{row.day_chg}</TableCell>
              <TableCell align="right">{row.high}</TableCell>
              <TableCell align="right">{row.low}</TableCell>
              <TableCell align="right">{row.open}</TableCell>
              <TableCell align="right">{row.prev_close}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
