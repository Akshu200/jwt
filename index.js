const express =require('express');
const jwt = require('jsonwebtoken');
const app = express();
const secretKey = 'secretKey';

app.get('/', (req , resp )=>{

    resp.json({
        message:" sample test for jwt"
    })
})


app.post('/login' , (req, resp )=>{


    const user = {
        id:1,
        username:"akshay",

    }

    jwt.sign({user} , secretKey , {expiresIn:"500s"}, (err , token)=>{

        resp.json({
            token
        })
    })

    
})

app.post('/profile', verifytoken , (req, resp)=>{

    jwt.verify(req.token , secretKey , (err, authData)=>{

        if(err){
                resp.send({result : 'invalid token'});
        }
        else{

            resp.json({
                message:'success',
                authData
            })
        }

    })
})


function verifytoken(req, resp, next){

    const bearerHeaders = req.headers['authorization']
    if(typeof bearerHeaders !== 'undefined'){

        const bearer = bearerHeaders.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    }
    else{
        resp.json({
            message:'token is not valid'
        })
    }

}

app.listen(5000, ()=>{
    console.log('server is running at port 5000');
})