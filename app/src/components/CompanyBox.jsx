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
import { Switch } from "@mui/material";

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

const CompanyBox = (props) => {
  const {
    fiftyTwoWeekHighData,
    fiftyTwoWeekLowData,
    top_gainers,
    top_losers,
    isLoading,
    error,
  } = useSelector((state) => state.stocks);

  // useEffect(() => {
  //   if (props.info.type === "Top Gainers") {
  //     setTimeout(GetTopGainers(dispatch, props.info.link), 1000);
  //   }
  //   if (props.info.type === "Top Losers") {
  //     setTimeout(GetTopLosers(dispatch, props.info.link), 1000);
  //   }
  //   if (props.info.type === "52 Week High") {
  //     setTimeout(GetFiftyTwoWeekHigh(dispatch, props.info.link), 1000);
  //   }
  //   if (props.info.type === "52 Week Low") {
  //     setTimeout(GetFiftyTwoWeekLow(dispatch, props.info.link), 1000);
  //   }
  // }, [dispatch, props.info.type, props.info.link, pathname]);

  return (
    <Container>
      <Top>
        <Title>{props.info.type}</Title>
        <Link
          to={
            props.info.type === "Top Gainers"
              ? "/market/top-gainers"
              : props.info.type === "Top Losers"
              ? "/market/top-losers"
              : props.info.type === "52 Week High"
              ? "/market/52-week-high"
              : "/market/52-week-low"
          }
          style={{ color: "#4be93b", textDecoration: "none" }}
        >
          See more
        </Link>
      </Top>
      {props.info.type === "Top Gainers" && (
        <Bottom>
          <Slider>
            {top_gainers.slice(0, 5).map((box, i) => (
              <StockViewBox key={i} {...box} />
            ))}
          </Slider>
          <Slider>
            {top_gainers.length === 0 &&
              isLoading &&
              Array.from({ length: 5 }).map((b, i) => (
                <Skeleton height={200} width={180} />
              ))}
          </Slider>

          {!error && !isLoading && top_gainers.length === 0 && (
            <p>No stocks top gainer today</p>
          )}
        </Bottom>
      )}
      {props.info.type === "Top Losers" && (
        <Bottom>
          <Slider>
            {top_losers.slice(0, 5).map((box, i) => (
              <StockViewBox key={i} {...box} />
            ))}
          </Slider>
          <Slider>
            {top_losers.length === 0 &&
              isLoading &&
              Array.from({ length: 5 }).map((b, i) => (
                <Skeleton height={200} width={180} />
              ))}
          </Slider>

          {!error && !isLoading && top_losers.length === 0 && (
            <p>No stocks top loser today</p>
          )}
        </Bottom>
      )}
      {props.info.type === "52 Week High" && (
        <Bottom>
          <Slider>
            {fiftyTwoWeekHighData.slice(0, 5).map((box, i) => (
              <StockViewBox key={i} {...box} type="week" />
            ))}
          </Slider>
          <Slider>
            {fiftyTwoWeekHighData.length === 0 &&
              isLoading &&
              Array.from({ length: 5 }).map((b, i) => (
                <Skeleton height={200} width={180} />
              ))}
          </Slider>

          {!error && !isLoading && fiftyTwoWeekHighData.length === 0 && (
            <p>No stocks touch 52 week high today</p>
          )}
        </Bottom>
      )}
      {props.info.type === "52 Week Low" && (
        <Bottom>
          <Slider>
            {fiftyTwoWeekLowData.slice(0, 5).map((box, i) => (
              <StockViewBox key={i} {...box} type="week" />
            ))}
          </Slider>
          <Slider>
            {fiftyTwoWeekLowData.length === 0 &&
              isLoading &&
              Array.from({ length: 5 }).map((b, i) => (
                <Skeleton height={200} width={180} />
              ))}
          </Slider>

          {!error && !isLoading && fiftyTwoWeekLowData.length === 0 && (
            <p>No stocks touch 52 week low today</p>
          )}
        </Bottom>
      )}
    </Container>
  );
};

export default CompanyBox;
