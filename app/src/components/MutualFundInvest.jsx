import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import {
  SetSIPDate,
  SetSipFrequncy,
  SetopenPopup,
} from "../redux/MutualFundSlice";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { userRequest, publicRequest } from "../apiRequest";
import toast, { Toaster } from "react-hot-toast";

const Container = styled.div`
  display: flex;
  position: absolute;
  width: 22em;
  max-height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  box-shadow: -1px 0px 10px 1px rgba(0, 0, 0, 0.1);
  padding: 1em;
  background-color: #fff;
  flex-direction: column;
  gap: 2em;
  transition: all 0.8s ease-in-out;
  transform: ${(props) =>
    props.show === "open" ? "translateX(0%)" : "translateX(100%)"};
`;

const InnerBox = styled.div`
  display: flex;
  min-width: 100%;
  flex-direction: column;
  align-content: start;
  gap: 2em;
`;

const AmountBox = styled.div`
  min-width: 100%;
  position: relative;

  input {
    border: 1px solid #4be93c;
    border-radius: 5px;
    height: 3em;
    padding: 0.5em;
    width: 100%;
    outline: none;
    padding-left: 3em;
    font-size: 1em;
    font-weight: 600;
    color: #4be93c;
  }
  p {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 1em;
    font-weight: 600;
    color: #4be93c;
  }
`;

const SetAmountBox = styled.div`
  width: 100%;
  display: flex;
  gap: 1em;
`;

const Box = styled.div`
  width: 5em;
  height: 2em;
  padding: 0.2em;
  border-radius: 2px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5em;
  cursor: pointer;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

  p {
    font-size: 0.8em;
    line-height: 1.5;
    color: #757575;
  }
`;

const Button = styled.button`
  font-family: "Space Grotesk", sans-serif;
  width: 100%;
  background-color: #4be94b;
  border-radius: 10px;
  font-size: 1.2em;
  padding: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  box-shadow: 0px 2px 0px 1px #454545;
  outline: none;
  border: none;
`;

const DatePickerValue = () => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  console.log(value);

  const handleChange = (newValue) => {
    dispatch(SetSIPDate(newValue.$d));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DatePicker
          label="SIP Installment Date"
          value={value}
          onChange={(newValue) => handleChange(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

const SelectSmall = () => {
  const [frequency, setfrequency] = useState("monthly");

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setfrequency(event.target.value);
    dispatch(SetSipFrequncy(event.target.value));
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Frequency</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={frequency}
        label="Frequency"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"monthly"}>Monthly</MenuItem>
        <MenuItem value={"quaterly"}>Quaterly</MenuItem>
        <MenuItem value={"yearly"}>Yearly</MenuItem>
      </Select>
    </FormControl>
  );
};

const MutualFundInvest = () => {
  const [Amount, setAmount] = useState(0);
  const [inputData, setInputData] = useState(null);
  const [SellUnits, setSellUnits] = useState(0);

  const { openpopup, type, currentMF, Investtype, sipdate, frequency } =
    useSelector((state) => state.mutualFund);
  const { userid } = useSelector((state) => state.users);

  useEffect(() => {
    if (currentMF.data) {
      let currentNav = currentMF?.data.filter((d, i) => {
        return i === 0 && d.nav;
      });

      let units = Amount / Number(currentNav[0].nav);

      const data = {
        userid: userid,
        fundName: currentMF?.scheme_name,
        units: units.toFixed(3),
        schemetype: type,
        investedAmount: Amount,
        nav: currentNav[0].nav,
        status: "Active",
        code: currentMF?.scheme_code,
        frequency: frequency,
        sipdate: sipdate,
      };

      setInputData(data);
    }
  }, [currentMF, Amount]);

  const dispatch = useDispatch();

  const HandleInvest = async () => {
    try {
      const res = await publicRequest.post(
        `/mutualfund/buymutualfund/${userid}`,
        inputData
      );

      const notify = () => toast.success(res.data);

      if (res.status === 200) {
        notify();
      }
    } catch (e) {
      const notify = () => toast.error("Something went wrong");

      notify();
    }
  };

  const HandleSell = async () => {
    const data = {
      userid: userid,
      fundName: inputData.fundName,
      units: SellUnits,
      status: "Sold",
      code: inputData.code,
      marketPrice: inputData.nav,
    };

    try {
      const res = await publicRequest.post(
        `/mutualfund/sellMF/${userid}`,
        data
      );

      if (res.status === 200) {
        const notify = () => toast.success(res.data);
        notify();
      }
    } catch (e) {
      console.log(e);
      const notify = () => toast.error(e.response.data);

      notify();
    }
  };

  return (
    <Container show={openpopup === true ? "open" : "close"}>
      <Toaster position="top-center" reverseOrder={false} duration={10000} />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          cursor: "pointer",
        }}
      >
        <FontAwesomeIcon
          icon={faClose}
          onClick={() => dispatch(SetopenPopup())}
        />
      </div>
      <h3>{type}</h3>
      <InnerBox>
        <AmountBox>
          <input
            type="text"
            value={Amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <p>₹</p>
        </AmountBox>
      </InnerBox>
      <SetAmountBox>
        <Box onClick={() => setAmount(2000)}>₹ 2000</Box>
        <Box onClick={() => setAmount(5000)}>₹ 5000</Box>
        <Box onClick={() => setAmount(10000)}>₹ 10000</Box>
      </SetAmountBox>
      {type === "Systematic Investment Plan" && <DatePickerValue />}
      {type === "Systematic Investment Plan" && <SelectSmall />}

      <InfoBox>
        <h4>You should know</h4>
        <p>
          Once the buy order is placed, typically it takes up to 3 working days
          for the units to be reflected in your portfolio. You can track the
          order from the open orders tab on the portfolio page.
        </p>
        <Button onClick={() => HandleInvest()}>Invest</Button>
      </InfoBox>
      <InfoBox>
        <h4>Sell units:</h4>
        <AmountBox>
          <input
            type="number"
            placeholder="Enter quantity"
            value={SellUnits}
            onChange={(e) => setSellUnits(e.target.value)}
          />
        </AmountBox>
        <Button onClick={() => HandleSell()}>Sell</Button>
      </InfoBox>
    </Container>
  );
};

export default MutualFundInvest;
