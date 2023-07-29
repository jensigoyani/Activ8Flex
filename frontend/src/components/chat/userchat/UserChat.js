import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CometChatUI } from "./../../../../src/cometchat-pro-react-ui-kit/CometChatWorkspace/src/components";

export default function UserChat() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const navigationTo = async () => {
      if (!localStorage.getItem("user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("user")));
      }
    };
    navigationTo();
  }, [navigate]);

  return (
    <Container>
      <div style={{  width: "90%", height: "750px", marginLeft: "15px", marginTop: "-35px" }}>
        <CometChatUI />
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: sticky;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #fff;
  .container {
    height: 85vh;
    width: 70vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;