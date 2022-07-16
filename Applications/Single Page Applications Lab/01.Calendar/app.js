window.onload = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const sectionList = Object.fromEntries(Array.from(document.querySelectorAll('section')).map(s => [s.id, s]));
    const bodySection = document.querySelector('body');
    
    bodySection.innerHTML = ''
    let initialView = sectionList.years
    initialView.style.display = 'block';
    bodySection.appendChild(initialView);
    
    document.addEventListener('click', (e) => {
        const nextSection = () => {
            currentView = e.target.closest('section');
            if (e.target.className == 'day'){
                const cellText = e.target.firstElementChild.textContent;
                const idx = months.indexOf(cellText);
                if (idx >= 0){
                    const year = e.target.closest('table').caption.textContent;
                    return `month-${year}-${idx + 1}`;
                } else if (currentView.id == 'years'){
                    return `year-${cellText}`;
                }
            } else if (e.target.tagName == 'CAPTION'){
                const captionText = e.target.textContent.split(' ');
                if (captionText.length == 1){
                    return 'years';
                } else {
                    return `year-${captionText[1]}`
                }  
            }
        }
        newView = sectionList[nextSection()];
        if (newView != undefined){
            newView.style.display = 'block';
            bodySection.replaceChild(newView, currentView);    
        }
    })
}


