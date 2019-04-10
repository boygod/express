const express=require("express")

const expressArtTemplate=require('express-art-template')

const fileOperatiron=require("./fileoperation")

const bodyParser = require('body-parser')

const app=express()

//加载模板引擎
app.engine('html', expressArtTemplate);
//开发静态资源
app.use('/node_modules', express.static('./node_modules'));
app.use('/public', express.static('./public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get("/",(req,res)=>{
    fileOperatiron.readFile((data)=>{
        if(data){
            res.render('index.html',{
                data
            })
        }else{
            return console.log("读取失败")
        }
    })

})

app.get("/fabiao",(req,res)=>{
    res.render('post.html')
})

app.post("/fabiao",(req,res)=>{
    console.log(req.body)
    const body=req.body;
    if(!body.content||!body.name.length){
        res.send("不能不打字")
    }
    fileOperatiron.writeFile(body,err=>{
        if(err){
            return res.send("500 server error")
        }
        res.redirect("/")
    })
})




app.listen("8000",()=>{
    console.log("监听成功.....")
})