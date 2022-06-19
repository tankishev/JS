function editElement(el, matchText, replaceText) {
    const textArr = el.innerText.split(matchText);
    el.innerText = textArr.join(replaceText);
}   