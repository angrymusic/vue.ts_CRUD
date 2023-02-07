import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../views/MainPage.vue";
import WritePage from "../views/WritePage.vue";
import UpdatePage from "../views/UpdatePage.vue";
import Detailpage from "../views/DetailPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: MainPage,
    },
    {
      path: "/write",
      name: "writePage",
      component: WritePage,
    },
    {
      path: "/update/:id",
      name: "updatePage",
      component: UpdatePage,
      props: true,
    },
    {
      path: "/contents/:id",
      name: "contentsPage",
      component: Detailpage,
      props: true,
    },
  ],
});

export default router;
