import React from "react";
import { Outlet } from "react-router-dom";
import InstrumentTabs from "./InstrumentTabs";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const Stocks = () => {
  return (
    <Container>
      <InstrumentTabs />
      <Outlet />
    </Container>
  );
};

export default Stocks;
