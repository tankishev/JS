import { e } from '../utils.js';

function movieDetails({img, title, description, likes}){
    const movie = e('div', {className: 'container'},
        e('div', {className: 'row bg-light text-dark'},
            e('h1', {}, `Movie title: ${title}`),
            e('div', {className: 'col-md-8'},
                e('img', {className: "img-thumbnail", src: img, alt: "Movie"})
            ),
            e('div', {className: 'col-md-4 text-center'},
                e('h3', {className: 'my-3'}, 'Movie Description'),
                e('p', {}, description),
                e('a', {className: 'btn btn-danger', href: "#", id: 'btnDelete'}, 'Delete'),
                e('a', {className: 'btn btn-warning', href: "#", id: 'btnEdit'}, 'Edit'),
                e('a', {className: 'btn btn-primary', href: "#", id: 'btnLike'}, 'Like'),
                e('span', {className: 'enrolled-span'}, `Liked ${likes}`)
            )
        )
    );
    return movie;
}

export { movieDetails };