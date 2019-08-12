const express=require('express')
const cors=require('cors')
const app=express()
const port = 3006
var Negotiator = require('negotiator')
const {mongoose}=require('./config/database')

// 1st appoach
const router=require('./config/route')
//2nd approach
const categoriesRouter=require('./app/controllers/categoriesController')
const tagRouter=require('./app/controllers/tagController')
const {usersRouter}=require('./app/controllers/usersController')

app.use(express.json())
app.use(cors())   
app.use('/', router)
app.use('/users', usersRouter)
app.use('/tags',tagRouter) //1st approach map here
app.use('/categories',categoriesRouter) //2nd approach map up here
app.use('/categories/:id',categoriesRouter)

app.get('/', (req, res) => {
    res.send('welcome to my note taking app')
})

app.listen(port,()=>{
    console.log('listening to port',port)
})