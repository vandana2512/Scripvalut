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
`;

const OneDayChart = (props) => {
  let Return =
    (props.data[props.data?.length - 1]?.price - props.data[0]?.price) /
    props.data[0]?.price;

  console.log(Return * 100);

  const Total = parseFloat(Return * 100).toFixed(2);

  return (
    <Container>
      <ResponsiveContainer>
        <LineChart
          data={props.data.map((d) => ({ ...d, price: +d.price }))}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          width={600}
          height={400}
        >
          {/* <CartesianGrid strokeDasharray="5 3" /> */}
          <XAxis dataKey="time" domain={["auto", "auto"]} hide={"true"} />
          <YAxis
            type="number"
            domain={["auto", "auto"]}
            name="Price"
            hide={"true"}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            dot={false}
            strokeWidth={2.5}
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

export default OneDayChart;
