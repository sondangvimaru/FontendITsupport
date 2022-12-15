import { createRouter,createWebHistory } from "vue-router";
import Homeuser from "@/components/User/homeforuser.vue";
import requestPage from '../components/User/requestPage.vue'
import findRequestpage from '../components/User/findRequestpage.vue';

import GoogleLogin from "../components/GoogleLogin.vue";
import Manager from "../components/Manager/homeformanager.vue";
const routes =[
    {
        path: '/',
        component: GoogleLogin
    },
    {
        path: '/homeuser',
        component: Homeuser
    },
    {
        path: '/requestform',
        component: requestPage
    },
    {
        path: '/findrequest',
        component: findRequestpage
    },
    {
        path:'/management',
        component:Manager
    }
]

const router=createRouter({
    history: createWebHistory(),
    routes,

})

export default router