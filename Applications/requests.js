// Set-up
const host = 'http://localhost:3030';

const endpoints = {
    catalogue: `/data/catches`,
    details: (id) => `/data/catches/${id}`,
    login: `/users/login`,
    logout: '/users/logout',
    register: '/users/register'
};

const requestHandlers = {
    login: {method: 'post', endpoint: 'login', authorize: false},
    logout: {method: 'get', endpoint: 'logout', authorize: true},
    register: {method: 'post', endpoint: 'register', authorize: false},
    addCatch: {method: 'post', endpoint: 'catalogue', authorize: true},
    updateCatch: {method: 'put', endpoint: 'details', authorize: true},
    deleteCatch: {method: 'delete', endpoint: 'details', authorize: true},
    getCatch: {method: 'get', endpoint: 'details', authorize: false},
    getAllCatches: {method: 'get', endpoint: 'catalogue', authorize: false}
};

const responseHandlers = {
    login: loginHandler,
    logout: logoutHandler,
    register: loginHandler,
    addCatch: jsonData,
    updateCatch: () => null,
    deleteCatch: () => null,
    getCatch: jsonData,
    getAllCatches: jsonData
}

export const request = createRequest(requestHandlers, responseHandlers, endpoints)

// Response handlers
function jsonData(response){
    return response.json(); 
};

async function loginHandler(response){
    if (response) {
        const {accessToken, email, _id, ...rest} = await response.json();
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('user_id',_id);
    };
};

// Error handlers
async function logoutHandler(response){
    if (response.status != 204){
        let err = new Error();
        err.fetchResponse = response;
        onError(err);
    };
    sessionStorage.clear();
};

async function onError(error){
    let message;
    if (error.fetchResponse){
        const data = await error.fetchResponse.json();
        message = `${data.code} ${data.message}`;
    } else {
        message = error.message;
    };
    console.log(message);
    alert(message);
};

// API set-up & call
function createRequest(requestHandlers, responseHandlers, endpoints){
    
    return async (requestType, options={}) => {

        const handlerSettings = requestHandlers[requestType];
        let requestSettings = Object.assign(options, handlerSettings);

        let requestEndpoint = endpoints[requestSettings.endpoint];
        if (typeof requestEndpoint == "function"){
            const id = requestSettings._id;
            requestEndpoint = requestEndpoint(id); 
        };
        requestSettings['endpoint'] = requestEndpoint;

        const requestHandler = () => requestSetUp(requestSettings);
        const responseHandler = responseHandlers[requestType];
        return executeRequest(requestHandler, responseHandler, onError);
    };
};


function requestSetUp(options){
    const { method, endpoint, authorize } = options;
    const init = {
        method,
        headers: {'Content-Type': 'application/json'}
    };
    if (authorize){
        const accessToken = sessionStorage.getItem('accessToken');
        if (!accessToken){
            throw new Error('this request requires AccessToken');
        };
        init.headers['X-Authorization'] = accessToken;
    };
    if (options.data && Object.keys(options.data).length > 0){
        init['body'] = JSON.stringify(options.data);
    };
    const url = host + endpoint;
    return fetch(url, init);
};

async function executeRequest(requestHandler, responseHandler, errorHandler){
    try {        
        const res = await requestHandler(); 
        if (!res.ok){
            let err = new Error();
            err.fetchResponse = res;
            throw err;
        };
        if (responseHandler) {
            return responseHandler(res);
        };
    } catch (error) {
        errorHandler(error);
    };
};