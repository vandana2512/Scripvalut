import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { GetMutualFund } from "../apicalls/MutualFundCalls";
import MutualFundTable from "./MutualFundTable";
import { tablet } from "../responsive";

const Container = styled.div`
  min-width: 70%;
  min-height: 100vh;
`;

const TableContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em;
  flex-direction: column;
  gap: 1em;
`;

const Loader = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border-top: 5px solid #4be94b;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #4be94b;
  animation: rotate 5s linear infinite;
  margin-top: 2em;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const MutulaFundHome = () => {
  const { MFList } = useSelector((state) => state.mutualFund);

  if (MFList.length === 0) {
    return <Loader />;
  }

  return (
    <Container>
      <TableContainer>
        <h2>Top Mutual Fund List</h2>
        <MutualFundTable />
      </TableContainer>
    </Container>
  );
};

export default MutulaFundHome;
