import React, { useEffect } from "react";
import styled from "styled-components";
import Logo from "../components/Logo";
import Widgets from "../components/Widgets";
import Widgetsilder from "../components/Widgetsilder";
import RegisterForm from "../components/RegisterForm";
import { tablet } from "../responsive";
import SmallScreenWidgets from "../components/SmallScreenWidgets";
import LoginForm from "../components/LoginForm";
import { useLocation } from "react-router-dom";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import ResetPasswordForm from "../components/ResetPasswordForm";

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100%;
  ${tablet({ flexDirection: "column" })};
  overflow: hidden;
`;

const Left = styled.div`
  flex: 1;
  background-color: #f5f5f5;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 2em;
  gap: 1em;
`;

const ContentBox = styled.div`
  min-width: 70%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2em;
`;

const Top = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 80%;
`;

const Center = styled.div`
  flex: 5;
  max-width: 500px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Bottom = styled.div`
  display: flex;
  width: 450px;
  user-select: none;
  overflow: hidden;
  position: relative;
  justify-content: center;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -2%;
    background: linear-gradient(to left, #f5f5f510, #f5f5f5);
    width: 100px;
    height: 100%;
    z-index: 3;
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: -2%;
    background: linear-gradient(to right, #f5f5f510, #f5f5f5);
    width: 100px;
    height: 100%;
    z-index: 4;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 1em;
`;

const AuthorizationPage = () => {
  const { pathname } = useLocation();

  return (
    <Container>
      <Left>
        <ContentBox>
          <Top>
            <Logo />
          </Top>
          <Center>
            <Widgets />
            <SmallScreenWidgets />
          </Center>
          <Bottom>
            <Widgetsilder />
          </Bottom>
        </ContentBox>
      </Left>
      <Right>
        {pathname === "/register" ? (
          <RegisterForm />
        ) : pathname === "/login" ? (
          <LoginForm />
        ) : pathname === `/forgot-password` ? (
          <ForgotPasswordForm />
        ) : pathname === `/reset-password` ? (
          <ResetPasswordForm />
        ) : null}
      </Right>
    </Container>
  );
};

export default AuthorizationPage;
