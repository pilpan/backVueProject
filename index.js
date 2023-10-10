const express = require('express')
const app = express()
const PORT = 3004;
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('postPoject')
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(bodyParser.json())

app.get('/allUsers',(req,res)=>{
    db.all("SELECT id,name FROM users",(err, data)=>{
        res.json(data)
    })
})


app.get('/allPosts', (req,res)=>{
    db.all("SELECT id,user_id,text,name FROM posts JOIN users ON users.id=posts.user_id",(err, data)=>{
        res.json(data)
    })
})

app.post('/checkUser', (req,res)=>{
    const {name,password} = req.body
    db.get(`SELECT * FROM users WHERE name='${name}'`,(err,data)=>{
        if(data && bcrypt.compareSync(password,data.password)){
            return res.json({id:data.id, name: data.name})
        }
        return res.sendStatus(401)
    })
})

app.post('/newUser',(req,res)=>{
    const {name,password} = req.body
    const hash = bcrypt.hashSync(password,saltRounds)
    db.run(`INSERT INTO users (name,password) VALUES('${name}','${hash}')`)
    db.get(`SELECT id,name FROM users WHERE name='${name}'`,(err,data)=>{
        res.json(data)
    })
})

app.delete('/deleteUser', (req,res)=>{
    const {id} = req.body
    db.run(`DELETE FROM users WHERE id=${id}`)
    res.sendStatus(200)
})

app.put('/updateUser', (req,res)=>{
    const {name,id} = req.body
    db.run(`UPDATE users SET name = '${name}' WHERE id = ${id}`)
    db.get(`SELECT id,name FROM users WHERE id=${id}`,(err,data)=>{
        res.json(data)
    })

})

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`)
})