const Content = require('../../../models/content');

const writeOne = (req, res) => {
    const { title, text } = req.body;
    const name = req.decoded.name;

    const respond = () => {
        res.status(200).json({ message: '성공' }).end();
    }

    const onError = () => {
        res.status(409).json({ message: '실패' }).end();
    }

    Content.create(name, title, text)
    .then(respond)
    .catch(onError)
}

const remove = (req, res) => {
    const del = (content) => {
        content.remove();
        res.status(200).json({ message: '성공' }).end();
    }

    const onError = () => {
        res.status(404).json({ error: "error" }).end();
    }

    Content.findOneByid(req.params._id)
    .then(del)
    .catch(onError)
}

const readOne = (req, res) => {
    const showOne = (content) => {
        res.status(200).json(content).end();
    }

    const onError = () => {
        res.status(404).json({ error: "error" }).end();
    }

    Content.findOneByid(req.params._id)
    .then(showOne)
    .catch(onError)
}

const read = (req, res) => {
    const showAll = (content) => {
        res.status(200).json(content).end();
    }

    const onError = () => {
        res.status(404).json({ error: "error" }).end();
    }

    Content.findAll()
    .then(showAll)
    .catch(onError)
}

const change = (req, res) => {  
    const changeOne = (content) => {
        if (req.body.title) content.title = req.body.title;
        if (req.body.text) content.text = req.body.text;
        content.save((err) => {
            if(err) res.status(500).json({error: '수정 실패'}).end();
            res.status(200).json({message: '수정됨'}).end();
        });
    }

    const onError = () => {
        res.status(404).json({ message: "error" }).end();
    }

    Content.findOneByid(req.params._id)
    .then(changeOne)
    .catch(onError)
}

module.exports = {
    writeOne,
    readOne,
    read,
    remove,
    change,
}