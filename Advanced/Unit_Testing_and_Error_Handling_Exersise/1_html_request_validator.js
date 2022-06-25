function validateRequets(request){
    const validate = {
        method: (arg) => ['GET', 'POST', 'DELETE', 'CONNECT'].includes(arg),
        uri: (uri) => uri.match(/[a-zA-Z0-9\.]+|\*/)[0] == uri,
        version: (arg) => ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'].includes(arg),
        message: (msg) => msg.match(/[\<\>\\\&\'\"]/) == null
    }

    if ((request.method == undefined) || !(validate.method(request.method))){
        throw Error("Invalid request header: Invalid Method"); 
    }
    if ((request.uri == '') || (request.uri == undefined) || !(validate.uri(request.uri))){
        throw Error("Invalid request header: Invalid URI"); 
    }
    if ((request.version == undefined) || !(validate.version(request.version))){
        throw Error("Invalid request header: Invalid Version"); 
    }
    if ((request.message == undefined) || !(validate.message(request.message))){
        throw Error("Invalid request header: Invalid Message"); 
    }

    return request;
}

let obj = {
    method: 'POST',
    uri: '*',
    version: 'HTTP/2.0',
    message: 'das'
};
validateRequets(obj)