import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../views/MainPage.vue";
import WritePage from "../views/WritePage.vue";
import UpdatePage from "../views/UpdatePage.vue";

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
  ],
});

export default router;
