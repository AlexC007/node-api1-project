// implement your API here
 const express = require('express')

 // Bring in database
 const db = require('./data/db')

 //create server
 const server = express()

 //middleware
server.use(express.json())

//Post to /api/users

server.post('/api/users',(req,res)=>{
    const userBody = req.body;
    if(!userBody.name || !userBody.bio){
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    } else {
        db.insert(userBody)
        .then(user =>{
            res.status(201).json(user)
        })
        .catch(err=>{
            res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
        })

    }
})



// GET all users
server.get('/api/users', (req,res)=>{
    db.find()
    .then(data=>{
        res.json(data)
    })
    .catch(error =>{
        res.status(500).json({error:"The users information could not be retrieved."})
    })
})

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    db.findById(id)
         .then( 
            user => {
        if (!user){
            res.status(404).json({errorMessage: "The user with the specified ID does not exist."})
        } else{
          res.status(200).json(user);  
        }
    })
    .catch(error => {
        res.status(500).json({errorMessage: "The user information could not be retrieved."});
    });  
});

//Delete
server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    db.remove(id)
         .then( 
            user => {
        if (!user){
            res.status(404).json({errorMessage: "The user with the specified ID does not exist."})
        } else{
          res.status(200).json(user);  
        }
    })
    .catch(error => {
        res.status(500).json({errorMessage: "The user could not be removed"});
    });  
});

//Put
server.put('/api/users/:id', (req,res)=>{
    const {id}= req.params;
    const userBody= req.body;
    db.update(id,userBody)
    .then(user => {
        if (!user){
            res.status(404).json({errorMessage:"The user with the specified ID does not exist."})
        } else if (!userBody.name || !userBody.bio){
            res.status(400).json({errorMessage:"Please provide name and bio for the user." })
        } else {
           res.status(200).json(user); 
        }
    })
    .catch(error => {
        res.status(500).json({errorMessage:"The user information could not be modified."});
    });
})

//Listening for server
server.listen(5000, ()=>{
    console.log("Port 5000 open")
})