import React from "react";
import styled from "styled-components";
import Credits from "../common/credits.component";
import Characters from "../../assets/images/characters.jpg";
import Comics from "../../assets/images/comics.jpg";
import Stories from "../../assets/images/stories.jpg";
import Favorites from "../../assets/images/favorites.jpg";
import { device } from "../common/devices.configuration";

const Header = styled.div`
  height: 220px;
  background: black;
  @media (max-width: ${device.mobileL}) {
    height: 180px;
  }
`;
const BackgroundOverlay = styled.div`
  background: #101010;
`;
const Background = styled.div`
  opacity: 0.6;
  background-image: url(${(props) =>
    props.resource === "characters"
      ? Characters
      : props.resource === "comics"
      ? Comics
      : props.resource === "stories"
      ? Stories
      : Favorites});
`;
const Title = styled.h1`
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: white;
  -webkit-text-fill-color: transparent;
`;

export default function ResourceHeader({ resource }) {
  return (
    <Header className="dn flex-ns flex-column relative">
      <BackgroundOverlay className="w-100 h-100 absolute top-0 left-0">
        <Background className="w-100 h-100" resource={resource} />
      </BackgroundOverlay>
      <div className="ph3 ph6-ns pv3 pv4-ns h-100 flex flex-column justify-end relative">
        <div className="w-100 relative">
          <Title className="f2 f1-ns ttu">{resource}</Title>
          <div className="absolute bottom-0 right-0 dn flex-ns">
            <Credits className="bottom-0" />
          </div>
        </div>
      </div>
    </Header>
  );
}
