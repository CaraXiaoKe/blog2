import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path:'/login',
            name:'login',
            component:()=>import('@/components/login')
        },
        {
            path: '/',
            component: Home,
            children:[
                {
                    path:'',
                    name:'article',
                    component:() => import('@/components/article/index')
                },
                {
                    path:'article/create',
                    name:'article/create',
                    component:() => import('@/components/article/create')
                },
                {
                    path:'article/:id/edit',
                    name:'article/edit',
                    component:() => import('@/components/article/edit')
                }
            ]
        }
    ]
})
