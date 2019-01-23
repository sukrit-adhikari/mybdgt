import util from '../helpers/util';

const Fetching = (uri,method,headers,body) =>{
    const baseURL = 'http://localhost:8181';
    const reqURL = uri ? (baseURL+'/'+uri) : baseURL +'/'+'api';
    const defaultHeaders = {session:util.getCookie("session") || ''};
    return fetch(reqURL, {
      method: method,
      headers: Object.assign({"Content-Type": "application/json"},
          (headers ? headers:{} ),
          defaultHeaders),
      body: body
    });
};

export default Fetching;