import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { usepasswordview } from "../customhooks/usepasswordview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { mobile, tablet } from "../responsive";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ResetPassword } from "../apicalls/UserApicalls";

const SlideIn = keyframes`

    from{

      transform:translateX(100%)
    }
    to{

      transform:translateX(0%)
    }

`;

const Rotate = keyframes`
  
    from{

      transform:rotate(0)
    }
    to{

      transform:rotate(360deg)
    }

`;

const Container = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  width: 80%;
  flex-direction: column;
  gap: 2em;
  ${tablet({ padding: "1em", width: "100%" })}
  animation: ${SlideIn} 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;
    gap: 0.5em;
    flex-wrap: wrap;
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Heading = styled.h1`
  font-family: "Space Grotesk", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 2.5em;
  ${mobile({ fontSize: "2em" })}
`;

const Subtitle = styled.p`
  font-family: "Space Grotesk", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 1.3em;
  ${mobile({ fontSize: "1.1em" })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2em;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5em;
  div {
    display: flex;
    align-items: center;
    position: relative;
  }

  label {
    font-family: "Space Grotesk";
    font-style: normal;
    font-weight: 700;
    font-size: 1.3em;
    color: #7e7e7e;
  }

  input {
    font-family: "Space Grotesk", sans-serif;
    width: 100%;
    font-size: 1.2em;
    padding: 0.35em;
    border: 2px solid #cccccc;
    border-radius: 8px;
    outline: none;
    font-weight: 600;
    background-color: transparent;
    transition: all 0.8s ease-in-out;
  }
`;

const PasswordEye = styled(FontAwesomeIcon)`
  color: #4be94b;
  position: absolute;
  right: 1em;
  font-size: 1.2em;
  cursor: pointer;
  z-index: 3;
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

const ErrorMessage = styled.small`
  font-family: "Space Grotesk", sans-serif;
  color: #fa3d3d;
  font-weight: 600;
`;

const SuccessMessage = styled.small`
  font-family: "Space Grotesk", sans-serif;
  color: #4be94b;
  font-weight: 600;
  font-size: 1em;
`;

const Loader = styled.div`
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  border: 4px solid #fff;
  border-bottom-color: transparent;
  animation: ${Rotate} 2s infinite linear;
`;

const Links = styled(Link)`
  font-family: "Space Grotesk", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 1.3em;
  color: #4be94b;
  display: flex;
  align-items: center;
  gap: 0.5em;
  justify-content: flex-end;
  cursor: pointer;
`;

const PasswordMatch = styled.p`
  font-family: "Space Grotesk", sans-serif;
  color: #fa3d3d;
  font-weight: 600;
  display: ${(props) => (props.type === "pass" ? "none" : "flex")};
`;

const ResetPasswordForm = () => {
  const [showPassword, ViewPassword] = usepasswordview();
  const { isLoading, errorList, serverMessage } = useSelector(
    (state) => state.users
  );

  const [password, setPassword] = useState("");

  const [reTypePassword, setReTypePassword] = useState("");

  const dispatch = useDispatch();

  const { search } = useLocation();

  const token = search.split("=")[1];

  const HandleSubmit = (e) => {
    e.preventDefault();

    console.log(password, token);

    ResetPassword(dispatch, password, token);
  };

  return (
    <Container>
      <Top>
        <Heading>Reset Password ?</Heading>
        <div>
          <Subtitle>Enter new strong password for better security</Subtitle>
        </div>
      </Top>

      <Center>
        <Form onSubmit={(e) => HandleSubmit(e)}>
          <InputBox>
            <div>
              <input
                type="password"
                placeholder="Type new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </InputBox>
          <InputBox>
            <div>
              <input
                type={showPassword}
                placeholder="Confirm password"
                value={reTypePassword}
                onChange={(e) => setReTypePassword(e.target.value)}
              />
              <PasswordEye
                icon={showPassword === "password" ? faEye : faEyeSlash}
                onClick={() => ViewPassword()}
              />
            </div>
            <PasswordMatch type={password == reTypePassword ? "pass" : "error"}>
              Password don't matched
            </PasswordMatch>
          </InputBox>

          {serverMessage ? (
            <SuccessMessage>{serverMessage}</SuccessMessage>
          ) : (
            errorList.map(
              (e, id) =>
                e.path === "password" && (
                  <ErrorMessage key={id}>{e.msg}</ErrorMessage>
                )
            )
          )}
          <Button type="submit">
            {isLoading ? <Loader /> : "Reset password"}
          </Button>
        </Form>
      </Center>
      <Links to="/login">
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to Login
      </Links>
    </Container>
  );
};

export default ResetPasswordForm;
