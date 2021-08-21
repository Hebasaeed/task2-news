const express = require('express')
const app = express()
const port = 3000
const request=require('request')
 const path=require('path')//built in express
const publicdiraction=path.join(__dirname,'../public')
app.use(express.static(publicdiraction))
//app.get('/',(req,res)=>{res.send('hhhhhh')})//run from app.js
 const hbs=require('hbs')
app.set('view engine','hbs')
const viewspath=path.join(__dirname,'../tamplet/views')
app.set('views',viewspath)
// ////////////////////////////////////////

const pathpartial=path.join(__dirname,'../tamplet/partial')
hbs.registerPartials(pathpartial)


 /////////////////////////////////////////////////////////
 app.get('',(req,res)=>{
 const urlk=' https://newsapi.org/v2/top-headlines?country=eg&category=entertainment&apiKey=8ea74b4348f6454e9fd0f24aea1a5930'
     request({url:urlk,json:true},(error,response)=>{
        if(error){
           return res.send('unable to conect with data')
        }else if(response.body.message){
          return  res.send('your apikey is invalid   or incorrect',undefined )
        }else if(response.body.articles==0)
        return res.send('invalid category or country',undefined)
        else{
          data=response.body.articles
          //res.send('error',error)
           //res.send('data',data)
            res.render('index',{
              data:data,
              title1:'NEWS Page',
              title2:'Entertainmemts Partment',
              myname:'HEBA SAEED'
            })
        }
      })
     
     })
    



app.get('*',(req,res)=>{
  res.render('404page',{
    title:'404 page',
    msg:'404 page not found'})
})





app.listen(port,() => {
  console.log('server is running')
})