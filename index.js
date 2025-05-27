 import express from 'express'

 const app = express()
 const port =3020
 app.use(express.json())


 app.listen(port,()=>{
    console.log(`server is running at http://127.0.0.1:${port}`)
 })

let teadata =[]
let nextid=1

app.post('/tea',(req,res)=>{
    const {name,price}=req.body
    const newtea={
        id:nextid++,
        name ,
        price
    }
    teadata.push(newtea)
    res.status(201).send(newtea)

})
app.get('/',(req,res)=>{
    res.status(202)
    res.send(teadata)
    res.end("here are all the tea")
})
app.get('/tea/:id',(req,res)=>{
    let tid=teadata.find(t=> t.id===parseInt(req.params.id))
    if(!tid){
        return res.status(404).send('tea not found')
    }
    else{
        res.status(200)
        res.send(tid)
    }

})

app.put('/tea/:id',(req,res)=>{
   
    const tea= teadata.find(t=> t.id===parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('tea not found')
    }
    const {name,price}=req.body
    tea.name=name
    tea.price=price
    res.status(200).send(tea)
    
})

app.delete('/tea/:id',(req,res)=>{
    const ind=teadata.findIndex(t => t.id === parseInt(req.params.id))

    if(ind===-1){
        return res.status(404).send('404 not found')
    }
    else{
        teadata.splice(ind,1)
        return res.status(200).send('tea data updated')
    }

}) 
