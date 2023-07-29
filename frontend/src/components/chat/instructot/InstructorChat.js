import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Instructor/Navbar";
import Sidebar from "../../Instructor/Sidebar";
import { CometChatUI } from "../../../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components";

export default function InstructorChat() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("Instructor"));
  const currentUser = user;
  useEffect(() => {
    const navigationTo = async () => {
      if (!localStorage.getItem("Instructor")) {
        navigate("/instructor/login");
      } else {
        // setCurrentUser(await JSON.parse(localStorage.getItem('instructor')));
      }
    };
    navigationTo();
  }, []);

  return (
    <>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <Container>
          <div style={{ width: "95%", height: "800px", marginLeft: "15px" }}>
            <CometChatUI />
          </div>
        </Container>
      </div>
    </>
  );
}

const Container = styled.div`
  position: sticky;
  margin-top: 40px;
  height: 85vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #fff;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
