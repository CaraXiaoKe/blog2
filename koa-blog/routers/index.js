const Router = require('koa-router');
const pageController = require('../controllers/pageController');
const router = new Router();

router.get('/', pageController.getAll).get('/p/:id', pageController.getPage).get('/date/:id', pageController.getDate).get('/article/:id',pageController.getOne).get('/404', async ( ctx )=>{
	await ctx.render('404', {
    	title:"你访问的页面找不回来了"
  	})
});
module.exports = router;