
const jwt = require('jsonwebtoken')


const auth = async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];

        if(!token){
            res.send('login first ')
        }
        else 
        {
            const decoded = await jwt.verify(token,'secret')
                  
            console.log(decoded)
            req.user = decoded.user;
            req.name=decoded.name

            next()
        }
    } catch (error) {
        res.send({
            middleware:error
        })
    }
}

module.exports = auth;