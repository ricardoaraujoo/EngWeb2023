exports.mainPage = (users,tasks,d,maxID,editP) =>{
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>To Do List</title>
        </head>
        <body>
            <div class="w3-card-4"
                <div class="w3-container">
                    <header class="w3-container w3-center w3-indigo">
                    <h1> To Do List</h1>
                    </header>
                </div>
                <form class="w3-container" action="/tasks/registo" method="POST">
                    <fieldset>
                    <legend>Task</legend>
                    <input class="w3-input w3-round" type="hidden" name="id" value="${maxID--}"/>
                    <label>Goal</label>
                    <input class="w3-input w3-round w3-border" type="text" name="what"/>
                    <br/>
                    <label>Responsible</label>
                    <select class="w3-select w3-border w3-round" name="who"/>
                    <option class="" value="" disabled selected>Choose a User</option>
                    `
for(let i=0; i<users.length;i++){
    pagHTML +=`
    <option class="w3-center">${users[i].name}</option>
    `
}
 pagHTML+=     `
                    </select>
                    <br>
                    <br>
                    <label>Due Date</label>
                    <input class="w3-input w3-round w3-border" type="date" name="dueDate"/>
                    <input class="w3-input w3-round" type="hidden" name="done" value="0"/>
                    </fieldset>

                    <br/>
                    <button class="w3-button w3-white w3-border w3-border-red w3-round-large" type="reset" > Reset</button>
                    <button class="w3-button w3-white w3-border w3-border-blue w3-round-large w3-right" type="submit" > Regist Task</button>
                </form>
            </div>
            `
if(editP == undefined){}
else{
    pagHTML += `
            <div class="w3-card-4"
                <div class="w3-container">
                <header class="w3-container w3-center w3-indigo">
                <h1>Edit</h1>
                </header>
                </div>
                <form class="w3-container" action="/tasks/edit/registo/${editP.id}" method="POST">
                <fieldset>
                <legend>Task</legend>
                <label>Goal</label>
                <input class="w3-input w3-round" type="hidden" name="id" value="${editP.id}"/>
                <input class="w3-input w3-round w3-border" type="text" name="what" value="${editP.what}"/>
                <br/>
                <label>Responsible</label>
                <select class="w3-select w3-border w3-round" name="who" value="${editP.who}"/>
                <option class="" value="${editP.who}" disabled selected>${editP.who}</option>
                `
        for(let i=0; i<users.length;i++){
        pagHTML +=`
        <option class="w3-center">${users[i].name}</option>
        `
        }
        pagHTML+=     `
                </select>
                <br>
                <br>
                <label>Due Date</label>     
                <input class="w3-input w3-round w3-border" type="date" name="dueDate" value="${editP.dueDate}"/>
                <label>Is it Done?</label> 
                <input class="w3-input w3-round" type="checkbox" name="done" value="1" checked/>
                </fieldset>

                <br/>
                <button class="w3-button w3-white w3-border w3-border-red w3-round-large" type="reset" > Reset</button>
                <button class="w3-button w3-white w3-border w3-border-blue w3-round-large w3-right" type="submit" > Regist Task</button>
            </form>
        </div>
    
    `
}

pagHTML +=`
            <div class="w3-row w3-container">
                <div class="w3-col s6 w3-white w3-blue-grey">
                    <header class="w3-center w3-blue-grey">
                    <h1> TO DO</h1>
                    </header>

                
                <table class="w3-table-all">
                    <tr>
                        <th>Id</th>
                        <th>Goal</th>
                        <th>Responsible</th>
                        <th> Due Date</th>
                        <th>Options</th>
                    </tr>
                    
                `
            
for(let j=0;j<tasks.length;j++){
     if(tasks[j].Done == undefined || tasks[j].done == 0 ){
                pagHTML +=`<tr>
                <td>${tasks[j].id} </td>
                <td>${tasks[j].what} </td>
                <td>${tasks[j].who} </td>
                <td>${tasks[j].dueDate} </td>
                <td> <[<a href="/tasks/edit/${tasks[j].id}">Edit</a>][<a href="/tasks/delete/${tasks[j].id}">Delete</a>]> </td>
                </tr>`
    }
}        
 pagHTML += `   
            
            </table>
            </div>

            
            <div class="w3-col s6 w3-white w3-teal">
            <header class="w3-center w3-teal">
            <h1> DONE</h1>
            </header>

            
            <table class="w3-table-all">
                <tr>
                    <th>Id</th>
                    <th>Goal</th>
                    <th>Responsible</th>
                    <th> Due Date</th>
                    <th> Date of completion</th>
                    <th>Options</th>
                </tr>
                
            `
        
for(let j=0;j<tasks.length;j++){
 if(tasks[j].done == 1 ){

    pagHTML +=`
            <tr>
            <td>${tasks[j].id} </td>
            <td>${tasks[j].what} </td>
            <td>${tasks[j].who} </td>
            <td>${tasks[j].dueDate} </td>
            <td>${tasks[j].date} </td>
            <td> <[<a href="/tasks/delete/${tasks[j].id}">Delete</a>]> </td>
            </tr>
            `
}

}        
pagHTML += `   
        </table>
        </div>
        </div>
            
        
            <div class="w3-card-4 w3-indigo" >
                 <footer class="w3-container w3-MidnightBlue">
                    <h5>Generated by EngWeb2023 in ${d}</h5>
                </footer>
            </div> 
        </body>
    </html>
    `

    return pagHTML



}