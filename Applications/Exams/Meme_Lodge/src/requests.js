// Set-up
const DEBUG = true;
const host = 'http://localhost:3030';

const endpoints = {
    catalogue: `/data/memes`,
    details: (reqIDs) => `/data/memes/${reqIDs.itemId}`,
    login: `/users/login`,
    logout: '/users/logout',
    register: '/users/register',
    readAll: '/data/memes?sortBy=_createdOn%20desc',
    readItemsByUser: (reqIDs) => `/data/memes?where=_ownerId%3D%22${reqIDs.userId}%22&sortBy=_createdOn%20desc`
    // bonusCatalog: '/data/likes',
    // bonusReadItem: (reqIDs) => `/data/likes?where=bookId%3D%22${reqIDs.bookId}%22&distinct=_ownerId&count`,
    // bonusItemsByUser: (reqIDs) => `/data/likes?where=bookId%3D%22${reqIDs.bookId}%22%20and%20_ownerId%3D%22${reqIDs.userId}%22&count`
};

const requestHandlers = {
    login: {method: 'post', endpoint: 'login', authorize: false},
    logout: {method: 'get', endpoint: 'logout', authorize: true},
    register: {method: 'post', endpoint: 'register', authorize: false},
    create: {method: 'post', endpoint: 'catalogue', authorize: true},
    readAll: {method: 'get', endpoint: 'readAll', authorize: false},
    readDetails: {method: 'get', endpoint: 'details', authorize: false},
    readItemsByUser: {method: 'get', endpoint: 'readItemsByUser', authorize: true},    
    update: {method: 'put', endpoint: 'details', authorize: true},
    remove: {method: 'delete', endpoint: 'details', authorize: true}
    // bonusCreate: {method: 'post', endpoint: 'bonusCatalog', authorize: true},
    // bonusReadItem: {method: 'get', endpoint: 'bonusReadItem', authorize: false},
    // bonusItemsByUser: {method: 'get', endpoint: 'bonusItemsByUser', authorize: true}
};

function responseHandlers(requestType){
    const handlers = {
        login: loginHandler,
        logout: logoutHandler,
        register: loginHandler,
        remove: () => null,
        default: jsonData
    };

    return Object.keys(handlers).includes(requestType) ? handlers[requestType] : handlers['default'];
}


export const request = createRequest(requestHandlers, responseHandlers, endpoints);

// Response handlers
function jsonData(response){
    return response.json(); 
};

async function loginHandler(response){
    if (response) {
        const data = await response.json();
        if (DEBUG) {
            console.log(data);
        }
        const userData = JSON.stringify(data);
        sessionStorage.setItem('userData', userData);
    };
};

// Error handlers
async function logoutHandler(response){
    if (response.status != 204){
        let err = new Error();
        err.fetchResponse = response;
        onError(err);
    };
    sessionStorage.removeItem('userData');
};

async function onError(error){
    let message;
    if (error.fetchResponse){
        const data = await error.fetchResponse.json();
        message = `${data.code} ${data.message}`;
    } else {
        message = error.message;
    };
    // alert(message);
    const errBox = document.getElementById('errorBox');
    const errMessage = errBox.querySelector('span');
    errMessage.textContent = message;
    errBox.style.display = 'block';
    setTimeout(() => {errBox.style.display = ''}, 3000)
};

// API set-up & call
function createRequest(requestHandlers, responseHandlers, endpoints){
    return async (requestType, options={}) => {
        const handlerSettings = requestHandlers[requestType];
        let requestSettings = Object.assign(options, handlerSettings);
        let requestEndpoint = endpoints[requestSettings.endpoint];
        if (typeof requestEndpoint == "function"){
            const reqIDs = requestSettings.reqIDs;
            requestEndpoint = requestEndpoint(reqIDs); 
        };
        requestSettings['endpoint'] = requestEndpoint;
        const requestHandler = () => requestSetUp(requestSettings);
        const responseHandler = responseHandlers(requestType);
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
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        if (!userData.accessToken){
            throw new Error('this request requires AccessToken');
        };
        init.headers['X-Authorization'] = userData.accessToken;
    };
    if (options.data && Object.keys(options.data).length > 0){
        init['body'] = JSON.stringify(options.data);
    };

 
    const url = host + endpoint;
    if (DEBUG){
        console.log('Request params:');
        console.log(url);
        console.log(init);
    }
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