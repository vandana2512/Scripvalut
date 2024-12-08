import React, { useEffect } from "react";
import styled from "styled-components";
import StockViewBox from "./StockViewBox";
import { useDispatch, useSelector } from "react-redux";
import {
  GetFiftyTwoWeekHigh,
  GetFiftyTwoWeekLow,
  GetTopGainers,
  GetTopLosers,
} from "../apicalls/StockApicalls";
import { Link, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { mobile, tablet } from "../responsive";
import axios from "axios";
import { useState } from "react";

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
  flex-direction: start;
  width: 100%;
  gap: 1em;
  ${mobile({ flexDirection: "column" })}
`;

const Title = styled.h2`
  font-family: "Space grotesk";
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em;
`;

const Slider = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  transition: all 0.3s linear;
  ${tablet({ justifyContent: "center" })}
`;

const TopLosersBox = ({ data, type }) => {
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const [List, setList] = useState([]);

  const { top_losers, isLoading, error } = useSelector((state) => state.stocks);

  useEffect(() => {
    let isSubscribed = true;

    const getData = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_STOCK_API}/all-top-stocks/${type}`
        );
        console.log(result.data);

        setList(result.data);
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);

  return (
    <Container>
      <Top>
        <Title>Top Losers</Title>
        <Link
          to="/market/top-losers"
          style={{ color: "#4be93b", textDecoration: "none" }}
        >
          {" "}
          See more
        </Link>
      </Top>
      <Bottom>
        <Slider>
          {List?.slice(0, 5).map((box, i) => (
            <StockViewBox key={i} {...box} />
          ))}
        </Slider>
        <Slider>
          {!List &&
            Array.from({ length: 5 }).map((b, i) => (
              <Skeleton key={i} height={200} width={180} />
            ))}
        </Slider>

        {List && List?.length == 0 && <p>No stocks top gainer today</p>}
      </Bottom>
    </Container>
  );
};

export default TopLosersBox;
