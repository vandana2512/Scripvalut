import React from "react";
import styled from "styled-components";
import Table from "./Table";
import BasicTable from "./ResponsiveTable";
import { tablet } from "../responsive";

const Container = styled.div`
  width: 70%;
  display: flex;
  align-items: start;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 1em;
  gap: 2em;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.h2`
  font-family: "Space grotesk";
`;

const IndicesTable = () => {
  return (
    <Container>
      <Title>All Indices</Title>
      <Table />

      {/* <BasicTable /> */}
    </Container>
  );
};

export default IndicesTable;
