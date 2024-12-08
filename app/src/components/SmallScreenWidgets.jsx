import React from "react";
import styled from "styled-components";
import { tablet } from "../responsive";

const Container = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  ${tablet({ display: "flex" })}
  width:100%;
`;

const Image = styled.div`
  width: 100%;

  img {
    aspect-ratio: 1/1;
  }
`;

const SmallScreenWidgets = () => {
  return (
    <Container>
      <Image>
        <img src="../../small_screen_widget.png" alt="" />
      </Image>
    </Container>
  );
};

export default SmallScreenWidgets;
