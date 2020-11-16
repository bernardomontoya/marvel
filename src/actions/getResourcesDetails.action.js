import BuildURL from './buildURL.action';
import Fetch from './fetch.action';

async function GetResourceDetails(id, resource, resources, data, setData, setLoading, setError) {
    try {
        // build URL 
        const buildURLGeneral = BuildURL(data, null, resource + '/' + id, false);
        const buildURLResourceOne = BuildURL(data, null, resource + '/' + id + '/' + resources[0], false);
        const buildURLResourceTwo = BuildURL(data, null, resource + '/' + id + '/' + resources[1], false);
        const responseGeneral = await Fetch(buildURLGeneral);
        const responseResourceOne = await Fetch(buildURLResourceOne);
        const responseResourceTwo = await Fetch(buildURLResourceTwo);
        const responseCodeGeneral = responseGeneral.code;
        const responseCodeOne = responseResourceOne.code;
        const responseCodeTwo = responseResourceTwo.code;
        // check code
        if (responseCodeGeneral === 200 && responseCodeOne === 200 && responseCodeTwo === 200) {
            const responseGeneralData = responseGeneral.data;
            const responseResourceOneData = responseResourceOne.data;
            const responseResourceTwoData = responseResourceTwo.data;
            setData({ ...data, dataGeneral: responseGeneralData, dataResourceOne: responseResourceOneData, dataResourceTwo: responseResourceTwoData, resource: resource });
            setLoading(false);   
        }
        else {
            setError({ error: true, reason: 'The element that you are looking for does not exists' });
            setLoading(false);
        }
    }
    catch (e) {
        setError({ error: true, reason: e.message });
        setLoading(false);
    }
}

export default GetResourceDetails