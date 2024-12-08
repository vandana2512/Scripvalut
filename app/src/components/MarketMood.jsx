import React, { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const InnerBox = styled.div`
  width: 100%;
  height: 100%;
`;

const MarketMood = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      interval: "1m",
      width: "100%",
      isTransparent: false,
      height: "100%",
      symbol: "BSE:SENSEX",
      showIntervalTabs: true,
      locale: "in",
      colorTheme: "light",
    });

    document
      .getElementsByClassName("tradingview-widget-container__widget1")[0]
      ?.appendChild(script);

    return () => {
      // Clean up the script tag when the component unmounts
      document
        .getElementsByClassName("tradingview-widget-container__widget1")[0]
        ?.removeChild(script);
    };
  }, []);
  return (
    <Container className="tradingview-widget-container">
      <InnerBox className="tradingview-widget-container__widget1"></InnerBox>
      <div className="tradingview-widget-copyright">
        <a
          href="https://in.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </Container>
  );
};

export default MarketMood;
