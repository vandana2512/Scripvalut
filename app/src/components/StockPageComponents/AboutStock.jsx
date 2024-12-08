import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { mobile } from "../../responsive";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  color: #44475b;
`;

const Heading = styled.p`
  font-weight: 600;
  font-size: 1.3em;
  color: #44475b;
`;

const MainBox = styled.div`
  display: flex;
  border-radius: 0.5em;
  ${mobile({ flexDirection: "column", alignItems: "start" })}
`;

const DescriptionBox = styled.p`
  line-height: 1.5;
  font-weight: 400;
  text-align: justify;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  flex: 1;
  color: #44475b;
  border-right: 1px dashed #afafaf;
  padding-right: 1em;
  ${mobile({ borderRight: "none", paddingRight: "0" })}
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  flex: 1;
  color: #44475b;
  padding-left: 1em;
  ${mobile({ borderRight: "none", paddingLeft: "0" })}
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2em;
  p {
    flex: 1;
  }
  h4 {
    flex: 1;
  }
`;

const AboutStock = () => {
  const { isLoading, error, CurrentStockData } = useSelector(
    (state) => state.stocks
  );

  if (isLoading) {
    // Render loading state or placeholder
    return <Skeleton style={{ width: "100%", height: "400px" }} />;
  }

  if (error) {
    // Render error state or error message
    return <div>Error: {error}</div>;
  }

  if (!CurrentStockData) {
    // Render null or placeholder when CurrentStockData is not available
    return null;
  }

  return (
    <Container>
      <Heading>About</Heading>
      <DescriptionBox>
        {CurrentStockData["basic_info"]["longBusinessSummary"]}
      </DescriptionBox>
      <MainBox>
        <Left>
          <Row>
            <p>Parent Organisation</p>
            <h4>{CurrentStockData["basic_info"]["longName"]}</h4>
          </Row>
          <Row>
            <p>Sector</p>
            <h4>{CurrentStockData["basic_info"]["sector"]}</h4>
          </Row>
        </Left>
        <Right>
          <Row>
            <p>Manaing Director</p>
            <h4>
              {CurrentStockData["basic_info"]["companyOfficers"]
                ? CurrentStockData["basic_info"]["companyOfficers"][1]["name"]
                : "--"}
            </h4>
          </Row>
          <Row>
            <p>NSE Symbol</p>
            <h4>{CurrentStockData["basic_info"]["symbol"]}</h4>
          </Row>
        </Right>
      </MainBox>
    </Container>
  );
};

export default AboutStock;
