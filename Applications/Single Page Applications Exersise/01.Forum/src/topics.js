import { showPost } from "./details.js";
import { e } from "./utils.js";
export { loadTopics, onSubmit };

const addTopicForm = document.querySelector('form');
const main = document.querySelector('main');

async function loadTopics(){
    const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';
    try {
        const res = await fetch(url);
        if (!res.ok){
            throw new Error(`${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        Object.values(data).forEach(topicData => {
            main.appendChild(createTopic(topicData));
        })
    } catch (error) {
        console.log(error.message);
    }
}

function createTopic(data){
    const result = e('div', {className: 'topic-title'},
        e('div', {className: 'topic-container'},
            e('div', {className: 'topic-name-wrapper'},
                e('div', {className: 'topic-name'},
                    e('a', {href: '#', className: 'normal', 'data-id': data._id, onClick: () => showPost(data._id)},
                        e('h2', {}, data.topicName)
                    ),
                    e('div', {className: 'columns'},
                        e('div', {},
                            e('p', {}, 'Date: ', e('time', {}, data.date)),
                            e('div', {className: 'nick-name'},
                                e('p', {}, 'username', e('span', {}, data.username))
                            )
                        )
                    )
                )
            )
        )
    )
    return result;
}

function onSubmit(e){
    e.preventDefault();
    if (e.submitter.className == 'cancel'){
        addTopicForm.reset();
    }
    if (e.submitter.className == 'public'){
        addNewTopic();
    }

}

async function addNewTopic(){
    const formData = new FormData(addTopicForm);
    if (Array.from(formData.values()).every(val => val != '')){
        try {
            const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';
            const input = Object.fromEntries(formData.entries());
            const topicDate = new Date
            input['date'] = topicDate.toJSON();
            const body = JSON.stringify(input);
            const res = await fetch(url, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body
            })
            if (!res.ok){
                throw new Error(`${res.status} ${res.statusText}`);
            }
            const data = await res.json();
            main.appendChild(createTopic(data));
            addTopicForm.reset();
        } catch (error) {
            console.log(error.message);
        }
    } else {
        alert('Please fill all fields');
    }
}