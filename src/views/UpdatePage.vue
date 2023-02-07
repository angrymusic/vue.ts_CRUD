<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
let content = ref("");
let beforeTitle = ref("");
let beforeContent = ref("");

const props = defineProps({ id: String });
onMounted(() => {
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
});

const writeContent = (id: string | undefined) => {
  console.log(id);
  axios
    .put("http://112.220.234.180:18080/api/post/" + id, {
      id: id,
      content: content.value,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("[수정 에러] " + err);
    });
};
</script>

<template>
  <RouterLink :to="{ path: `/contents/${props.id}` }"
    ><button>취소</button></RouterLink
  >
  <RouterLink :to="{ path: `/contents/${props.id}` }"
    ><button @click="writeContent(props.id)">수정</button></RouterLink
  >
  <form>
    <input type="text" placeholder="title" v-model="beforeTitle" /><br />
    <textarea placeholder="content" v-model="beforeContent"> </textarea>
  </form>
</template>
