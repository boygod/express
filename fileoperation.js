const fs=require("fs");

exports.readFile=function(callback){
    fs.readFile("./commonData.json",(err,data)=>{
        if(err){
            return callback(null)
        }
        callback(JSON.parse(data.toString()));
    })
}

exports.writeFile=function(datas,callback){
    fs.readFile("./commonData.json",(err,data)=>{
        if(err){
            return callback(null)
        }
        let dataArr=JSON.parse(data.toString())
        dataArr.push(datas)
        fs.writeFile("./commonData.json",JSON.stringify((dataArr),null,2),(err)=>{
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}