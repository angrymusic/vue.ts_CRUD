<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
let title = ref("");
let content = ref("");

const props = defineProps({ id: String });
onMounted(() => {
  axios
    .get("http://112.220.234.180:18080/api/post/" + props.id)
    .then((res) => {
      title.value = res.data.title;
      content.value = res.data.content;
    })
    .catch((err) => {
      console.log("[디테일 내용 불러오기 에러] " + err);
    });
});

const deleteRow = () => {
  axios
    .delete("http://112.220.234.180:18080/api/post/" + props.id)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("[삭제 에러] " + err);
    });
};
</script>

<template>
  <RouterLink :to="{ path: `/update/${id}` }"><button>수정</button></RouterLink>
  <RouterLink to="/"><button @click="deleteRow">삭제</button></RouterLink>
  <RouterLink to="/"><button>돌아가기</button></RouterLink>
  <br />
  <div>
    <br />
    <div>제목</div>
    <div class="text-box">{{ title }}</div>
    <br />
    <div>내용</div>
    <div class="text-box">{{ content }}</div>
  </div>
</template>

<style>
.text-box {
  width: 30vw;
  padding: 10px;
  border: black 2px solid;
}
</style>
