/**
 * Created by rain on 2017/9/5.
 */
import RainElm from '@/rainElm';

const Msite = () => import('pages/msite/msite');
const Discover = () => import('pages/discover/discover');
const Order = () => import('pages/order/order');
const Profile = () => import('pages/profile/profile');
const Shop = () => import('pages/shop/shop');
const Login = () => import('pages/login/login');

export default [
    {
        path: '/',
        component: RainElm,
        redirect: '/msite',
        children: [
            {
                path: '/msite',
                component: Msite,
            },
            {
                path: '/discover',
                component: Discover,
            },
            {
                path: '/order',
                component: Order
            },
            {
                path: '/profile',
                component: Profile
            },
            {
                path: '/shop',
                component:Shop
            },
            {
                path: 'login',
                component: Login
            }
        ]
    }

]
