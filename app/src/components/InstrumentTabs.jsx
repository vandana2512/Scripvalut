import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border-bottom: 1px solid #e5e5e5b5;
`;

const Tabs = styled.div`
  min-width: 70%;
  display: flex;
  align-items: center;
  height: 100%;
`;

const Tab = styled(Link)`
  min-width: 100px;
  border-bottom: ${(props) => props.active === "true" && "3px solid #4be93b"};
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 1.2em;
  cursor: pointer;
  padding: 0.5em;
  text-decoration: none;
  color: #000;
`;

const InstrumentTabs = () => {
  const { pathname } = useLocation();

  console.log(pathname);

  return (
    <Container>
      <Tabs>
        <Tab
          active={pathname === "/explore/stocks" ? "true" : "false"}
          to="/explore/stocks"
        >
          Stocks
        </Tab>
        <Tab
          active={pathname === "/explore/mutualfund" ? "true" : "false"}
          to="/explore/mutualfund"
        >
          Mutual Fund
        </Tab>
      </Tabs>
    </Container>
  );
};

export default InstrumentTabs;
