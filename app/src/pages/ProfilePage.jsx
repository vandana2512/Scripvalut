import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { userRequest, publicRequest } from "../apiRequest";
import toast, { Toaster } from "react-hot-toast";
import { tablet } from "../responsive";

const Container = styled.div`
  display: flex;
  min-width: 70%;
  padding: 1em;
  gap: 2em;
  flex-direction: column;
`;

const InnerBox = styled.div`
  display: flex;
  min-width: 70%;
  padding: 1em;
  gap: 2em;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);
  border-radius: 0.5em;
  padding: 3em;
  ${tablet({ flexDirection: "column" })}
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1em;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6em;
  label {
    font-size: 1em;
    font-weight: 600;
  }

  input {
    border: none;
    outline: none;
    border-bottom: 1px solid gray;
    font-size: 1.1em;
    padding: 0.5em;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1em;
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

const ProfilePage = () => {
  const { name, userid } = useSelector((state) => state.users);

  const [Name, setName] = useState(name);
  const [mobileNumber, setMobileNumber] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");

  const HandleUpdate = async () => {
    try {
      const res = publicRequest.post(
        `/user_auth/user_update/${userid}?filter=all`,
        {
          mobileNumber,
          dob,
          address,
          gender,
        }
      );

      const success = () => toast.success("Profile Updated Sucessfully");

      success();
    } catch (e) {
      const failure = () => toast.success("Something went wrong");

      failure();
      console.log(e);
    }
  };

  return (
    <Container>
      <Toaster />
      <h2>Profile Update:</h2>
      <InnerBox>
        <Left>
          <InputBox>
            <label>Name</label>
            <input type="text" value={Name} disabled />
          </InputBox>
          <InputBox>
            <label>Date of birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </InputBox>
          <InputBox>
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </InputBox>
        </Left>
        <Right>
          <InputBox>
            <label>Mobile Number</label>
            <input
              type="text"
              onChange={(e) => setMobileNumber(e.target.value)}
              value={mobileNumber}
            />
          </InputBox>
          <InputBox>
            <label>Gender</label>
            <input
              type="text"
              onChange={(e) => setGender(e.target.value)}
              value={gender}
            />
          </InputBox>
        </Right>
      </InnerBox>
      <Button onClick={() => HandleUpdate()}>Update</Button>
    </Container>
  );
};

export default ProfilePage;
