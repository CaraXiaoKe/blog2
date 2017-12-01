// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from './scripts/http'
import Components from './scripts/components'
import store from './scripts/store.js'
window.store = store
Vue.use(Components)
Vue.use(http)
router.beforeEach((to,from,next)=>{
    if(to.name!=='login'){
        let _id = store.get('user')._id;
        Vue.axios().get(`/api/v1/admin_users/${_id}`);
    };
    next();

});
Vue.config.productionTip = false

/* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
