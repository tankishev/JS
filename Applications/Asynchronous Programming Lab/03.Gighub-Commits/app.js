// With Async Await
async function loadCommits() {
    const userInput = document.getElementById('username');
    const repoInput = document.getElementById('repo');
    const ul = document.getElementById('commits');
    ul.innerHTML = '';

    try {
        const response = await fetch(`https://api.github.com/repos/${userInput.value}/${repoInput.value}/commits`)
        if (!response.ok){
            throw new Error(`${response.status} ${response.statusText}`);
        }
        const commits = await response.json();
        commits.forEach(el => {
            let li = document.createElement('li');
            li.textContent = `${el.commit.author.name}: ${el.commit.message}`;
            ul.appendChild(li);
        });
    } catch (err){
        let li = document.createElement('li');
        li.textContent = `Error: ${err.message}`;
        ul.appendChild(li); 
    }
    
}

// With Promisses Then Catch
function loadCommits() {
    const userInput = document.getElementById('username');
    const repoInput = document.getElementById('repo');
    const ul = document.getElementById('commits');
    ul.innerHTML = '';

    const url = `https://api.github.com/repos/${userInput.value}/${repoInput.value}/commits`
    fetch(url)
    .then(handleResponse)
    .then(showCommits)
    .catch(handleError)
    
    function showCommits(commits){
        commits.forEach(element => {
            let li = document.createElement('li');
            li.textContent = `${element.commit.author.name}: ${element.commit.message}`;
            ul.appendChild(li);
        });
    }
    
    function handleError(err){
        let li = document.createElement('li');
        li.textContent = `"Error: ${err.message} (Not Found)"`;
        ul.appendChild(li); 
    }
    
    function handleResponse(res){
        if (!res.ok){
            throw new Error(res.status);
        }
        return res.json();
    }
}