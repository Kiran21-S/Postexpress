import express from 'express'
import 'dotenv/config'

const app = express()
const port = process.env.PORT

app.use(express.json())

let teaData = []
let nextId = 1

//add new teas
app.post('/teas',(req,res)=>{
    const {name,price} = req.body
    const newTea = {id:nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

//get all teas
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})

//finding tea
app.get('/teas/:id',(req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("tea not found")
    }
    res.status(200).send(tea)
})

//update tea

app.put('/teas/:id',(req,res)=>{
    const teaId = req.params.id
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("tea not found")
    }
    const {name, price} = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})

//delete tea
app.delete("/teas/:id",(req,res)=>{
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if(index==-1){
        return res.status(404).send("tea not found")
    }
    teaData.splice(index, 1)
    return res.status(204).send("tea deleted")
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}...`)
})