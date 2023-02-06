<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
let name = ref("");
let title = ref("");
let content = ref("");

const writeContent = async () => {
  await axios
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
  <button><RouterLink to="/">취소</RouterLink></button>
  <button @click="writeContent"><RouterLink to="/">작성</RouterLink></button>
  <form>
    <input type="text" v-model="name" placeholder="name" /><br />
    <input type="text" v-model="title" placeholder="title" /><br />
    <textarea v-model="content" placeholder="content"> </textarea>
  </form>
</template>
