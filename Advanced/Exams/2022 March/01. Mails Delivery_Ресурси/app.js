function solve() {
    const recepient = document.getElementById('recipientName');
    const title = document.getElementById('title');
    const message = document.getElementById('message');
    const emailList = document.getElementById('list');
    const sentList = document.querySelector('ul.sent-list');
    const deleteList = document.querySelector('ul.delete-list');
    document.querySelector('body').addEventListener('click', onClick);

    function onClick(e){
        e.preventDefault();
        if (e.target.id == 'add'){
            if (recepient.value != '' && title.value != '' && message.value != ''){
                    emailList.innerHTML +=
                    `<li>
                        <h4>Title: ${title.value}</h4>
                        <h4>Recipient Name: ${recepient.value}</h4>
                        <span>${message.value}</span>
                        <div id="list-action">
                            <button type="submit" id="send">Send</button>
                            <button type="submit" id="delete">Delete</button>
                        </div>
                    </li>`;
                    onReset();
            }
        } else if(e.target.id == 'reset'){
            onReset();
        } else if (e.target.tagName = 'BUTTON' && e.target.id == 'send'){
            let children = e.target.parentElement.parentElement.children;
            let emailTitle = children[0].textContent.slice(7);
            let emailRecepient = children[1].textContent.slice(16);

            sentList.innerHTML += 
            `<li>
                <span>To: ${emailRecepient}</span>
                <span>Title: ${emailTitle}</span>
                <div class="btn">
                    <button type="submit" class="delete">Delete</button>
                </div>
            </li>`  
            e.target.parentElement.parentElement.remove();
        } else if (e.target.tagName = 'BUTTON' && (e.target.id == 'delete' || e.target.className == 'delete')){
            let parentElement = e.target.parentElement.parentElement;
            let children = parentElement.children;   
            let delRecepient = ''
            let delTitle = ''
            if (e.target.id == 'delete'){
                delRecepient = children[1].textContent.slice(16);
                delTitle = children[0].textContent.slice(7);
            } else {
                delRecepient = children[0].textContent.slice(4);
                delTitle = children[1].textContent.slice(7);   
            }

            deleteList.innerHTML +=
            `<li>
                <span>To: ${delRecepient}</span>
                <span>Title: ${delTitle}</span>
            </li>`;
            
            if (parentElement.tagName == 'LI'){
                parentElement.remove();
            }
        }
    }

    function onReset(){
        recepient.value = '';
        title.value = '';
        message.value = '';
    }
}
solve()