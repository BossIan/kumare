const express = require("express")
const user = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.get("/",cors(),(req,res)=>{

})
app.post("/login",async(req, res)=>{
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const checkEmail = await user.findOne({email:email})
    const check = await user.findOne({email:email, password:password})
    console.log(checkEmail);
    
    try{
        if (req.body.googleLogin && check) {
            res.json("google loginn")
        }
        else if (req.body.googleLogin) {
            var newuser = new user(req.body)
            newuser.save()
            res.json("google signup")
        }
        else if(check){
            res.json("exist")
        }
        else if(await user.findOne({username:username, password:password})){
            res.json("existusername")
        }
        else{
            res.json("dontexist")
        }
    }
    catch(e){
        res.json("fail")
    }
})
app.post("/signup",async(req, res)=>{
    const username = req.body.username
    const email = req.body.email
    
    try{
        const checkEmail = await user.findOne({email:email})

        if (req.body.password == "." && checkEmail) {
            res.json("existsgoogle")
        } else if (req.body.googleLogin) {
            var newuser = new user(req.body)
            newuser.save()
            res.json("google signup")
        }
        else if(checkEmail){
            res.json("exist")
        }
        else if(await user.findOne({username:username})){
            res.json("existusername")
        }
        else{
            var newuser = new user(req.body)
            newuser.save()
            res.json("dontexist")
        }
    }
    catch(e){
        console.log(e);
        
        res.json("fail")
    }
})

app.listen(8000,()=>{
    console.log("port connected");
})