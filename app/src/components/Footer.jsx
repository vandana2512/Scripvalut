import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFontAwesome,
  faFacebook,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { mobile, tablet } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 15em;
  padding: 1em;
  background-color: #000;
  display: flex;
  align-items: start;
  justify-content: center;
`;

const InnerBox = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  small {
    color: #fff;
  }
`;

const TopBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ flexDirection: "column", alignItems: "start", gap: "2em" })}
`;

const Socials = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;

  img {
    cursor: pointer;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  color: #fff;
  font-size: 2em;
  cursor: pointer;
`;

const Footer = () => {
  return (
    <Container>
      <InnerBox>
        <TopBox>
          <Logo />
          <Socials>
            <Icon icon={faFacebook} />
            <Icon style={{ color: "#fff" }} icon={faTwitter} />
            <Icon style={{ color: "#fff" }} icon={faInstagram} />
            <Icon style={{ color: "#fff" }} icon={faGithub} />
          </Socials>
        </TopBox>
        <small>&#169; 2023 ScripVault India, Inc. All rights reserved</small>
      </InnerBox>
    </Container>
  );
};

export default Footer;
