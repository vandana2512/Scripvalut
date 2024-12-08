import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MarketMood from "../components/MarketMood";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: 3em;
  ${mobile({ width: "90%" })}
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 3em;
  margin-top: 3em;
  text-align: center;
  p {
    font-size: clamp(1.1em, 5vw, 2em);
    animation: pop 3s ease-in-out;

    @keyframes pop {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
  img {
    width: 80%;
    animation: pop 2s ease-in-out;

    @keyframes pop {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
`;

const Heading = styled.h1`
  font-size: clamp(7vw, 3em, 50vw);
  text-align: center;
  font-weight: 500;
  animation: show 1s linear;
  position: relative;

  @keyframes show {
    0% {
      opacity: 0;
      top: -1em;
    }
    100% {
      opacity: 1;
      top: 0;
    }
  }
`;

const Button = styled.button`
  font-family: "Space Grotesk", sans-serif;
  min-width: 20%;
  background-color: #4be94b;
  border-radius: 10px;
  font-size: 1.2em;
  padding: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  box-shadow: 0px 2px 0px 1px #454545;
  outline: none;
  border: none;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  padding: 2em 0;
  margin-bottom: 1em;

  img {
    width: 40%;
    animation: view 1s linear;
    position: relative;

    @keyframes view {
      0% {
        right: -50%;
        opacity: 0;
      }
      100% {
        right: 0;
        opacity: 1;
      }
    }
  }
`;

const Title = styled.h3`
  font-size: clamp(1.1em, 5vw, 3em);
  font-weight: 500;
  position: relative;
  animation: arrive 1s linear;

  @keyframes arrive {
    0% {
      left: -50%;
      opacity: 0;
    }
    100% {
      left: 0;
      opacity: 1;
    }
  }
`;

const Introduction = () => {
  return (
    <Container>
      <Top>
        <Heading>Empowering Investors, Unleashing Potential</Heading>
        <p>Your Gateway to India's Stock Market</p>
        <Link to="/explore/stocks" style={{ textDecoration: "none" }}>
          <Button>Get Started</Button>
        </Link>
        <img src="../../introbg.svg" alt="" />
      </Top>
      <MarketMood />
      <Center>
        <Title>Indian Markets at your fingertips</Title>
        <img src="../../stockprice.svg" />
      </Center>
      <Center style={{ flexDirection: "row-reverse" }}>
        <Title>Get Intial Credit for Stock Trading</Title>
        <img src="../../savings.svg" />
      </Center>
    </Container>
  );
};

export default Introduction;
