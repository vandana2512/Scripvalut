import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetCurrentMF, GetMutualFund } from "../apicalls/MutualFundCalls";
import axios from "axios";

import MutualFundChart from "../components/Charts/MutualFundChart";
import MutualFundInvest from "../components/MutualFundInvest";
import { SetopenPopup } from "../redux/MutualFundSlice";

const Container = styled.div`
  width: 70%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2em;
  ${mobile({ width: "90%" })}
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
  flex-wrap: wrap;
  ${tablet({ justifyContent: "center", gap: "2em" })}
`;

const HearderLeft = styled.div``;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 2em;
  ${mobile({ flexDirection: "column" })}
`;

const Button = styled.div`
  min-width: 10em;
  background-color: ${(props) =>
    props.direction === "left" ? "#ffff" : "#4BE94B"};
  font-weight: 600;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em;
  border-radius: 1em;

  border: ${(props) =>
    props.direction === "left" ? "2px solid #ccc" : "none"};
  cursor: pointer;
`;

const ContentBox = styled.div`
  display: flex;
  gap: 2em;
  flex-wrap: wrap;
  ${tablet({ flexDirection: "column" })};
  width: 100%;
`;

const FundInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
  border-radius: 0.5em;
`;

const Column = styled.div`
  width: 100%;
  min-height: 3em;
  background-color: #f1f0f0;
  padding: 1em;

  p {
    font-size: 1.2em;
    font-weight: 600;
  }
`;

const Row = styled.div`
  width: 100%;
  min-height: 4em;
  padding: 0.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f1f0f0;
  gap: 2em;
  p {
    font-size: 0.9em;
    font-weight: 500;
    color: #6e6e6e;
  }
`;

const RatioTable = styled.div`
  width: 100%;
  min-height: 400px;
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

const MutualFundPage = () => {
  const { pathname } = useLocation();

  const name = pathname.split("/")[2];
  const code = pathname.split("/")[3];

  const dispatch = useDispatch();

  const { MFList, currentMF } = useSelector((state) => state.mutualFund);

  const [SelectedFund, setSelectedFund] = useState();

  const getData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_STOCK_API}/get-mutual-fund/${name}/${code}`
      );

      setSelectedFund(res.data[0]);
    } catch (e) {
      console.log(e);
    }
  };

  const x = useMemo(getData, []);

  useEffect(() => {
    let isSubscribe = true;

    if (isSubscribe) {
      getData();
      GetCurrentMF(dispatch, code);
    }

    return () => {
      isSubscribe = false;
    };
  }, [code]);

  // useEffect(() => {

  // }, [code]);

  return (
    <Container>
      <MutualFundInvest />
      {SelectedFund ? (
        <>
          <Header>
            <HearderLeft>
              <h2>{SelectedFund?.scheme_name}</h2>
            </HearderLeft>
            <HeaderRight>
              <Button
                direction="left"
                onClick={() => dispatch(SetopenPopup("One Time Investment"))}
              >
                One Time
              </Button>
              <Button
                onClick={() =>
                  dispatch(SetopenPopup("Systematic Investment Plan"))
                }
              >
                SIP
              </Button>
            </HeaderRight>
          </Header>
          <RatioTable>
            <MutualFundChart data={currentMF?.data} />
          </RatioTable>
          <ContentBox>
            {SelectedFund && (
              <FundInfo>
                <Column>
                  <p>Fund Info</p>
                </Column>
                <Row>
                  <p>Launched on</p>
                  {/* <p>{currentMF?.scheme_start_date.date}</p> */}
                </Row>
                {SelectedFund?.fundamentals.map((fundamental, index) => (
                  <Row key={index}>
                    {Object.entries(fundamental).map(([field, value]) => (
                      <>
                        <p>{field}</p>
                        <p>{value}</p>
                      </>
                    ))}
                  </Row>
                ))}
              </FundInfo>
            )}

            <FundInfo>
              <Column>
                <p>Returns</p>
              </Column>
              {SelectedFund?.returns.map((returns, index) => (
                <Row>
                  {Object.entries(returns).map(([field, value]) => (
                    <>
                      <p>
                        {field === "one_year_return"
                          ? "1 Yr"
                          : field === "three_year_return"
                          ? "3Yr"
                          : field === "five_year_return"
                          ? "5 Yr"
                          : field === "All_return"
                          ? "Over All Return"
                          : ""}
                      </p>
                      <p>{value}</p>
                    </>
                  ))}
                </Row>
              ))}
            </FundInfo>
            <FundInfo>
              <Column>
                <p>Fund Managers</p>
              </Column>
              {SelectedFund?.fundmanagers.map((fundM, index) => (
                <Row key={index}>
                  <p>{fundM}</p>
                </Row>
              ))}
            </FundInfo>
          </ContentBox>

          <RatioTable>
            <FundInfo>
              <Column>
                <p>Ratios</p>
              </Column>
              {SelectedFund?.ratio.map((ratio, index) => (
                <Row>
                  {Object.entries(ratio).map(([field, value]) => (
                    <>
                      <p style={{ flex: "1" }}>{field}</p>
                      <p style={{ flex: "3" }}>{value}</p>
                    </>
                  ))}
                </Row>
              ))}
            </FundInfo>
          </RatioTable>
        </>
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default MutualFundPage;
