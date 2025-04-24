import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframe animations
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 10px rgba(255, 183, 77, 0.5); }
  50% { box-shadow: 0 0 20px rgba(255, 183, 77, 1); }
  100% { box-shadow: 0 0 10px rgba(255, 183, 77, 0.5); }
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

// Styled Components
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #121212;
  color: white;
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 6px solid rgba(255, 183, 77, 0.3);
  border-top: 6px solid #ffb74d;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite, ${glow} 1.5s ease-in-out infinite;
`;

const Text = styled.p`
  margin-top: 15px;
  font-size: 1.5rem;
  font-weight: bold;
  animation: ${fadeIn} 1.5s ease-in-out infinite alternate;
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <Spinner />
      <Text>Powering Up...</Text>
    </LoadingContainer>
  );
};

export default Loading;
