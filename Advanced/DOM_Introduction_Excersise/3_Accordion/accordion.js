function toggle() {
    const button = document.querySelector('.button');
    const text = document.querySelector('#extra');

    let textDisplay = button.textContent == 'More' ? 'block' : 'none';
    let buttonText = button.textContent == 'More' ? 'Less' : 'More';

    text.style.display = textDisplay;
    button.textContent = buttonText;
}
