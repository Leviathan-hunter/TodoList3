const express = require('express')

const cors = require('cors')

const todos = [
{
    action: "learn JAvaScript",
    dueDate: new Date("2024/06/02"),
    completed: false
},
{
    action: "go to the cinema",
    dueDate: new Date("2024/06/12"),
    completed: false
},
{
    action: "makeanapp",
    dueDate: new Date("2024/07/02"),
    completed: false
}
]

let todoNotFoundError 
let app = express()

app.use(cors())

app.get("/", (req, res) => {
    res.status(200)
    res.send("<h2>Hello World</h2>")
})

const PORT = 3001





app.get('/todos', (req, res) => {
    res.json(todos)
})

app.get('/todos/:dueDate', (req, res) => {
    let dateCompleted = todos[req.params.dueDate]
    res.json(dateCompleted)
})


app.get("/todos/ :id", (req,res) => {
  let id = req.params.id
  if (id >= todos.length || id < 0) {
    res.status(404)
    res.json(todoNotFoundError)
    return
  }
  res.status(200)
  res.json(todos[id])
})

app.get("/todosbyaction/ :action", (req, res) => {
    let action = req.params.action.toLowerCase()
    let index = todos.findIndex(x => x.action.toLowerCase() == action)
    if(index == -1) {
        res.status(404)
        res.json(todoNotFoundError)
        return
    }
    res.status(200)
    res.json(todos[index])
})

let dateNotFormattedError = {
    status: 404,
    message: "Date is not properly formatted, please ensure that you use YYYY-MM-DD"
}

let todosNotFoundError = {
    status: 404,
    message: "Could not find any todos with given condition"
}


app.get("todosbydate/:dueDate", (req, res) => {
   
    let datedArray = todos.filter(x => 
       {
        date.setHours(0)
        x.dueDate.setHours(0)
        return x.dueDate.getTime() == date.getTime()

       })
    if(datedArray.length == 0){
        res.status(404)
        res.json(todosNotFoundError)
        return
    }
    res.status(200)
    res.json(datedArray)
})



app.get("todosbycompleted/:completed", (req, res) => {
   let completedBool = false
   if(req.params.completed.toLowerCase() == true){
    completedBool = true
   }
    let statusArray = todos.filter(x => x.completed == completedBool)
    if(statusArray.length == 0){
        res.status(404)
        res.json(todosNotFoundError)
        return
    }
    res.status(200)
    res.json(statusArray)
})

app.get("completetodo/:id", (req, res) => {
 
    let id = req.params.id
    if (id >= todos.length || id < 0) {
      res.status(404)
      res.json(todoNotFoundError)
      return
    }
    todos[id].completed =!todos[id].completed
    res.status(200)
    res.json(todos[id])
  })
  

app.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`)
})