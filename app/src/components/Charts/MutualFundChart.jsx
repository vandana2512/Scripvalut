import React from "react";
import styled from "styled-components";
import {
  LineChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";

const Container = styled.div`
  width: 100%;
  min-height: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.1);
  padding: 1em;
  border-radius: 0.5em;
`;

const MutualFundChart = (props) => {
  return (
    <Container>
      <h4>All time NAV. Chart:</h4>
      <h3>
        Current Nav.:
        <span style={{ color: "#4BE94B" }}>
          ₹{" "}
          {props.data?.map((d, i) => {
            return i === 0 && d.nav;
          })}
        </span>
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={props.data?.map((d) => ({ ...d, nav: +d.nav }))}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          width={600}
          height={400}
        >
          {/* <CartesianGrid strokeDasharray="5 3" /> */}
          <XAxis
            dataKey="date"
            domain={["auto", "auto"]}
            interval="preserveStart"
            reversed
            hide={"true"}
          />
          <YAxis
            dataKey="nav"
            domain={["auto", "auto"]}
            name="Price"
            hide={"true"}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="nav"
            dot={false}
            strokeWidth={2.5}
            stroke="#4be94b"
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default MutualFundChart;
