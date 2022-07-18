import { e } from '../utils.js';
import { showDetails } from '../views/home.js';

function movieCard({img, title, _id}){
    const card = e('div', {className: 'card mb-4'},
        e('img', {className: "card-img-top", src: img, alt: "Card image cap", width:"400"}),
        e('div', {className: 'card-body'},
            e('h4', {className: 'card-title'}, title)
        )
    );
    if (sessionStorage.getItem('userData')){
        const cardFooter = e('div', {className: 'card-footer'},
            e('a', {href: '#', 'data-id': _id}, 
                e('button', {type: 'button', className: 'btn btn-info', onClick: () => showDetails(_id)}, 'Details')
            )
        )
        card.appendChild(cardFooter)
    }
    return card;
}

export { movieCard };

