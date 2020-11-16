import BuildURL from './buildURL.action';
import Fetch from './fetch.action';

async function GetResource(resource, data, setData, filters, setLoading, loadMore) {
    try {
        console.log("GET RESOURCE!");
        // add loading state
        const buildURL = BuildURL(data, filters, resource, loadMore);
        const response = await Fetch(buildURL);
        const responseCode = response.code;
        // check code
        if (responseCode === 200) {
            const responseData = response.data.results;
            const responseOffset = response.data.offset;
            const responseTotal = response.data.total;
            setData({ ...data, data: !loadMore ? responseData : data.data.concat(responseData), offset: responseOffset, total: responseTotal, resource: resource });
            if(!loadMore) {
                setLoading(false);
            }
        }
        else {
            if(!loadMore) {
                setLoading(false);
            }
            alert("error!");
        }
    }
    catch (e) {
        alert(e.message);
    }
}

export default GetResource