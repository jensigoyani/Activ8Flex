import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";

export default function InsLogOUt() {
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.removeItem("Instructor")
        navigate("/instructor/login");
    };

    return (
        <Button onClick={handleClick}>
            <BiPowerOff onClick={handleClick} />
        </Button>
    );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: white;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;