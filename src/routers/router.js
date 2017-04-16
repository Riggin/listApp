import VueRouter from 'vue-router'

// var config = require('../../config');
// var rootPath=config.build.assetsPublicPath;
var rootPath="/";


/** -------------------------------------------------- 懒加载start --------------------------------------------*/
const Index = resolve => require(['../app/Index'], resolve)
const Nearby = resolve => require(['../app/Nearby'], resolve)
const Square = resolve => require(['../app/Square'], resolve)
const UserCenter = resolve => require(['../app/UserCenter'], resolve)
const City = resolve => require(['../app/City'], resolve)
const Search = resolve => require(['../app/Search'], resolve)


// const Shake = resolve => require(['../demos/Shake'], resolve)
// const XImg = resolve => require(['../demos/XImg'], resolve)


/** -------------------------------------------------- 懒加载end --------------------------------------------*/

const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    //路由映射map
    routes: [

        { path: rootPath, component: Index, meta: { scrollToTop: true }, name: 'home' },
        { path: rootPath + 'nearby', component: Nearby, meta: { scrollToTop: true }, name: 'nearby' },
        { path: rootPath + 'square', component: Square, meta: { scrollToTop: true }, name: 'square' },
        { path: rootPath + 'userCenter', component: UserCenter, meta: { scrollToTop: true }, name: 'userCenter' },
        { path: rootPath + 'city', component: City, meta: { scrollToTop: true }, name: 'City' },
        { path: rootPath + 'search', component: Search, meta: { scrollToTop: true }, name: 'Search' },
        //找不到页面就返回404页面
        {
            path: '*',
            component: { template: '<p style="height:300px;text-align:center">404</p>' }
        }
    ]
});


// // 跳转前的逻辑
// router.beforeEach((to, from, next) => {

//     console.log('before---------------');

//     console.log(to.auth);
//     next()
// })

// window.routeList = [];

// // 跳转后的逻辑
// router.afterEach(function(transition) {
//     console.log('-----------------after');
//     for (var i = 0; i < routeList.length; i++) {
//         console.log(routeList[i].name);
//     };
// });


export default router
