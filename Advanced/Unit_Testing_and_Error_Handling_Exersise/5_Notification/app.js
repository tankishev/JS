function notify(message) {
  const msgElement = document.getElementById('notification');
  msgElement.textContent = message;
  msgElement.style.display = 'block';
  msgElement.addEventListener('click', onClick);

  function onClick(e){
    e.target.style.display = 'none';
    e.target.removeEventListener('click', onClick);
  }
}