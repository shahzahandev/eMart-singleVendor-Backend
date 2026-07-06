const jwt = require('jsonwebtoken');

exports.tokenGenaretor = (data, secret, expire) => {

    let token = jwt.sign({
        data
    }, secret,
        { expiresIn: expire }
    )
    return token;
}