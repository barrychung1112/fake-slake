import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { auth, provider } from "../firebase";

function Login() {
  function signIn(e) {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert("Login fail."));
  }
  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://img.technews.tw/wp-content/uploads/2021/03/23112231/MIH-624x364.png"
          alt=""
        />
        <h1>Sign in for MIH Slack</h1>
        <p>login for fun</p>

        <Button type="submit" onClick={signIn}>
          Sign in with Google
        </Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const LoginInnerContainer = styled.div`
  padding: 100px;
  background-color: white;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    object-fit: contain;
    height: 200px;
    margin-bottom: 40px;
  }

  > button {
    margin-top: 10px;
    text-transform: inherit !important;
    background-color: #0a8d48 !important;
    color: white;
  }
`;
