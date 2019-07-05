let buttonList=[];
let formsList=[];

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



function getAllUsers()
{
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:55279/api/Server", true);

    xhr.addEventListener('load', function() {
        if (this.status === 200) {
            let usersList=JSON.parse(xhr.response);
            for(let i=0; i<usersList.length;i++)
            {
                const el = document.createElement("p");
                el.innerText="Name: "+usersList[i]["name"];
                document.getElementById("usersDiv").appendChild(el);
            }
        }
    });
    xhr.send();
}
