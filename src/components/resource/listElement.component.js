import React from "react";
import styled from "styled-components";
import NotFound from "../../assets/images/notfound.jpg";
import AddFavorite from "./favorites/addFavorite.component";
import { Link } from "react-router-dom";
import { device } from "../common/devices.configuration";

// styles
const ElementContainer = styled.div`
  ${(props) => (props.fixedWidth ? "width: " + props.width + "px;" : null)}
  ${(props) => (props.fixedWidth ? "min-width: " + props.width + "px;" : null)}
    height: ${(props) => props.height}px;
  margin-right: ${(props) => props.margin}px;
  transition: 0.2s all ease;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    .element-image-container {
      -webkit-filter: none;
      filter: none;
    }
  }
`;
const ImageContainer = styled.div`
  background: rgba(29, 29, 29, 0.75);
  background-image: url(${(props) =>
    props.image ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ? NotFound
      : props.image});
  background-size: cover;
  background-position: center center;
  -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%);
  @media (max-width: ${device.mobileL}) {
    -webkit-filter: none;
    filter: none;
  }
`;
const BottomTextContainer = styled.div`
  height: ${(props) => (props.textOnly ? "100%" : "70px")};
  margin-bottom: -1px;
  background: rgba(45, 45, 45, 0.5);
  -webkit-backdrop-filter: saturate(140%) blur(4px);
  backdrop-filter: saturate(140%) blur(4px);
`;
const IDContainer = styled.div`
  color: #cacaca;
  font-size: ${(props) => (props.textOnly ? ".8rem" : ".6rem")};
  background: ${(props) =>
    props.textOnly ? "rgba(53, 53, 53, 0.5)" : "rgba(0,0,0,0.5)"};
  -webkit-backdrop-filter: saturate(140%) blur(4px);
  -webkit-backdrop-filter: saturate(140%) blur(4px);
  backdrop-filter: saturate(140%) blur(2px);
`;

export default function ResourceListElement({
  data,
  configuration,
  resource,
  fixedWidth,
  setLoading,
}) {
  // state
  const title = data[configuration.title];
  const id = data[configuration.id];
  const hasThumbnail = configuration.thumbnail.thumbnail;
  const thumbnailPath = hasThumbnail
    ? data.thumbnail[configuration.thumbnail.path]
    : null;
  const thumbnailExtension = hasThumbnail
    ? data.thumbnail[configuration.thumbnail.extension]
    : null;
  const margin = configuration.listElementMargin;
  const width = configuration.listElementWidth;
  const height = configuration.listElementHeight;
  const textOnly = configuration.textOnly;
  // click event
  const handleLinkClick = (event) => {
    const currentTarget = event.target;
    console.log("current target");
    console.log(currentTarget);
    console.log(currentTarget.nodeName);
    if (currentTarget.nodeName !== "path" && currentTarget.nodeName !== "svg") {
      if (setLoading) {
        setLoading(true);
      }
    } else {
      event.preventDefault();
    }
  };
  return (
    <ElementContainer
      className="relative w-100 flex flex-column justify-end pointer br2"
      margin={margin}
      width={width}
      height={height}
      fixedWidth={fixedWidth}
    >
      <Link
        to={"/" + resource + "/" + id}
        className="w-100 h-100 link flex flex-column justify-end"
        onClick={handleLinkClick}
      >
        <IDContainer
          className={
            "absolute z-9999 pa1 br1 f7 " +
            (textOnly ? "bottom-1 right-1" : "top-1 left-1")
          }
          textOnly={textOnly}
        >
          <span>{id}</span>
        </IDContainer>
        <BottomTextContainer
          className={
            "pa3 z-999 relative flex flex-row " + (textOnly ? "br2" : "")
          }
          textOnly={textOnly}
        >
          <div className={"w-100 flex " + (textOnly ? "pr4" : "")}>
            <span className={"white " + (textOnly ? "f5 lh-title" : "f6 fw7")}>
              {title}
            </span>
          </div>
          <AddFavorite id={id} resource={resource} data={data} />
        </BottomTextContainer>
        {hasThumbnail ? (
          <ImageContainer
            className="absolute top-0 left-0 w-100 h-100 element-image-container br2"
            image={thumbnailPath + "." + thumbnailExtension}
          />
        ) : null}
      </Link>
    </ElementContainer>
  );
}
