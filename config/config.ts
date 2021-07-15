// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    // default en-US
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user/login',
              name: 'login',
              component: './User/login',
            },
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/dashboard',
          component: '../layouts/DashboardLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/dashboard',
              redirect: '/dashboard/categories',
            },
            {
              path: '/dashboard/categories',
              name: 'CategoryManagement',
              icon: 'dashboard',
              component: './categories',
            },
            {
              path: '/dashboard/coupons',
              name: 'CouponManagement',
              icon: 'dashboard',
              routes: [ {
                path: '/dashboard/coupons',
                name: 'Coupon List',
                icon: 'dashboard',
                component: './coupons',
                hideInMenu: true,
              }, {         
                  path: '/dashboard/coupons/create',
                  name: 'Create Coupon',
                  icon: 'dashboard',
                  component: './coupons/create',
                  hideInMenu: true,
                },
                {         
                  path: '/dashboard/coupons/:id',
                  name: 'Update Coupon',
                  icon: 'dashboard',
                  component: './coupons/update',
                  hideInMenu: true,
                },
              ]
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [{
            path: '/',
            name: 'home',
            component: './home',
          },{
            path: '/coupons',
            name: 'Coupons',
            component: './coupons/card-list',
          },{
            path: '/coupons/:id',
            name: 'Coupons',
            component: './coupons/detail',
            hideInMenu: true,
          }, {
            component: '404',
          },]
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  esbuild: {},
});
