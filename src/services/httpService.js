import axios from 'axios';
import {toast} from 'react-toastify';
import logger from './logService';

axios.interceptors.response.use(null,error=>{

    const expectedError = error.response && error.response.status>=400 && error.response.status<500;

    if(!expectedError){
        logger.log("Logging the error.",error);
        //toast.error or toast.success
        toast("An unexpected error has occured.");
    }

    return Promise.reject(error);
});

function setJwt(jwt){
    axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default{
    get: axios.get,
    post: axios.post,
    delete: axios.delete,
    put: axios.put,
    setJwt
};