import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";
import { publicRequest, userRequest } from "../apiRequest";

const Container = styled.div`
  width: 11.29rem;
  min-height: 200px;
  padding: 1em;
  border-radius: 0.5em;
  box-shadow: 0px 0px 9px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Top = styled.div`
  display: flex;

  flex-direction: column;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 3px;
  }
`;

const AddStockButton = styled(FontAwesomeIcon)`
  color: #4be93b;
  font-size: 1.5em;
  display: ${(props) => (props.show === true ? "block" : "none")};
  cursor: pointer;
`;

const StockName = styled(Link)`
  width: fit-content;
  font-weight: 600;
  text-decoration: none;
  color: black;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6em;
`;

const Price = styled.p`
  font-weight: 500;
`;
const PriceChange = styled.p`
  font-size: 0.9em;
  background-color: #d5fcd0;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border-radius: 5px;
`;

const StockViewBox = ({ ...props }) => {
  const [ShowAddbutton, setShowAddbutton] = useState(false);

  const { isLoading, error, CurrentStockData, livePrice } = useSelector(
    (state) => state.stocks
  );

  const { userid } = useSelector((state) => state.users);

  const shortname = props.short_name?.split("-")[0];

  const HandleHover = () => {
    setShowAddbutton(true);
  };

  const HandleLeave = () => {
    setShowAddbutton(false);
  };

  const HandleAddtoWatchList = async () => {
    const data = {
      userid: userid,
      stockname: props.company_name,
      status: "Watchlist",
    };

    try {
      const res = await publicRequest.post(
        `/stocks/addtowatchlist/${userid}`,
        data
      );

      const Success = () => toast.success(res.data);

      Success();
    } catch (e) {
      const Error = () => toast.error(e.response.data);

      Error();
    }
  };

  return (
    <Container
      onMouseOver={() => HandleHover()}
      onMouseLeave={() => HandleLeave()}
    >
      <Toaster position="top-center" reverseOrder={false} duration={10000} />
      <Top>
        <div>
          <img
            src="https://assets-netstorage.groww.in/stock-assets/logos/NSE.png"
            alt=""
          />
          <AddStockButton
            onClick={() => HandleAddtoWatchList()}
            show={ShowAddbutton}
            icon={faPlusCircle}
          />
        </div>

        <StockName to={`/stock/${props.company_name.replace(/[-()]/g, "")}`}>
          {props.company_name?.length > 20
            ? `${props.company_name.slice(0, 10)}...`
            : props.company_name}
        </StockName>
      </Top>

      <Bottom>
        <Price> {props.market_price}</Price>
        {/* {props.type !== "week" && (
          <PriceChange
            style={{
              color:
                parseFloat(props.per_chg.replace("%", "")) > 0
                  ? "#3ec22f"
                  : "red",
              backgroundColor:
                parseFloat(props.per_chg.replace("%", "")) > 0
                  ? "#d5fcd0"
                  : "#fcd0d0",
            }}
          >
            {props.per_chg}
          </PriceChange>
        )} */}
      </Bottom>
    </Container>
  );
};

export default StockViewBox;
