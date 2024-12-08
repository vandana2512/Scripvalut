import React from "react";
import styled, { keyframes } from "styled-components";

const Links = [
  "money_bag.png",
  "money_chart.png",
  "money_mobile.png",
  "money_user.png",
  "pie_money.png",
];
const ScrollX = keyframes`
  
  from {

    transform:translateX(0)
  }

  to {

    transform:translateX(-450px)
  }


`;

const MarquerGroup = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
  animation: ${ScrollX} 10s infinite linear;
`;

const ImageGroup = styled.div`
  display: grid;
  place-items: center;
  width: clamp(10rem, 1rem+40vmin, 30rem);
  padding: calc(clamp(10rem, 1rem+40vmin, 30rem) / 10);
`;

const Image = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  aspect-ratio: 16/9;
  padding: 5px 20px;
`;

const Widgetsilder = () => {
  return (
    <MarquerGroup>
      {Links.map((link, id) => (
        <ImageGroup key={id}>
          <Image src={`../../${link}`} />
        </ImageGroup>
      ))}
      {Links.map((link, id) => (
        <ImageGroup key={id}>
          <Image src={`../../${link}`} />
        </ImageGroup>
      ))}
      {Links.map((link, id) => (
        <ImageGroup key={id}>
          <Image src={`../../${link}`} />
        </ImageGroup>
      ))}
    </MarquerGroup>
  );
};

export default Widgetsilder;
