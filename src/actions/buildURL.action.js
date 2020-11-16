function BuildFilters(filters) {
    const searchBy = filters.searchBy;
    const orderBy = filters.orderBy;
    let searchByString = "";
    let orderByString = "";
    // build search by
    if (searchBy.length > 0) {
        const searchByCopy = Object.assign([], searchBy);
        const activeCriteria = searchByCopy.filter(element=> element.active === true && element.value !== '');
        if (activeCriteria.length > 0) {
            activeCriteria.forEach((element, i) => {
                searchByString += element.criteria + '=' + element.value + (i + 1 === (activeCriteria.length) ? '' : '?');
            });
        }
    }
    // build order by
    if (orderBy.length > 0) {
        const orderbyCopy = Object.assign([], orderBy);
        if (orderbyCopy.length > 0) {
            orderbyCopy.forEach((element, i) => {
                orderByString += (element.active ? ('-' + element.criteria) : element.criteria) + (i + 1 === (orderbyCopy.length) ? '' : '%2C');
            });
        }
        orderByString = 'orderBy=' + orderByString;
    }
    const filtersString = (searchByString !== '' ? ('?' + searchByString) : '') + ((searchByString !== '' ? '&' : '?') + orderByString);
    return filtersString;
}

export default function BuildURL(data, filters, resource, loadMore) {
    const url = "https://gateway.marvel.com:443/v1/public/" + resource;
    const key = "b7fcbbc32da61cefa8dc9630bd7ee3d5";
    // filters
    const limit = data.limit;
    const offset = data.offset;
    const filtersString = filters !== null ? BuildFilters(filters) : '';
    const finalString =  (filtersString !== '' ? (filtersString + '&') : '?') +  "limit=" + limit + "&offset=" + (loadMore ? offset + limit : 0) + "&apikey=" + key;
    const builtURL = url + finalString;
    return builtURL
}