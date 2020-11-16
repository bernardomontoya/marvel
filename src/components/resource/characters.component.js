import React, { useState, useEffect } from "react";
import LoadingScreen from "../common/loading.component";
import ResourceNav from "./nav.component";
import ResourceHeader from "./header.component";
import ResourceFilters from "./filters/filters.component";
import ResourcesConfiguration from "../../actions/resources.configuration";
import ResourceList from "./list.component";
import GetResource from "../../actions/getResources.action";

export default function Characters() {
  // State
  const [data, setData] = useState({
    resource: "characters",
    data: [],
    total: 0,
    offset: 0,
    limit: 30,
  });
  const [filters, setFilters] = useState({
    searchBy: [
      {
        criteria: "nameStartsWith",
        title: "Name starts with",
        description:
          "Return characters with names that begin with the specified string (e.g. Sp).",
        active: true,
        value: "",
        type: "string",
      },
      {
        criteria: "name",
        title: "Name",
        description:
          "Return only characters matching the specified full character name (e.g. Spider-Man).",
        active: false,
        value: "",
        type: "string",
      },
      {
        criteria: "comics",
        title: "Comics",
        description:
          "Return only characters which appear in the specified comics (accepts a comma-separated list of ids).",
        active: false,
        value: "",
        type: "int",
      },
      {
        criteria: "stories",
        title: "Stories",
        description:
          "Return only characters which appear the specified stories (accepts a comma-separated list of ids).",
        active: false,
        value: "",
        type: "int",
      },
    ],
    orderBy: [
      {
        criteria: "name",
        name: "A - Z",
        description: "Order by name",
        active: false,
        activeName: "Z - A",
      },
      {
        criteria: "modified",
        name: "Modified",
        description: "Order by modified date",
        active: false,
        activeName: "",
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  // variables
  const configuration = ResourcesConfiguration.characters;
  const LoadMoreItems = () => {
    GetResource("characters", data, setData, filters, setLoading, true);
  };
  // use effect
  useEffect(() => {
    GetResource("characters", data, setData, filters, setLoading, false);
  }, [data.resource, filters]);
  return (
    <>
      <ResourceNav />
      <div className="flex flex-column w-100 h-100">
        <ResourceHeader resource="characters" />
        <div className="flex flex-column items-center w-100 h-100">
          <div
            className="w-80 w-100 h-100 flex flex-column"
            id="resources-list-container"
          >
            {loading ? (
              <LoadingScreen />
            ) : (
              <>
                <ResourceFilters filters={filters} setFilters={setFilters} />
                <ResourceList
                  data={data}
                  configuration={configuration}
                  resource="characters"
                  loadMoreItems={LoadMoreItems}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
