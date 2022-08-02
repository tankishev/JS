// Set-up
const showRequest = false;
const host = 'http://localhost:3030';

const endpoints = {
    catalogue: `/data/books`,
    details: (reqIDs) => `/data/books/${reqIDs.bookId}`,
    login: `/users/login`,
    logout: '/users/logout',
    register: '/users/register',
    loadBooks: '/data/books?sortBy=_createdOn%20desc',
    loadMyBooks: (reqIDs) => `/data/books?where=_ownerId%3D%22${reqIDs.userId}%22&sortBy=_createdOn%20desc`,
    like: '/data/likes',
    getLikes: (reqIDs) => `/data/likes?where=bookId%3D%22${reqIDs.bookId}%22&distinct=_ownerId&count`,
    getUserLikes: (reqIDs) => `/data/likes?where=bookId%3D%22${reqIDs.bookId}%22%20and%20_ownerId%3D%22${reqIDs.userId}%22&count`
};

const requestHandlers = {
    login: {method: 'post', endpoint: 'login', authorize: false},
    logout: {method: 'get', endpoint: 'logout', authorize: true},
    register: {method: 'post', endpoint: 'register', authorize: false},
    createBook: {method: 'post', endpoint: 'catalogue', authorize: true},
    editBook: {method: 'put', endpoint: 'details', authorize: true},
    deleteBook: {method: 'delete', endpoint: 'details', authorize: true},
    getBook: {method: 'get', endpoint: 'details', authorize: false},
    loadBooks: {method: 'get', endpoint: 'loadBooks', authorize: false},
    loadMyBooks: {method: 'get', endpoint: 'loadMyBooks', authorize: true},
    like: {method: 'post', endpoint: 'like', authorize: true},
    getLikes: {method: 'get', endpoint: 'getLikes', authorize: false},
    getUserLikes: {method: 'get', endpoint: 'getUserLikes', authorize: true}
};

const responseHandlers = {
    login: loginHandler,
    logout: logoutHandler,
    register: loginHandler,
    createBook: jsonData,
    editBook: jsonData,
    deleteBook: () => null,
    getBook: jsonData,
    loadBooks: jsonData,
    loadMyBooks: jsonData,
    like: jsonData,
    getLikes: jsonData,
    getUserLikes: jsonData
}

export const request = createRequest(requestHandlers, responseHandlers, endpoints)

// Response handlers
function jsonData(response){
    return response.json(); 
};

async function loginHandler(response){
    if (response) {
        const data = await response.json();
        if (showRequest) {
            console.log(data);
        }
        const {accessToken, email, _id, ...rest} = data; 
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('user_id', _id);
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
    alert(message);
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
    if (showRequest){
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