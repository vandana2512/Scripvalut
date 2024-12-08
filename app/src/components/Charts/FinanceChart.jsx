import React from "react";
import styled from "styled-components";
import {
  BarChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  ReferenceLine,
} from "recharts";

const Container = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 2em;
`;

const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
  return (
    <text
      x={x + width / 2}
      y={y}
      fill="#666"
      textAnchor="middle"
      dy={-5}
      fontSize={13}
      fontWeight={500}
    >{`${value}`}</text>
  );
};

const FinanceChart = (props) => {
  console.log(props.data);
  return (
    <Container>
      <ResponsiveContainer>
        <BarChart
          data={props.data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* <CartesianGrid strokeDasharray="5 3" /> */}
          <XAxis dataKey="year" fontSize={13} />
          <YAxis domain={["auto", "auto"]} hide="true" name="amount" />
          <ReferenceLine y={0} stroke="#666" strokeDasharray="3 3" />
          {/* <Tooltip /> */}
          <Bar
            type="monotone"
            fill="#4be93d"
            dataKey="amount"
            barSize={20}
            label={renderCustomBarLabel}
          />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default FinanceChart;
