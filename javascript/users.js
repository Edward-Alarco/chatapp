const searchBar = document.querySelector('.users .search input'),
searchBtn = document.querySelector('.users .search button'),
userList = document.querySelector('.users .users-list');

searchBtn.onclick = ()=> {
    searchBtn.classList.toggle('active')
    searchBar.classList.toggle('active')
    searchBar.focus()

    searchBar.value = ''
}

searchBar.onkeyup = ()=> {
    let searchTerm = searchBar.value;

    //para que no se sobreponga el setInterval de abajo
    if(searchTerm != ""){
        searchBar.classList.add('active')
    }else{
        searchBar.classList.remove('active')
    }

    //ajax
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/search.php", true);
    xhr.onload = ()=> {
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                let data = xhr.response;
                userList.innerHTML = data;
            }
        }
    }

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("searchTerm=" + searchTerm);
}

setInterval(()=>{
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/users.php", true);
    xhr.onload = ()=> {
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                let data = xhr.response;
                if(!searchBar.classList.contains("active")){
                    userList.innerHTML = data;
                }
            }
        }
    }
    xhr.send();
},500); //se repetira cada 500ms 