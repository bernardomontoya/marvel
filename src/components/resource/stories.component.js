import React, { useState, useEffect } from 'react';
import LoadingScreen from '../common/loading.component';
import ResourceNav from './nav.component';
import ResourceHeader from './header.component';
import ResourceFilters from './filters/filters.component';
import ResourcesConfiguration from '../../actions/resources.configuration';
import ResourceList from './list.component';
import GetResource from '../../actions/getResources.action';

export default function Stories() {
    // State
    const [ data, setData] = useState({
        resource: 'stories',
        data: [],
        total: 0,
        offset: 0,
        limit: 20,
    });
    const [ filters, setFilters ] = useState({
        searchBy: [
            {
                criteria: 'characters',
                title: 'Characters',
                description: 'Return only comics which feature the specified characters (accepts a comma-separated list of ids).',
                active: true,
                value: '',
                type: 'int'
            },
            {
                criteria: 'comics',
                title: 'Comics',
                description: 'Return only characters which appear in the specified comics (accepts a comma-separated list of ids).',
                active: false,
                value: '',
                type: 'int'
            }
        ],
        filterBy: [],
        orderBy: [
            {
                criteria: 'id',
                name: 'ID',
                description: 'Order by id',
                active: false,
                activeName: '',
            },
            {
                criteria: 'modified',
                name: 'Modified',
                description: 'Order by modified date',
                active: false,
                activeName: '',
            }
        ]
    });
    const [ loading, setLoading ] = useState(true);
    // variables
    const configuration = ResourcesConfiguration.stories;
    const LoadMoreItems = () =>  {
        GetResource('stories', data, setData, filters, setLoading, true);
    }
    // use effect
    useEffect(() => {
        GetResource('stories', data, setData, filters, setLoading, false);
    },[ data.resource, filters ]);
    return(
        <>
        <ResourceNav/>
        <div className="flex flex-column w-100 h-100">
            <ResourceHeader resource='stories' />
            <div className="flex flex-column items-center w-100 h-100">
                <div className="w-80 w-100 h-100" id="resources-list-container">
                    {
                        loading
                        ?
                        <LoadingScreen/>
                        : 
                        <>
                            <ResourceFilters filters={filters} setFilters={setFilters} />
                            <ResourceList data={data} configuration={configuration} resource='stories' loadMoreItems={LoadMoreItems} />
                        </>
                    }
                </div>
            </div>
        </div>
    </>
    )
}