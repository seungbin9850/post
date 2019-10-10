const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

const register =  (req, res) => {
    const { name, username, password } = req.body;

    const create = (user) => {
        if (user) {
            throw new Error('이미 있는 아이디');
        } else {
            return User.create(name, username, password);
        }
    }

    const respond = () => {
        res.status(200).json({ message: '회원가입 성공' }).end();
    }

    const onError = (error) => {
        res.status(409).json({ message: error.message }).end();
    }

    User.findOneByUsername(username)
    .then(create)
    .then(respond)
    .catch(onError)
}

const login = (req, res) => {
    const { username, password } = req.body;
    const secret = req.app.get('jwt-secret');

    const check = (user) => {
        if (!user) {
            throw new Error('로그인 실패');
        } else {
            if (user.verify(password)) {
                const p = new Promise((resolve, reject) => {
                    jwt.sign({
                        _id: user._id,
                        name: user.name,
                        username: user.username,
                    },
                    secret,
                    {
                        expiresIn: '12h',
                    }, (err, token) => {
                        if (err) reject(err);
                        resolve(token);
                    });
                });
                return p;
            } else {
                throw new Error('로그인 실패');
            }
        }
    }
    const respond = (token) => {
        res.status(200).json({
            message: '로그인 성공',
            token,
        }).end();
    }

    const onError = (error) => {
        res.status(403).json({
            message: error.message,
        }).end();
    }

    User.findOneByUsername(username)
    .then(check)
    .then(respond)
    .catch(onError);
}

module.exports = {
    register,
    login,
}