import styled, { css } from "styled-components";

export const laptop = (props) => {
  return css`
    @media screen and (max-width: 1080px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media screen and (max-width: 768px) {
      ${props}
    }
  `;
};

export const mobile = (props) => {
  return css`
    @media screen and (max-width: 456px) {
      ${props}
    }
  `;
};
