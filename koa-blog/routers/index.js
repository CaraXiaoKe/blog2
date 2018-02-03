const Router = require('koa-router');
const pageController = require('../controllers/pageController');
const router = new Router();

router.get('/', pageController.getAll)
.get('/p/:id', pageController.getPage)
.get('/date/:id', pageController.getDate)
.get('/cate/:id',pageController.getCate).get('/cate/:id/p/:index', pageController.getCate)
.get('/sub/:id',pageController.getSub).get('/sub/:id/p/:index', pageController.getSub)
.get('/article/:id',pageController.getOne)
.get('/404', async ( ctx )=>{
	await ctx.render('404', {
    	title:"你访问的页面找不回来了"
  	})
});
module.exports = router;