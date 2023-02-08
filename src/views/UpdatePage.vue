<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
let content = ref("");
let title = ref("");
const router = useRouter();
const props = defineProps({ id: String });
onMounted(async () => {
  await axios
    .get("http://112.220.234.180:18080/api/post/" + props.id)
    .then((res) => {
      title.value = res.data.title;
      content.value = res.data.content;
      console.log(res.data);
    })
    .catch((err) => {
      console.log("[추가 기존데이터 불러오기 에러] " + err);
    });
});
const backToHome = async () => {
  await router.push("/contents/" + props.id);
};
const writeContent = async () => {
  await axios
    .patch("http://112.220.234.180:18080/api/post/" + props.id, {
      title: title.value,
      content: content.value,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("[수정 에러] " + err);
    });
  backToHome();
};
</script>

<template>
  <button @click="backToHome">취소</button>
  <button @click="writeContent">수정</button>
  <form>
    <input type="text" placeholder="title" v-model="title" /><br />
    <textarea placeholder="content" v-model="content"> </textarea>
  </form>
</template>
