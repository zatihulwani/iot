import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import AdminPanel from './views/Admin.vue';
import Error404 from './views/404.vue';
import Setting from './views/Setting.vue';
// import Field from './views/Field.vue';

Vue.use(Router);

let instanceRouter = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        guest: true
      }
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/Login.vue'),
      meta: {
        guest: false
      }
    },
    {
      path: '/user',
      name: 'user',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/User.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPanel,
      meta: {
        requiresAuth: true,
        isAdmin: true
      }
    },
    {
      path: '/field',
      name: 'field',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/Field.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting,
      //check per route
      beforeEnter(to, from, next) {
        var dpt = getProfile();
        if (dpt == null) {
          next('/login');
        } else {
          if (dpt.role.id == 1) {
            next(vm => {
              vm.tampilkanAlertDariRoute('ini dari router');
            });
          } else {
            next({
              name: 'login'
            });
          }
        }
      }
    },
    {
      path: '*',
      name: 'notfound',
      component: Error404
    }
  ]
});

function getToken() {
  if (localStorage.getItem('token') == null) {
    return null;
  } else {
    return JSON.parse(localStorage.getItem('token'));
  }
}

function getProfile() {
  return JSON.parse(localStorage.getItem('profile'));
}
function getField() {
  return JSON.parse(localStorage.getItem('field'));
}

//check global
//navigation guard, check before entering route
instanceRouter.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (getToken() == null) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
      console.log('saved redirect = ', to.fullPath);
    } else {
      let user = getProfile();
      if (to.matched.some(record => record.meta.isAdmin)) {
        if (user.role.id == 1) {
          next();
        } else {
          next({
            name: 'user'
          });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (getToken() == null) {
      next();
    } else {
      next({
        name: 'user'
      });
    }
  } else {
    next();
  }
});

export default instanceRouter;
