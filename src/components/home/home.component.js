import React from "react";
import Third from "./third.component";
import Venom from "../../assets/images/venom.jpg";
import styled from "styled-components";
import Credits from "../common/credits.component";

const HomeBackground = styled.div`
  background: url(${Venom});
  background-position: center center;
`;

export default function Home() {
  return (
    <HomeBackground className="w-100 h-100 flex flex-column flex-row-l">
      <Third slug="characters" />
      <Third slug="comics" />
      <Third slug="stories" />
      <div className="absolute bottom-2 right-2">
        <Credits />
      </div>
    </HomeBackground>
  );
}
