import React, { useState } from "react";
import styled from "styled-components";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { MdSearch } from "react-icons/md";
import Chip from "@material-ui/core/Chip";
import { MdExpandMore } from "react-icons/md";
import Tooltip from "@material-ui/core/Tooltip";
import ResourcesConfiguration from "../../../actions/resources.configuration";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { device } from "../../common/devices.configuration";

// styles
const FiltersContainer = styled.div`
  @media (max-width: ${device.mobileL}) {
    margin-top: 80px;
  }
`;
const SearchContainer = styled(FormControl)`
  & .MuiInputBase-root {
    border-radius: 0;
    & .MuiOutlinedInput-notchedOutline  {
      border: none;
      border-right: 1px solid #5a5a5a !important;
    }
  }
  & .MuiInputBase-input {
    box-sizing: content-box !important;
  }
  &.MuiFormControl-root {
    margin-right: 18px;
  }
  min-width: 180px !important;
`;
const SearchCriteria = styled(FormControl)`
  & .MuiFormGroup-root  {
    height: 100%;
    flex-wrap: nowrap;
  }
  & .MuiFormControlLabel-label {
    font-size: 0.8125rem;
    color: #fff;
    width: max-content;
  }
`;
const StyledChip = styled(Chip)`
  background: ${(props) => (props.active ? "#c30000" : "#212121")} !important;
  margin-right: 10px !important;
  &:last-child {
    margin-right: 0 !important;
  }
  & svg {
    transition: 0.2s all ease;
    transform: rotate(
      ${(props) => (props.activechipprop === "true" ? 180 : 0)}deg
    ) !important;
  }
`;

// Helper functions
function BuildOrderBy(props) {
  const orderByElements = props.orderBy;
  const hanldeOrderBy = props.handleOrderBy;
  const orderByList = orderByElements.map((element) => (
    <Tooltip
      key={element.name}
      title={element.description}
      placement="top-start"
    >
      <StyledChip
        size="small"
        color="primary"
        clickable
        icon={<MdExpandMore />}
        label={
          element.active && element.activeName !== ""
            ? element.activeName
            : element.name
        }
        activechipprop={element.active.toString()}
        onClick={() => hanldeOrderBy(element.criteria, element.active)}
      />
    </Tooltip>
  ));
  return <div className="flex flex-row items-center ml3">{orderByList}</div>;
}
function BuildSearchBy(props) {
  const searchByElements = props.searchBy;
  const handleCriteriaChange = props.handleCriteriaChange;
  const defaultCriteria = searchByElements.filter(
    (element) => element.active
  )[0].criteria;
  const searchByList = searchByElements.map((element) => (
    <Tooltip
      title={element.description}
      placement="top-start"
      key={element.criteria}
    >
      <FormControlLabel
        value={element.criteria}
        control={
          <Radio
            color="primary"
            onChange={() =>
              handleCriteriaChange(
                element.criteria,
                element.active,
                element.value
              )
            }
          />
        }
        label={element.title}
        labelPlacement="end"
      />
    </Tooltip>
  ));
  return (
    <SearchCriteria component="fieldset">
      <RadioGroup
        row
        aria-label="position"
        name="position"
        value={defaultCriteria}
      >
        {searchByList}
      </RadioGroup>
    </SearchCriteria>
  );
}

export default function ResourceFilters({ filters, setFilters }) {
  // props
  const orderBy = filters.orderBy;
  const searchBy = filters.searchBy;
  const activeDataType = filters.searchBy.filter(
    (element) => element.active === true
  )[0].type;
  // state
  const [searchString, setSearchString] = useState("");
  // handle search
  const handleSearchString = (event) => {
    setSearchString(event.target.value);
  };
  const handleSearch = () => {
    // get all active search criteria
    const searchByCopy = Object.assign([], searchBy);
    const activeCriteria = searchByCopy.filter(
      (element) => element.active === true
    );
    // save search criteria
    if (activeCriteria.length > 0) {
      activeCriteria.map((element) => {
        element.value = searchString;
      });
    }
    setFilters({ ...filters, searchBy: [...searchByCopy] });
  };
  const handleCriteriaChange = (criteria, active, value) => {
    const searchByCopy = Object.assign([], searchBy);
    searchByCopy.forEach((element) => {
      element.active =
        criteria === element.criteria && active === false ? true : false;
      element.value =
        criteria === element.criteria && active === false ? value : "";
    });
    setFilters({ ...filters, searchBy: [...searchByCopy] });
  };
  const handleOrderBy = (criteria, active) => {
    const orderByCopy = Object.assign([], orderBy);
    // save orderBy active
    if (orderByCopy.length > 0) {
      orderByCopy.map((element) => {
        element.active =
          element.criteria === criteria ? !active : element.active;
      });
    }
    setFilters({ ...filters, orderBy: [...orderByCopy] });
  };
  return (
    <FiltersContainer className="w-100 flex flex-column pv3">
      <div className="w-100 ph3 ph6-ns flex flex-row justify-between">
        <div className="flex flex-row w-auto w-100-ns overflow-x-auto">
          <SearchContainer variant="outlined" className="w-auto">
            <InputLabel htmlFor="outlined-adornment-password">
              Search
            </InputLabel>
            <OutlinedInput
              id="search-resource"
              type={
                activeDataType === "string"
                  ? "text"
                  : activeDataType === "int"
                  ? "number"
                  : "text"
              }
              value={searchString}
              onChange={handleSearchString}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleSearch}
                    edge="end"
                  >
                    <MdSearch />
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </SearchContainer>
          {searchBy.length > 0 ? (
            <BuildSearchBy
              searchBy={searchBy}
              handleCriteriaChange={handleCriteriaChange}
            />
          ) : null}
        </div>
        {orderBy.length > 0 ? (
          <BuildOrderBy orderBy={orderBy} handleOrderBy={handleOrderBy} />
        ) : null}
      </div>
    </FiltersContainer>
  );
}
