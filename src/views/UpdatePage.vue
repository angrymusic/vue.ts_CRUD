<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
let content = ref("");
let beforeTitle = ref("");
let beforeContent = ref("");

const props = defineProps({ id: String });
console.log(props.id);
axios
  .get("http://112.220.234.180:18080/api/post/" + props.id)
  .then((res) => {
    beforeTitle.value = res.data.title;
    beforeContent.value = res.data.content;
    console.log(res.data);
  })
  .catch((err) => {
    console.log("[추가 기존데이터 불러오기 에러] " + err);
  });
const writeContent = async (id: string | undefined) => {
  console.log(id);
  await axios
    .put("http://112.220.234.180:18080/api/post/" + id, {
      id: id,
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
  <button @click="writeContent(props.id)">
    <RouterLink to="/">수정</RouterLink>
  </button>
  <form>
    <input type="text" placeholder="title" v-model="beforeTitle" /><br />
    <textarea placeholder="content" v-model="beforeContent"> </textarea>
  </form>
</template>
