const getAllUsers = async () => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', 'http://localhost:55279/api/Server', true);
    xhr.send();
    xhr.onload = function() {
        alert(`Loaded: ${xhr.status} ${xhr.response}`);
    };
};

let inp=document.getElementById('in1');
inp.onclick=getAllUsers;