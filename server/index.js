const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const mysql = require("mysql");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'niyas',
    database: 'crud_contact'
  });
  
  db.connect();

const port=5000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


/*const sql = "INSERT INTO contact_db (name,email,contact) VALUES('randy','randy@gmail.com',08097778)";
db.query(sql,(err,result)=>{
    if(err) throw err;
    console.log(result);
    
});*/

app.get("/api/get",(req,res)=>{
    db.query("SELECT * FROM contact_db",(error,result)=>{
        if(error) throw error;
        res.send(result);
    })
});

app.get("/api/get/:id",(req,res)=>{
    const {id} = req.params;
    const sqlg="SELECT * FROM contact_db where id=?";
    db.query(sqlg,id,(error,result)=>{
        if(error) throw error;
        res.send(result);
    })
})

app.post("/api/post",(req,res)=>{
    const {name,email,contact} = req.body;
    const sqli="INSERT INTO contact_db (name,email,contact) VALUES (?,?,?)";
    db.query(sqli,[name,email,contact],(error,result)=>{
        if(error) {
            console.log(error);
        }
    });
});

app.delete("/api/remove/:id",(req,res)=>{
    const {id} = req.params;
    const sqlr="DELETE FROM contact_db WHERE id=?";
    db.query(sqlr,id,(error,result)=>{
        if(error) {
            console.log(error);
        }
    });
});

app.put("/api/update/:id",(req,res)=>{
    const {id} = req.params;
    const {name,email,contact} = req.body;
    const sqlu="UPDATE contact_db SET name=?, email=?, contact=? where id=?";
    db.query(sqlu,[name,email,contact,id],(error,result)=>{
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.get("/",(req,res)=>{
  
    res.send("hello");
})

app.listen(port,()=>{
    console.log(`server running on 5000`);
})
