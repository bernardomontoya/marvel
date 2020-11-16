import React from 'react';
import styled from 'styled-components';
import ResourceListElement from '../listElement.component';
import ResourcesConfiguration from '../../../actions/resources.configuration';

// styles
const Title = styled.h1`
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: white;
    -webkit-text-fill-color: transparent;
`

function BuildElements({ data, configuration, resource, isDetail, setLoading }) {
    const elementsList = data.map((element) =>
        <ResourceListElement key={resource} data={isDetail ? element: element.data} configuration={configuration} resource={resource} fixedWidth={true} setLoading={setLoading} />
    );
    return (
      <div className="flex flex-row items-center overflow-x-auto flex-nowrap">{elementsList}</div>
    );
}

export default function FavoritesThird({ favorites, resource, isDetail, total, setLoading }) {
    const configuration = ResourcesConfiguration[resource];
    return(
        <>
            {
                favorites.length > 0 ?
                    <div className="w-100 flex flex-column">
                    <div className="pt3 pt5-ns pb3 pb4-ns flex flex-row justify-between">
                        <Title className="f2 f1-ns ttu">{resource}</Title>
                        <h2 className="f2 f1-ns white">{isDetail ? total : favorites.length}</h2>
                    </div>
                    {
                        favorites.length > 0 ?
                        <BuildElements data={favorites} configuration={configuration} resource={resource} isDetail={isDetail} setLoading={setLoading} />
                        : null
                    }
                </div>
                : null
            }
        </>
    )
}