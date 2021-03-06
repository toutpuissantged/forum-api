const json = require('body-parser/lib/types/json');
const cors=require('cors')
var express = require('express');
var router = express.Router();
const dbschema=require('../data/dbschema.js')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/base.db');
const reqmake=require('../helpers/reqmaker')


router.get("/post/details/:id",cors(),(req,res) => {
    let postid=String()
    let dbresult=''
    postid = parseInt(req.params.id)
    const query='SELECT * FROM postinfo WHERE postid='+postid+' '
    db.each(query, function(err, row) {
        const testmeme=row
        if (err) console.log(err)
        res.json(JSON.stringify(testmeme))

    });
    //res.send('error!!!')
})

router.get("/post/all",cors(),(req,res) => {
    const query='SELECT * FROM postinfo '
    db.all(query, function(err, row) {
        const testmeme = row
        if (err) {
            console.log(err)
            res.send('500')
            return 0
        }
        res.json(JSON.stringify(testmeme)) 
        

    });
    //res.send('error!!!')
})

router.get("/post/details/adcomment/id/:id/name/:name/email/:email/website/:website/post/:post",cors(),(req,res) => {
    console.log(req.params)
    const params=req.params
    let postid = parseInt(req.params.id)
    let resdata=''
    const query='SELECT comments FROM postinfo WHERE postid="'+postid+'" '
    db.each(query, function(err, row) {
        const testmeme=row.comments
        let comments=JSON.parse(testmeme)
        const date= new Date()
        const dateparsed=date.getTime()
        const newcomments={
            CommentId: 0, //comments[comments.lenght-1].CommentId+1,
            name: params.name,
            userId: 0,
            image: 'images.png',
            date: dateparsed,
            msg: params.post,
            email:params.email,
            website:params.website,
        }
        comments.push(newcomments)
        if (err) console.log(err)
        //res.json(JSON.stringify(testmeme))
        console.log(JSON.stringify(comments));
        resdata=JSON.stringify(comments)
        let query2 = 'UPDATE postinfo SET comments = ? WHERE postid = ?'
        let query_data=[resdata,postid]
        db.run(query2,query_data,(err)=>{
            if (err) {
                return console.error(err.message);
              }
              console.log('Row(s) updated');
        })

    });
    res.send('200')
})

router.get("/post/ask/title/:title/name/:name/email/:email/post/:post",cors(),(req,res) => {
    console.log(req.params)
    const params=req.params
    const date= new Date()
    let autor={
        name:params.name,
        userId:0,
        email:params.email,
    }
    autor=JSON.stringify(autor)
    const dateparsed=date.getTime() 
    //console.log(date.toString(dateparsed));
    const dataformated=date.toString(dateparsed)
    let sql = 'INSERT INTO postinfo(title,content,createddate,lastupdate,comments,autor) VALUES (?,?,?,?,?,?)';
    let query_data=[params.title,params.post,dataformated,dataformated,'[]',autor]
    db.run(sql,query_data,(err)=>{
        if (err) {
            return console.error(err.message);
            }
            console.log('Row(s) updated');
    })
    res.send('200') 
    console.log('completed!!!');
})

module.exports = router;