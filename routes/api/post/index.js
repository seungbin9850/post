const router = require('express').Router();
const controller = require('./post.controller');
const authMiddleware = require('../../../middlewares/auth');

router.post('/create', authMiddleware, controller.writeOne);
router.get('/read', controller.read);
router.get('/readone/:_id', controller.readOne);
router.delete('/remove/:_id', authMiddleware, controller.remove);
router.put('/update/:_id', authMiddleware, controller.change);

module.exports = router;