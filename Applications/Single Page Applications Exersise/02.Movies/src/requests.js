const baseUrl = 'http://localhost:3030';

async function getLikes(movieId, userId=null){
    let url = baseUrl + `/data/likes?where=movieId%3D%22${movieId}%22`;
    if (!userId) {
        url += '&distinct=_ownerId&count'
    } else {
        url += `%20and%20_ownerId%3D%22${userId}%22`
    }
    try {
        const res = await fetch(url);
        const resData = await res.json();
        if (!res.ok) {
            throw new Error(resData.message);
        }
        return resData;
    } catch (error) {
        alert(error.message);
    }  
};

async function toggleLike(movieId){
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const accessToken = userData ? userData.accessToken : null;

    if (accessToken) {
        let url = baseUrl + '/data/likes';
        const init = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': accessToken
            },
            body: JSON.stringify({movieId, _ownerId: userData._id})
        }
        const userLikes = await getLikes(movieId, userData._id);  
        if (userLikes.length > 0){
            const likeId = userLikes[0]._id;
            url += `/${likeId}`;
            init.method = 'delete'
            delete init.body;
        }
        try {
            const res = await fetch(url, init);
            const resData = await res.json();
            if (!res.ok) {
                throw new Error(resData.message);
            }
            return init.method == 'post' ? 1 : -1;
        } catch (error) {
            alert(error.message);
        }
    }  
};

async function getMoviesData(movieId=null){
    let url = baseUrl + '/data/movies'
    if (movieId){
        url += `/${movieId}`;
    }
    try {
        const res = await fetch(url);
        const resData = await res.json();
        if (!res.ok) {
            throw new Error(resData.message);
        }
        return resData;
    } catch (error) {
        alert(error.message);
    } 
};

async function editMovie(data, movieId){
    const body = JSON.stringify(data);
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const accessToken = userData ? userData.accessToken : null;
    
    if (accessToken) {
        let url = baseUrl + `/data/movies/${movieId}`; 
        const init = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': accessToken
            },
            body
        }
        try {
            const res = await fetch(url, init);
            if (!res.ok) {
                throw new Error(resData.message);
            }
            const result = await res.json();
            return result;
        } catch (error) {
            alert(error.message);
        }
    } 
}

async function deleteMovie(movieId){
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const accessToken = userData ? userData.accessToken : null;

    let url = baseUrl + `/data/movies/${movieId}`; 
    const init = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': accessToken
        }
    }
    try {
        const res = await fetch(url, init);
        if (!res.ok) {
            throw new Error(resData.message);
        }
    } catch (error) {
        alert(error.message);
    } 
};

export { 
    getLikes,
    getMoviesData,
    toggleLike,
    editMovie,
    deleteMovie
};