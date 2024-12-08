import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useGetIndices } from "../customhooks/useGetIndices";
import { Link, useLocation } from "react-router-dom";
import { tablet } from "../responsive";
import {
  GetIndicesFailed,
  GetIndicesSuccess,
} from "../redux/StockDetailsSlice";
import axios from "axios";
import { GetMutualFund } from "../apicalls/MutualFundCalls";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  flex-direction: column;
  margin-top: 1em;
  gap: 1em;
  padding: 1em;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.h2`
  font-family: "Space grotesk";
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 1em;
  flex-wrap: wrap;
  ${tablet({ justifyContent: "center" })}
`;

const Widgets = styled.div`
  max-width: 15em;
  box-shadow: 0px 0px 9px 1px rgba(0, 0, 0, 0.1);
  border-radius: 0.5em;
  padding: 0.8em;
  display: flex;
  flex-direction: column;
  gap: 0.8em;
  word-wrap: break-word;
`;

const IndexName = styled.p`
  font-size: 1em;
  font-weight: 500;
`;

const WidgetsBottom = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8em;
  font-weight: 400;
`;

const PercentageChange = styled.p`
  color: ${(props) => (props.change === "positive" ? "#46ce37" : "red")};
`;

const LoaderDiv = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  gap: 1em;
`;

const LoaderSkeletons = styled(Skeleton)`
  box-shadow: 0px 0px 9px 1px rgba(0, 0, 0, 0.1);
  border-radius: 0.5em;
  padding: 0.8em;
  display: flex;
  flex-direction: column;
  gap: 0.8em;
  word-wrap: break-word;
`;

const IndexWrapper = ({ data }) => {
  // const [IndicesData] = useGetIndices();

  const { indices, isLoading, error } = useSelector((state) => state.stocks);
  const { pathname } = useLocation();

  return (
    <Container>
      <Top>
        <Title>Index</Title>
        <Link
          style={{ textDecoration: "none", color: "#4BE93B" }}
          to="/indices"
        >
          All indices
        </Link>
      </Top>

      <Bottom>
        {indices.length === 0 ? (
          <LoaderDiv>
            <LoaderSkeletons width={220} height={80} />
            <LoaderSkeletons width={220} height={80} />
            <LoaderSkeletons width={220} height={80} />
            <LoaderSkeletons width={220} height={80} />
          </LoaderDiv>
        ) : (
          indices?.slice(0, 4).map((index, id) => (
            <Widgets key={id}>
              <IndexName>{index.company}</IndexName>
              <WidgetsBottom>
                <p>{index.last_trade}</p>
                <PercentageChange
                  change={
                    parseFloat(index.day_chg) > 0 ? "positive" : "negative"
                  }
                >
                  {index.day_chg}
                </PercentageChange>
              </WidgetsBottom>
            </Widgets>
          ))
        )}
      </Bottom>
    </Container>
  );
};

export default IndexWrapper;
