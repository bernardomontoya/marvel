const ResourcesConfiguration = {
    characters: {
        title: 'name',
        id: 'id',
        thumbnail: {
            thumbnail: true,
            path: 'path',
            extension: 'extension'
        },
        searchFilters: [{filter: 'name'}, {filter: 'nameStartsWith'}],
        listElementWidth: 300,
        listElementHeight: 250,
        listElementMargin: 28,
        rowMargin: 30,
        textOnly: false,
        detailWidth: 300,
        detailHeight: 300,
        detail: {
            id: 'id',
            title: 'name',
            description: 'description',
            thumbnail: { path: 'path', extension: 'extension' },
            resources: [ 'comics', 'stories' ]
        }
    },
    comics: {
        title: 'title',
        id: 'id',
        thumbnail: {
            thumbnail: true,
            path: 'path',
            extension: 'extension'
        },
        searchFilters: [{filter: 'title'}, {filter: 'titleStartsWith'}],
        listElementWidth: 260,
        listElementHeight: 400,
        listElementMargin: 45,
        rowMargin: 30,
        textOnly: false,
        detailWidth: 300,
        detailHeight: 300,
        detail: {
            id: 'id',
            title: 'title',
            description: 'description',
            thumbnail: { path: 'path', extension: 'extension' },
            resources: [ 'characters', 'stories' ]
        }
    },
    stories: {
        title: 'title',
        id: 'id',
        thumbnail: {
            thumbnail: false
        },
        searchFilters: [],
        listElementWidth: 300,
        listElementHeight: 200,
        listElementMargin: 45,
        rowMargin: 50,
        textOnly: true,
        detailWidth: 300,
        detailHeight: 300,
        detail: {
            id: 'id',
            title: 'title',
            description: 'description',
            thumbnail: { path: 'path', extension: 'extension' },
            resources: [ 'characters', 'comics' ]
        }
    }
}

export default ResourcesConfiguration;