import React from "react";
import "./App.css";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Login from "./components/Login";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Spinner from "react-spinkit";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <Apploading>
        <ApploadingContent>
          <img src="https://img.technews.tw/wp-content/uploads/2021/03/23112231/MIH-624x364.png" alt="MIH"/>
          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
        </ApploadingContent>
      </Apploading>
    );
  }

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Routes>
                <Route path="/" exact element={<Chat />}></Route>
              </Routes>
            </AppBody>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const Apploading = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
`;

const ApploadingContent = styled.div`
  text-align: center;
  padding-bottom: 100px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    height: 300px;
    padding: 20px;
  }
`;
