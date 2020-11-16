import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { device } from "../common/devices.configuration";

// Styles
const ThirdContainer = styled(animated.div)`
  background-blend-mode: multiply;
  &:last-child {
    border-right: none;
  }
`;
const Link = styled(NavLink)`
  width: 100%;
  height: 100%;
  text-decoration: none;
`;
const TitleContainer = styled(animated.div)`
  mix-blend-mode: screen;
`;
const Title = styled.h1`
  font-size: 8rem;
  @media (max-width: ${device.mobileL}) {
    color: red !important;
  }
`;

// React spring translations
const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const transText = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`;

export default function Third(props) {
  // React spring hook
  const [{ color }, setC] = useSpring(() => ({
    color: "rgba(255, 255, 255, 0)",
  }));
  const [springProps, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }));
  // Props
  const slug = props.slug;
  return (
    <ThirdContainer
      className="w-100 h-100 flex flex-column justify-center tc"
      onMouseEnter={() => setC({ color: "#c30000" })}
      onMouseLeave={() => setC({ color: "rgba(255, 255, 255, 0)" })}
    >
      <Link
        to={slug}
        onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
        className="flex flex-column items-center-ns justify-center overflow-x-auto"
      >
        <TitleContainer
          style={{ transform: springProps.xy.interpolate(transText) }}
        >
          <animated.div
            className="f2 f1-l ttu z-999 tl flex flex-row flex-column-ns"
            style={{ color }}
          >
            {slug === "characters" ? (
              <>
                <Title>CHA</Title>
                <Title>RAC</Title>
                <Title>TERS</Title>
              </>
            ) : slug === "comics" ? (
              <>
                <Title>CO</Title>
                <Title>MI</Title>
                <Title>CS</Title>
              </>
            ) : (
              <>
                <Title>ST</Title>
                <Title>OR</Title>
                <Title>IES</Title>
              </>
            )}
          </animated.div>
        </TitleContainer>
      </Link>
    </ThirdContainer>
  );
}
