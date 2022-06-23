function lockedProfile() {

    const buttons = document.querySelectorAll('div.profile button');
    const hiddenElements = document.querySelectorAll('div[id$="HiddenFields"]');
    document.querySelector('main').addEventListener('click', onClick);

    function onClick(e){

        if(e.target.tagName == 'INPUT' && e.target.type == 'radio'){
            for (const button of buttons){  
                if (button.parentElement == e.target.parentElement){
                    if (e.target.value == 'unlock'){
                        button.addEventListener('click', showMore);
                    } else {
                        button.removeEventListener('click', showMore);
                    }
                }
            }
        }
    }

    function showMore(e){
        if (e.target.tagName =='BUTTON'){
            let btn = e.target;
            for (let el of hiddenElements){
                if (el.parentElement==btn.parentElement){
                    if (btn.textContent == 'Show more'){
                        btn.textContent = 'Hide it';
                        el.style.display = 'block';
                    } else {
                        btn.textContent = 'Show more';
                        el.style.display = 'none';
                    }
                }
            }
        }
    }
}   