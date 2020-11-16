import React, { useState } from 'react';
import styled from 'styled-components';
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
// styles
const AddFavoriteContainer = styled.div`
    width: 30px;
    height: 30px;
    & svg {
        width: 100%;
        height: 100%;
        color: ${props => props.favorite ? 'red' : 'white'};
        stroke: #ffffff;
        stroke-width: ${props => props.favorite ? '2px' : '0'};
        stroke-linejoin: round;
        font-size: 1.5rem;
    }
`
// helper functions
const Add = (id, resource, favorite, setFavorite, data) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) === null ? [] : JSON.parse(localStorage.getItem('favorites'));
    const currentElement = favorites.filter(element => element.id === id && element.resource === resource);
    // check element
    if (currentElement.length === 1) {
        if (favorite) {
            currentElement[0].id = null;
            currentElement[0].resource = null;
            currentElement[0].data = null;
        }
    }
    else {
        favorites.push({ id: id, resource: resource, data: data });
    }
    // set favorites
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setFavorite(!favorite);
}

// check if favorite
const CheckFavorite = (id, resource, data) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) === null ? [] : JSON.parse(localStorage.getItem('favorites'));
    const currentElement = favorites.filter(element => element.id === id && element.resource === resource);
    let isSelected = false;
    if (currentElement.length === 1) {
        // update the data
        currentElement[0].data = data;
        isSelected = true;
    }
    // update favorites
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return isSelected;
}

export default function AddFavorite({ id, resource, data, isDetail }) {
    // useState
    const [ favorite, setFavorite ] = useState(CheckFavorite(id, resource, data));
    return(
        <AddFavoriteContainer className={'z-999 pointer flex flex-column ' + (isDetail ? 'absolute top-1 right-1' : '')} favorite={favorite} onClick={ () => {Add(id, resource, favorite, setFavorite, data)} } >
            { favorite ? <MdFavorite/> : <MdFavoriteBorder/> }       
        </AddFavoriteContainer>
    )
}