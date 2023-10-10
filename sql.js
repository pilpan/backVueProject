const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('postPoject')

db.serialize(()=>{


    // sql для создания таблиц с autoIncrement
    // db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT)")
    // db.run("CREATE TABLE posts (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id NUMBER, text TEXT,FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE)")


    // добавляем данные в таблицу users
    // db.run("INSERT INTO users (name,password) VALUES('sasha','333')")
    // db.run("INSERT INTO posts (user_id,text) VALUES(2,'Хорошая погода сегодня')")

    // ищем данные из таблицы
    db.all("SELECT * FROM posts", (err,data)=>{
        console.log(data)
    })

})