// Async Await version
async function loadRepos() {
	const ul = document.getElementById('repos');
	const username = document.getElementById('username'); 	

	try {
		const response = await fetch(`https://api.github.com/users/${username.value}/repos`);
		if (!response.ok){
			throw new Error(`${response.status} ${response.statusText}`);
		}	
		const repoData = await response.json();
		ul.innerHTML = '';
		repoData.forEach(el => {
			let li = document.createElement('li');
			let a = document.createElement('a');
			a.href = el.html_url;
			a.textContent = el.full_name;
			a.target = "_blank"
			li.appendChild(a);
			ul.appendChild(li);
		})

	} catch (err) {
		ul.innerHTML = `<li>${err.message}</li>`;
	}
}

// Try Catch version
function loadReposThenCathch() {
	const ul = document.getElementById('repos');
	const username = document.getElementById('username'); 	

	fetch(`https://api.github.com/users/${username.value}/repos`)
		.then(handleResponse)
		.then(listRepos)
		.catch(handleError)
		
	function handleResponse(res){
		if (!res.ok){
			throw new Error(`${res.status} ${res.statusText}`);
		}			
		return res.json()
	}

	function listRepos(repoData){
		ul.innerHTML = '';
		repoData.forEach(el => {
			let li = document.createElement('li');
			let a = document.createElement('a');
			a.href = el.html_url;
			a.textContent = el.full_name;
			a.target = "_blank"
			li.appendChild(a);
			ul.appendChild(li);
		})
	}

	function handleError(err){
		ul.innerHTML = `<li>${err.message}</li>`;
	}
}