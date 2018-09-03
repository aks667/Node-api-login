const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, config.JWT_KEY);
        req.userData = decoded;
        if(req.userData.imei === req.headers.imei)
            next();
        else
        {
            return res.status(401).json({
                message : 'Auth Failed!',
                error : "Duplicate Login"
            })
        }
    }
    catch(e)
    {
        return res.status(401).json({
            message: 'Auth Failed!'
            
        });
    }
};