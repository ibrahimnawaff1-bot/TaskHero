let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let xp = Number(localStorage.getItem("xp")) || 0;
let level = Number(localStorage.getItem("level")) || 1;

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("tasks");

const xpText = document.getElementById("xp");
const levelText = document.getElementById("level");
const percentText = document.getElementById("percent");
const progress = document.getElementById("progress");

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("xp", xp);
    localStorage.setItem("level", level);
}

function render() {

    taskList.innerHTML = "";

    let done = 0;

    tasks.forEach((task, index) => {

        if(task.done) done++;

        const li = document.createElement("li");
        li.className = task.done ? "task done" : "task";

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="buttons">

                <button class="complete">

                    ${task.done ? "✔" : "إنهاء"}

                </button>

                <button class="delete">

                    حذف

                </button>

            </div>
        `;

        li.querySelector(".complete").onclick = ()=>{

            if(!task.done){

                task.done=true;

                xp +=25;

                if(xp>=100){

                    xp-=100;

                    level++;

                }

            }else{

                task.done=false;

                xp=Math.max(0,xp-25);

            }

            save();

            update();

            render();

        };

        li.querySelector(".delete").onclick=()=>{

            tasks.splice(index,1);

            save();

            render();

        };

        taskList.appendChild(li);

    });

    percentText.textContent =
    tasks.length==0
    ? "0%"
    : Math.round(done/tasks.length*100)+"%";

}

function update(){

    xpText.textContent=xp;

    levelText.textContent=level;

    progress.style.width=xp+"%";

}

addBtn.onclick=()=>{

    if(taskInput.value.trim()=="") return;

    tasks.push({

        text:taskInput.value,

        done:false

    });

    taskInput.value="";

    save();

    render();

};

update();

render();