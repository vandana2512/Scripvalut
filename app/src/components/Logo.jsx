import React from "react";
import styled, { keyframes } from "styled-components";

const Appear = keyframes`
  
  from{

    opacity: 0;
  }
  to{

    opacity:1
  }


`;

const MainLogo = styled.div`
  width: 8em;
  height: 5em;
  animation: ${Appear} 2s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Logo = () => {
  return (
    <MainLogo>
      <img src="../Logo.png" alt="Logo" />
    </MainLogo>
  );
};

export default Logo;
