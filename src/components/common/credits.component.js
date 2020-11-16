import React from "react";
import styled from "styled-components";

const CreditsContainer = styled.div`
  background: rgba(1, 1, 1, 0.75);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
  color: #909090;
  & a {
    color: #909090;
  }
`;

export default function Credits() {
  return (
    <CreditsContainer className="f7 pa2 br2">
      <span>Art by </span>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.behance.net/gallery/86524781/Billelis-FentonXIV-Symbiotes?tracking_source=search_projects_recommended%7Cvenom"
      >
        Billelis & FentonXIV Symbiotes
      </a>
    </CreditsContainer>
  );
}
