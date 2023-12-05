const express=require('express');
const fs=require('fs');





const bodyparser=require('body-parser');

const chatapp=express();

chatapp.use(bodyparser.urlencoded({extended:false}));



chatapp.get('/',(req,res,next)=>{

    fs.readFile('message.txt',(err,data)=>{
         if(err){
            console.log(err);
            data="no chat exits";
         }  
         res.send(`${data}<form onsubmit="document.getElementById('username').value=localStorage.getItem('username')" action="/" method="POST">

         <input id="message" type="text" name="message">
     
         <input id="username" type="hidden" name="username">
     
         <button type="submit">submit</button>
     
     </form>`)

    })
  

})

chatapp.post('/',(req,res,next)=>{
      console.log(req.body.username)
      console.log(req.body.message)

      fs.writeFile('message.txt',`${req.body.username}:${req.body.message}`,{flag:'a'},(err)=>{
        if(err){
            console.log(err)
        }
        res.redirect('/')
      })
})


chatapp.get('/login',(req,res,next)=>{
           
    res.send(`<form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/" method="POST">

	<input id="username" type="text" name="title" placeholder="message">

	<button type="submit">add</button>

</form>`);
           

            
    
})







chatapp.listen(3000);
