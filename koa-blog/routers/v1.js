const Router = require('koa-router');

const loginController = require('../controllers/userController');
const articleController = require('../controllers/articleController');

const qiniu = require('../middlewares/qiniu');
const can = require('../middlewares/can');
const dict = require('../config/dict');

const router = new Router({
	prefix:'/v1'
});
router.post('/register',loginController.register); 
router.post('/login',loginController.login);
router.get('/admin_users/:id',can(),loginController.getUserInfo);

router.post('/articles',can(),articleController.create);
router.post('/articles/:id',articleController.updateOne);
router.get('/articles',articleController.getAll);
router.get('/articles/:id',articleController.getOne);
router.get('/dict/:key',async (ctx) =>{
	ctx.body = dict[ctx.params.key];
});
router.post('/upload',...qiniu);
module.exports = router;