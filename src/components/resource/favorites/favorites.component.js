import React, { useState, useEffect } from "react";
import ResourceNav from "../nav.component";
import FavoritesThird from "./favoritesThird.component";
import ResourceHeader from "../header.component";
import styled from "styled-components";
import { device } from "../../common/devices.configuration";

const FavoritesContainer = styled.div`
  @media (max-width: ${device.mobileL}) {
    margin-top: 80px;
  }
`;

export default function Favorites() {
  // state

  // variables
  const favorites =
    JSON.parse(localStorage.getItem("favorites")) === null
      ? new Array()
      : JSON.parse(localStorage.getItem("favorites"));
  const favoriteCharacters = favorites.filter(
    (element) => element.resource === "characters"
  );
  const favoriteComics = favorites.filter(
    (element) => element.resource === "comics"
  );
  const favoriteStories = favorites.filter(
    (element) => element.resource === "stories"
  );
  return (
    <>
      <ResourceNav />
      <ResourceHeader resource="favorites" />
      <FavoritesContainer className="w-100 h-100 flex flex-column overflow-y-auto pb3 pb5-ns">
        <div className="ph3 ph6-ns flex flex-column">
          <FavoritesThird
            favorites={favoriteCharacters}
            resource="characters"
            isDetail={false}
          />
          <FavoritesThird
            favorites={favoriteComics}
            resource="comics"
            isDetail={false}
          />
          <FavoritesThird
            favorites={favoriteStories}
            resource="stories"
            isDetail={false}
          />
        </div>
      </FavoritesContainer>
    </>
  );
}
