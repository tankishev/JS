function extract(content) {
    const text = document.getElementById('content').innerText;
    const pattern = /\(.+?\)/g
    const matches = [...text.matchAll(pattern)];
    return matches
        .map((el) => el[0].slice(1, -1))
        .join('; ');
}