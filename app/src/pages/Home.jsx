import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import TradingViewWidget from "../components/TickerWidget";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  position: relative;
  min-height: ${(props) => props.show === "open" && "100vh"};
`;

const Home = () => {
  const { openpopup } = useSelector((state) => state.mutualFund);

  return (
    <Container show={openpopup === true ? "open" : "close"}>
      <Navbar />
      <TradingViewWidget />
      <small style={{ color: "#3a4beb" }}>
        Note : Server will take some time to connect due to load wait or refresh
        to get connected
      </small>
      <Outlet />
      <Footer />
    </Container>
  );
};

export default Home;
