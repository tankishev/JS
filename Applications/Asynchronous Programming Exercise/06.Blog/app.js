function attachEvents() {
    const btnLoad = document.getElementById('btnLoadPosts');
    const btnView = document.getElementById('btnViewPost');

    btnLoad.addEventListener('click', loadPosts);
    btnView.addEventListener('click', viewPost);
}

async function loadPosts(){
    const url = 'http://localhost:3030/jsonstore/blog/posts'
    const res = await fetch(url);
    const data = await res.json();
    const posts = Object.values(data);
    
    const select = document.getElementById('posts');
    select.innerHTML = '';
    posts.forEach(el => {
        let option = document.createElement('option');
        option.value = el.id;
        option.textContent = el.title;
        select.appendChild(option);
    });
}

async function viewPost(){
    const baseUrl = 'http://localhost:3030/jsonstore/blog'
    const title = document.getElementById('post-title');
    const body = document.getElementById('post-body');
    const ul = document.getElementById('post-comments');
    const id = document.getElementById('posts').value;
    
    const [postRes, commentsRes] = await Promise.all([
        await fetch(`${baseUrl}/posts/${id}`),
        await fetch(`${baseUrl}/comments`)
    ]);
    
    const postData = await postRes.json();
    title.textContent = postData.title;
    body.textContent = postData.body;

    ul.innerHTML = '';
    const commentsData = await commentsRes.json();
    const filteredComments = Object.values(commentsData)
        .filter(el => el.postId == id)
        .forEach(el => {
            let li = document.createElement('li');
            li.textContent = el.text;
            ul.appendChild(li);
        })    
}

function showPosts(data){

}


attachEvents();