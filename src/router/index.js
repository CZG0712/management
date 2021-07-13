import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Welcome from "../components/Welcome.vue";
import User from "../components/user/Users.vue";
import Person from "../components/Personal.vue";
import Service from "../components/onlineserve/Service.vue";
import Message from "../components/Message/Message.vue";
import TopMenu from "../components/contentManagement/topMenu.vue";
import News from "../components/contentManagement/news.vue";
import Slidder from "../components/contentManagement/slidder.vue";
import Manager from "../components/user/Manager.vue";

//导入全局样式表
import "../assets/css/global.css";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  { path: "/login", component: Login },
  {
    path: "/home",
    redirect: "/welcome",
    component: Home,
    children: [
      { path: "/welcome", component: Welcome },
      { path: "/person", component: Person },
      { path: "/users", component: User },
      { path: "/manager", component: Manager },
      { path: "/service", component: Service },
      { path: "/message", component: Message },
      { path: "/topmenu", component: TopMenu },
      { path: "/news", component: News },
      { path: "/slidder", component: Slidder },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
