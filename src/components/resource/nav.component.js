import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useLocation } from 'react-router-dom'

const ResourceNavContainer = styled.div`
    top: 40px;
    height: 40px;
    background: rgba(1,1,1,0.75);
    border-top: 1px solid #131313;
    backdrop-filter: saturate(140%) blur(4px);
    margin-top: -1px;
`
const ResourceNavLink = styled(NavLink)`
    text-decoration: none;
    & h1 {
        color: #909090;
    }
    &.active h1 {
        color: #c30000;
    }
`
const ResourceFavoritesContainer = styled.div`
    width: 40px;
    & svg { 
        color: #909090;
        font-size: 1.5rem;
        transition: .2s all ease;
    }
    &:hover {
        & svg {
            color: red;
        }
    }
    & .active {
        & svg {
            color: red;
        }
    }
`

export default function ResourceNav(props) {
    let location = useLocation().pathname;
    return(
        <ResourceNavContainer className="w-100 flex flex-column absolute z-999">
            <div className="ph3 ph6-ns h-100 flex flex-row justify-between">
                <div className="flex flex-row items-center">
                    <ResourceNavLink to="/characters" className="mr3 mr5-ns">
                        <h1 className="ttu f6">Characters</h1>
                    </ResourceNavLink>
                    <ResourceNavLink to="/comics" className="mr3 mr5-ns">
                        <h1 className="ttu f6">Comics</h1>
                    </ResourceNavLink>
                    <ResourceNavLink to="/stories">
                        <h1 className="ttu f6">Stories</h1>
                    </ResourceNavLink>
                </div>
                <ResourceFavoritesContainer className="flex flex-column items-center justify-center">
                    <NavLink to="/favorites">
                        {
                            location === '/favorites' ? <MdFavorite/> : <MdFavoriteBorder/>
                        }
                        <span className="dn">favorites</span>
                    </NavLink>
                </ResourceFavoritesContainer>
            </div>
        </ResourceNavContainer>
    )
}