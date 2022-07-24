import { html } from './node_modules/lit-html/lit-html.js';

export function bodyTemplate(tableData, funcs, formTemplate){
    return html`
    <button @click=${funcs.load} id="loadBooks">LOAD ALL BOOKS</button>
    ${tableTemplate(tableData, funcs)}
    ${formTemplate ? formTemplate : null}
    `
}

export function templateFormAddBook(func){
    return html`
    <form id="add-form" @submit=${func}>
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>`
}

export function templateFormEditBook(data, func){
    return html`
    <form id="edit-form" @submit=${func}>
        <input type="hidden" name="id" .value=${data.id}>
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title..." .value=${data.title}>
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author..." .value=${data.author}>
        <input type="submit" value="Save">
    </form>`
}

function tableTemplate(data, funcs){
    return html`
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>    
        ${data ? data.map(rowData => tableRowTemplate(rowData, funcs)) : null}
        </tbody>
    </table>
    `
}

function tableRowTemplate(data, funcs){
    return html`
    <tr data-id=${data._id}>
        <td>${data.title}</td>
        <td>${data.author}</td>
        <td>
            <button @click=${() => funcs.edit(data._id)}>Edit</button>
            <button @click=${() => funcs.delete(data._id)}>Delete</button>
        </td>
    </tr>`
};