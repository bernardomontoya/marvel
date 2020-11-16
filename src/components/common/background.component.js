import React from "react";
import styled, { keyframes } from "styled-components";
import Noise from "../../assets/images/noise.png";

const Grain = keyframes`
    0%, 100% { transform:translate(0, 0) }
    10% { transform:translate(-5%, -10%) }
    20% { transform:translate(-15%, 5%) }
    30% { transform:translate(7%, -25%) }
    40% { transform:translate(-5%, 25%) }
    50% { transform:translate(-15%, 10%) }
    60% { transform:translate(15%, 0%) }
    70% { transform:translate(0%, 15%) }
    80% { transform:translate(3%, 35%) }
    90% { transform:translate(-10%, 10%) }
`;

const GrainBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: #060606;
  z-index: -1;
  &:after {
    animation: ${Grain} 8s steps(10) infinite;
    background-image: url(${Noise});
    content: "";
    height: 300%;
    left: -50%;
    opacity: 0.3;
    position: fixed;
    top: -110%;
    width: 300%;
  }
`;

export default function Background() {
  return <GrainBackground />;
}
