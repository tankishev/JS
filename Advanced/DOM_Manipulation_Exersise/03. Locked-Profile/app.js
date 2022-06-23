function lockedProfile() {

    const buttons = document.querySelectorAll('div.profile button');
    const hidden = document.querySelectorAll('div[id~="HiddenFields"');
    document.querySelector('main').addEventListener('click', onClick);

    function onClick(e){
     
        if(e.target.tagName == 'INPUT' && e.target.type == 'radio'){
            for (const button of buttons){  
                if (button.parentElement == e.target.parentElement){
                    console.log(e.target.value)
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
            for (el of hidden){
                if (el.parentElement==e.target.parentElement){
                    el.style.display == 'none' ? el.style.display == 'block' : el.style.display == 'none';
                }
            }
        }
    }
}   