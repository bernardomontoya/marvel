import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GetResourceDetails from "../../actions/getResourcesDetails.action";
import ResourceNav from "./nav.component";
import ResourcesConfiguration from "../../actions/resources.configuration";
import LoadingScreen from "../common/loading.component";
import Background from "../../assets/images/characters.png";
import FavoritesThird from "./favorites/favoritesThird.component";
import AddFavorite from "./favorites/addFavorite.component";
import { device } from "../common/devices.configuration";

// styles
const DetailContainer = styled.div`
  background-image: url(${Background});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top;
`;
const TitleContainer = styled.div`
  padding-top: 80px;
`;
const StyledTitle = styled.h1`
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: white;
  -webkit-text-fill-color: transparent;
`;
const StyledImage = styled.div`
  width: 400px;
  @media (max-width: ${device.mobileL}) {
    width: 100%;
  }
`;
const IDContainer = styled.div`
  color: #cacaca;
  font-size: ${(props) => (props.textOnly ? ".8rem" : ".9rem")};
  background: ${(props) =>
    props.textOnly ? "rgba(53, 53, 53, 0.5)" : "rgba(0,0,0,0.5)"};
  -webkit-backdrop-filter: saturate(140%) blur(4px);
  -webkit-backdrop-filter: saturate(140%) blur(4px);
  backdrop-filter: saturate(140%) blur(2px);
`;

export default function ListElementDetails(props) {
  // current id
  const id = parseInt(props.match.params.id);
  const resource = props.resource;
  const configuration = ResourcesConfiguration[resource];
  const detailConfiguration = configuration.detail;
  const resources = detailConfiguration.resources;
  const textOnly = configuration.textOnly;
  // state
  const [data, setData] = useState({
    id: id,
    resource: resource,
    resources: resources,
    dataGeneral: { results: [{ thumbnail: {} }] },
    dataResourceOne: [],
    dataResourceTwo: [],
    total: 0,
    offset: 0,
    limit: 30,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    error: false,
    reason: "",
  });
  // Request data
  useEffect(() => {
    GetResourceDetails(
      id,
      resource,
      resources,
      data,
      setData,
      setLoading,
      setError
    );
  }, [id]);
  return (
    <>
      <ResourceNav />
      {loading ? (
        <LoadingScreen />
      ) : error.error ? (
        <h1>{error.reason} </h1>
      ) : (
        <DetailContainer className="w-100 h-100 overflow-y-auto">
          <div className="ph3 ph6-ns w-100 flex flex-column">
            <TitleContainer
              className={
                "flex flex-column items-center tc mb4 " +
                (textOnly ? " mt5 mt7-ns" : "")
              }
            >
              {!textOnly ? (
                <StyledImage className="br2 mv3 mv4-ns relative">
                  <IDContainer
                    className={
                      "absolute z-9999 pa1 br1 f7 " +
                      (textOnly ? "bottom-1 right-1" : "top-1 left-1")
                    }
                    textOnly={textOnly}
                  >
                    <span>{id}</span>
                  </IDContainer>
                  <AddFavorite
                    id={id}
                    resource={resource}
                    data={data.dataGeneral.results[0]}
                    isDetail={true}
                  />
                  <img
                    className="br2"
                    src={
                      data.dataGeneral.results[0].thumbnail[
                        detailConfiguration.thumbnail.path
                      ] +
                      "." +
                      data.dataGeneral.results[0].thumbnail[
                        detailConfiguration.thumbnail.extension
                      ]
                    }
                  />
                </StyledImage>
              ) : null}
              <StyledTitle className="f3 f1-ns ttu">
                {data.dataGeneral.results[0][detailConfiguration.title]}
              </StyledTitle>
            </TitleContainer>
            {data.dataGeneral.results[0][detailConfiguration.description] !==
            "" ? (
              <div className="tl tc-ns mb4">
                <span className="white f5 f4-ns lh-copy">
                  {data.dataGeneral.results[0][detailConfiguration.description]}
                </span>
              </div>
            ) : null}
            <div className="w-100 h-100 flex flex-column pb3 pb5-ns">
              <FavoritesThird
                favorites={data.dataResourceOne.results}
                total={data.dataResourceOne.total}
                resource={detailConfiguration.resources[0]}
                isDetail={true}
                setLoading={setLoading}
              />
              <FavoritesThird
                favorites={data.dataResourceTwo.results}
                total={data.dataResourceTwo.total}
                resource={detailConfiguration.resources[1]}
                isDetail={true}
                setLoading={setLoading}
              />
            </div>
          </div>
        </DetailContainer>
      )}
    </>
  );
}
