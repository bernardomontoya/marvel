import React, { useState, useEffect } from 'react';
import LoadingScreen from '../common/loading.component';
import ResourceNav from './nav.component';
import ResourceHeader from './header.component';
import ResourceFilters from './filters/filters.component';
import ResourcesConfiguration from '../../actions/resources.configuration';
import ResourceList from './list.component';
import GetResource from '../../actions/getResources.action';

export default function Comics() {
    // State
    const [ data, setData] = useState({
        resource: 'comics',
        data: [],
        total: 0,
        offset: 0,
        limit: 20,
    });
    const [ filters, setFilters ] = useState({
        searchBy: [
            {
                criteria: 'title',
                title: 'Title',
                description: 'Return only issues in series whose title matches the input.',
                active: true,
                value: '',
                type: 'string'
            },
            {
                criteria: 'titleStartsWith',
                title: 'Title starts with',
                description: 'Return only issues in series whose title starts with the input.',
                active: false,
                value: '',
                type: 'string'
            },
            {
                criteria: 'issueNumber',
                title: 'Issue number',
                description: 'Return only issues in series whose issue number matches the input.',
                active: false,
                value: '',
                type: 'int'
            },
            {
                criteria: 'characters',
                title: 'Characters',
                description: 'Return only comics which feature the specified characters (accepts a comma-separated list of ids).',
                active: false,
                value: '',
                type: 'int'
            },
            {
                criteria: 'stories',
                title: 'Stories',
                description: 'Return only comics which contain the specified stories (accepts a comma-separated list of ids).',
                active: false,
                value: '',
                type: 'int'
            },
        ],
        filterBy: [
            {
                criteria: 'format',
                name: 'Format',
                description: 'Filter by the issue format',
                active: false,
                options: [
                    'comic',
                    'magazine',
                    'trade paperback',
                    'hardcover',
                    'digest',
                    'graphic novel',
                    'digital comic',
                    'infinite comic'
                ],
                value: ''
            },
        ],
        orderBy: [
            {
                criteria: 'title',
                name: 'A - Z',
                description: 'Order by title',
                active: false,
                activeName: 'Z - A'
            },
            {
                criteria: 'issueNumber',
                name: 'Issue number',
                description: 'Order by issue number',
                active: false,
                activeName: ''
            }
        ]
    });
    const [ loading, setLoading ] = useState(true);
    // variables
    const configuration = ResourcesConfiguration.comics;
    const LoadMoreItems = () =>  {
        GetResource('comics', data, setData, filters, setLoading, true);
    }
    // use effect
    useEffect(() => {
        GetResource('comics', data, setData, filters, setLoading, false);
    },[ data.resource, filters ]);
    return(
        <>
        <ResourceNav/>
        <div className="flex flex-column w-100 h-100">
            <ResourceHeader resource='comics' />
            <div className="flex flex-column items-center w-100 h-100">
                <div className="w-80 w-100 h-100 flex flex-column" id="resources-list-container">
                    {
                        loading
                        ?
                        <LoadingScreen/>
                        : 
                        <>
                            <ResourceFilters filters={filters} setFilters={setFilters} />
                            <ResourceList data={data} configuration={configuration} resource='comics' loadMoreItems={LoadMoreItems} />
                        </>
                    }
                </div>
            </div>
        </div>
    </>
    )
}