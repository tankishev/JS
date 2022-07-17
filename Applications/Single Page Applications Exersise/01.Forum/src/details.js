import { e, genDate } from "./utils.js";
export { showPost };

const main = document.querySelector('main');

async function showPost(post_id){
    // Temp loading message
    main.replaceChildren('Loading...');

    // Get data from DB
    const [postData, commentsData] = await Promise.all([
        loadPost(post_id),
        loadComments(post_id)
    ]);

    // Create main body of post
    const post = createPost(postData);
    const commentSection = post.querySelector('#user-comment');
    const themeContent = post.querySelector('div.theme-content');

    // Create comments for post
    Object.values(commentsData)
        .filter(el => el.postId == post_id)
        .forEach(cdata => {
            commentSection.appendChild(createComment(cdata))
    })
    
    // Create addComment form
    themeContent.appendChild(genCommentForm(post_id));
    
    // Append all to main
    main.replaceChildren(post);
}


async function loadPost(post_id){
    const url = `http://localhost:3030/jsonstore/collections/myboard/posts/${post_id}`
    try {
        const res = await fetch(url);
        if (!res.ok){
            throw new Error(`${res.status} ${res.statusText}`);
        }
        return res.json();
    } catch (error) {
        console.log(error.message);
    }
}

async function loadComments(post_id){
    const url = `http://localhost:3030/jsonstore/collections/myboard/comments`
    try {
        const res = await fetch(url);
        if (!res.ok){
            throw new Error(`${res.status} ${res.statusText}`);
        }
        return res.json();
    } catch (error) {
        console.log(error.message);
    }
}

function createPost(data){
    const result  = e('div', {className: 'container'},
        e('div', {className: 'theme-content'},
            e('div', {className: 'theme-title'},
                e('div', {className: 'theme-name-wrapper'},
                    e('div', {className: 'theme-name'}, 
                        e('h2', {id: 'details-title'}, data.topicName)
                    )
                )
            ),
            e('div', {className: 'comment'},
                e('div', {className: 'header'},
                    e('img', {src: "./static/profile.png", alt: "avatar"}),
                    e('p', {}, 
                        e('span', {}, data.username), ' posted on ', e('time', {}, genDate(data.date, 0))
                    ),
                    e('p', {className: 'post-content'}, data.postText)
                ),
                e('div', {id: 'user-comment'})
            )
        )
    )
    return result;
}

function createComment(data){
    const result = e('div', {className: 'topic-name-wrapper'},
        e('div', {className: 'topic-name'},
            e('p', {}, 
                e('strong', {}, data.username),
                ' commented on ',
                e('time', {}, genDate(data.date, 1))
            ),
            e('div', {className: 'post-content'},
                e('p', {}, data.commentText)
            )
        )
    );
    return result;
}

function genCommentForm(post_id){
    const result = e('div', {className: "answer-comment"},
        e('p', {}, e('span', {}, 'currentUser'), ' comment:'),
        e('div', {className: 'answer'},
            e('form', {},
                e('textarea', {name: 'postText', id: 'comment', cols: 30, rows: 10}, ),
                e('div', {},
                    e('label', {for: 'username'}, 'Username', e('span', {className: 'red'}, '*')),
                    e('input', {type: 'text', name: 'username', id: 'username'},)
                ),
                e('button', {}, 'Post')
            )
        )
    )
    result.querySelector('form').addEventListener('submit', addNewComment)
    return result;

    async function addNewComment(e){
        e.preventDefault();
        const form = e.target
        const formData = new FormData(form)
        if (Array.from(formData.values()).some(v => v == '')){
            alert('Please fill all fields');
        } else {
            try {
                const url = 'http://localhost:3030/jsonstore/collections/myboard/comments';
                const d = new Date();
                const reqData = {
                    username: formData.get('username'),
                    commentText: formData.get('postText'),
                    postId: post_id,
                    date: d.toJSON()
                };
    
                const res = await fetch(url, {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(reqData)
                });
    
                if (!res.ok){
                    throw new Error (`${res.status} ${res.statusText}`);
                }
                
                const commentSection = document.getElementById('user-comment');
                commentSection.appendChild(createComment(reqData));
                form.reset();
    
            } catch (error) {
                console.log(error.message);           
            }
        }
    }
}