<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
let name = ref("");
let title = ref("");
let content = ref("");

const writeContent = () => {
  axios
    .post("http://112.220.234.180:18080/api/post", {
      name: name.value,
      title: title.value,
      content: content.value,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("[추가 에러] " + err);
    });
};
</script>

<template>
  <RouterLink to="/"><button>취소</button></RouterLink>
  <RouterLink to="/"><button @click="writeContent">작성</button></RouterLink>
  <form>
    <input type="text" v-model="name" placeholder="name" /><br />
    <input type="text" v-model="title" placeholder="title" /><br />
    <textarea v-model="content" placeholder="content"> </textarea>
  </form>
</template>
