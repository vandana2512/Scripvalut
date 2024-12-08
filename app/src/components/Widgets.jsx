import React from "react";
import styled, { keyframes } from "styled-components";
import { tablet } from "../responsive";

const SlideIn = keyframes`

    from{

      transform:translateX(-100%)
    }
    to{

      transform:translateX(0%)
    }

`;

const Container = styled.div`
  position: sticky;
  height: 80%;
  width: 100%;
  ${tablet({ display: "none" })};
`;

const Widget = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: cover;
  width: 100%;
  height: 100%;
  animation: ${SlideIn} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

const Widgets = () => {
  return (
    <Container>
      <Widget src="../../Register_widget.webp" />
    </Container>
  );
};

export default Widgets;
