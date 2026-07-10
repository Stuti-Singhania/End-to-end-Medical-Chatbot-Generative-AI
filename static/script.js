const chat=document.getElementById("chat-box");

function addMessage(text,type){

const row=document.createElement("div");

row.className="message "+type;

const bubble=document.createElement("div");

bubble.className="bubble";

bubble.innerHTML=text;

row.appendChild(bubble);

chat.appendChild(row);

chat.scrollTop=chat.scrollHeight;

}

function typing(){

const row=document.createElement("div");

row.className="message bot";

row.id="typing";

row.innerHTML=`
<div class="typing">

<span></span>

<span></span>

<span></span>

</div>`;

chat.appendChild(row);

chat.scrollTop=chat.scrollHeight;

}

function removeTyping(){

const t=document.getElementById("typing");

if(t) t.remove();

}

async function sendMessage(){

const input=document.getElementById("message");

const msg=input.value.trim();

if(msg==="") return;

addMessage(msg,"user");

input.value="";

typing();

const response=await fetch("/get",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

message:msg

})

});

const data=await response.json();

removeTyping();

addMessage(data.answer,"bot");

}

document.getElementById("message")

.addEventListener("keypress",function(e){

if(e.key==="Enter"){

sendMessage();

}

});