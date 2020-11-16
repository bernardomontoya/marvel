import React from "react";
import styled from "styled-components";
import { ReactComponent as svg } from "../../assets/svg/logo.svg";
import { Link } from "react-router-dom";

// Custom styles
const NavContainer = styled.div`
  height: 40px;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(1, 1, 1, 0.75);
  backdrop-filter: saturate(140%) blur(4px);
`;
const LogoContainer = styled.div`
  width: 100px;
`;
const Logo = styled(svg)`
  width: 100%;
  height: auto;
`;

export default function Nav() {
  return (
    <NavContainer className="w-100 flex flex-row justify-center items-center z-9999">
      <LogoContainer className="flex flex-container">
        <Link to="/">
          <Logo />
          <span className="dn">home</span>
        </Link>
      </LogoContainer>
    </NavContainer>
  );
}
