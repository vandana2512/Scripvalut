import React, { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  min-width: 70%;
`;

const TradingViewWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          description: "",
          proName: "RELIANCE",
        },
        {
          description: "",
          proName: "HDFCBANK",
        },
        {
          description: "",
          proName: "ICICIBANK",
        },
        {
          description: "",
          proName: "AXISBANK",
        },
        {
          description: "",
          proName: "TATAMOTORS",
        },
        {
          description: "",
          proName: "SBIN",
        },
        {
          description: "",
          proName: "BAJFINANCE",
        },
        {
          description: "",
          proName: "TCS",
        },
      ],
      showSymbolLogo: true,
      colorTheme: "light",
      isTransparent: false,
      displayMode: "adaptive",
      locale: "in",
    });

    document
      .getElementById("tradingview-widget-container")
      ?.appendChild(script);

    return () => {
      document
        .getElementById("tradingview-widget-container")
        ?.removeChild(script);
    };
  }, []);

  return (
    <Container id="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
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

export default TradingViewWidget;
