let buttonList = [];
let formsList = [];
let usersDiv = document.getElementById("usersDiv");

for (let i=0; i<5; i++)
{
    buttonList.push(document.getElementById('button'+(i+1)));
    buttonList[i].clicked=false;
    buttonList[i].innerId=i;

}

for (let i=0; i<5; i++)
{
    formsList.push(document.getElementById('form'+(i+1)));
}

function over(event)
{
    if(!event.target.clicked)
    {
        event.target.style.backgroundColor='whitesmoke';
        event.target.style.color="#25274D";

    }
}

function leave(event)
{
    if(!event.target.clicked)
    {
        event.target.style.backgroundColor="#29648A";
        event.target.style.color="whitesmoke";
    }
}

function click(event)
{
    if(!event.target.clicked)
    {
        for (let i=0; i<5; i++)
        {
            if(buttonList[i].clicked&&buttonList[i]!=event.target)
            {
                buttonList[i].style.backgroundColor="#29648A";
                buttonList[i].style.color="whitesmoke";
                buttonList[i].clicked=false;
                formsList[i].style.display='none';
            }
        }
        event.target.style.backgroundColor='whitesmoke';
        event.target.style.color="#25274D";
        event.target.clicked=true;
        formsList[event.target.innerId].style.display='block';
    }
    else
    {
        event.target.style.backgroundColor="#29648A";
        event.target.style.color="whitesmoke";
        event.target.clicked=false;
        formsList[event.target.innerId].style.display='none';
    }
}

for (let i=0; i<5; i++)
{
    buttonList[i].onmouseover=over;
    buttonList[i].onmouseleave=leave;
    buttonList[i].onclick=click;
}

function showUsers(list)
{
    while (usersDiv.firstChild)
        {
            usersDiv.removeChild(usersDiv.firstChild);
        }

    for (let i = 0; i < list.length; i++)
        {
            const el = document.createElement("div");
            el.setAttribute('class', 'single-user');
            // language=HTML
            el.innerHTML = `<h1>${list[i]['name']}</h1> <h2>Id: ${list[i]['user_id']} Age: ${list[i]['age']}</h2>`;
            usersDiv.appendChild(el);
        }
}

function getAllUsers()
{
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:55279/api/Server", true);

    xhr.addEventListener('load', function() {
        if (this.status === 200) {
            let usersList=JSON.parse(xhr.response);
            showUsers(usersList);
        }
    });
    xhr.send();
}

function getUser()
{
    let val = document.getElementById("oneUser").value;
    if(val)
    {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:55279/api/Server/"+val, true);

        xhr.addEventListener('load', function() {
            if (this.status === 200) {
                let usersList=[];
                usersList.push(JSON.parse(xhr.response));
                if(usersList[0]['name'])
                {
                    showUsers(usersList);
                }
            }
        });
        xhr.send();
    }
}


function postUser()
{
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;

    let newUser={};
    let xhr = new XMLHttpRequest();
    if(name!='')
    {
    xhr.open("POST", "http://localhost:55279/api/Server/", true);
    xhr.setRequestHeader("Content-Type", "application/json");

        newUser['name']=name;
            if(age!='')
            {
                newUser['age']=age;
            }
        xhr.addEventListener('load', function() {
            if (this.status === 204)
            {
                getAllUsers();
            }
        });
        xhr.send(JSON.stringify(newUser));
    }
    else
    {
        alert("You need to write a name for new user.");
    }
}

function putUser()
{
    let name = document.getElementById("newName").value;
    let age = document.getElementById("newAge").value;
    let id = document.getElementById("newId").value;
    let modUser={};
    let xhr = new XMLHttpRequest();

    if(id!='')
    {
        xhr.open("PUT", "http://localhost:55279/api/Server/"+id, true);
        xhr.setRequestHeader("Content-Type", "application/json");

            if(name!='')
            {
                modUser['name'] = name;
            }
            if(age!='')
            {
                modUser['age']=age;
            }
            xhr.addEventListener('load', function() {
                if (this.status === 204)
                {
                    getAllUsers();
                }
            });
            xhr.send(JSON.stringify(modUser));
    }
    else
    {
        alert("You need to specify the id.");
    }
}

function deleteUser()
{
    let id = document.getElementById("deleteId").value;
    let xhr = new XMLHttpRequest();

    if(id!='')
    {
        xhr.open("DELETE", "http://localhost:55279/api/Server/"+id, true);
        xhr.addEventListener('load', function() {
            if (this.status === 204)
            {
                getAllUsers();
            }
        });
        xhr.send();
    }
    else
    {
        alert("You need to specify the id.");
    }
}

