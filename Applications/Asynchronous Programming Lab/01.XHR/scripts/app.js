function loadRepos() {

   const url = "https://api.github.com/users/testnakov/repos";
   getRepos(url).then(postData).catch(onReject);

   function getRepos(url){   
      return new Promise((resolve, reject) => {
         let xhr =  new XMLHttpRequest();
         xhr.open("GET", url);
         xhr.onload = () => {
            if (xhr.status == 200){
               resolve(xhr.response)
            } else {
               reject(xhr.statusText)
            }
         }
         xhr.onerror = (err) => reject(err)
         xhr.send();
      })
   }
   
   function postData(message){
      let data = JSON.parse(message);
      const el = document.getElementById('res');
      el.textContent = message;
   }
   
   function onReject(err){
      console.log(err);
   }

}

