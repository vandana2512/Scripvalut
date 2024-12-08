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
  width: "100%";
  min-height: 400px;
  display: flex;
  flex-direction: column;
`;

const YearChart = (props) => {
  let Return =
    (props.data[props.data?.length - 1]?.price - props.data[0]?.price) /
    props.data[0]?.price;

  const Total = (Return * 100).toFixed(2);
  return (
    <Container>
      <ResponsiveContainer>
        <LineChart data={props.data.map((d) => ({ ...d, price: +d.price }))}>
          {/* <CartesianGrid strokeDasharray="5 3" /> */}
          <XAxis dataKey="number" hide="true" />
          <YAxis hide="true" name="Price" domain={["auto", "auto"]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            dot={false}
            strokeWidth={3}
            stroke={
              props.data[0]?.price - props.data[props.data?.length - 1]?.price >
              0
                ? "#e9443b"
                : "#4be93b"
            }
          />
        </LineChart>
      </ResponsiveContainer>
      <p style={{ fontWeight: "500" }}>Total Return: {Total}%</p>
    </Container>
  );
};

export default YearChart;
