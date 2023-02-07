<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
const props = defineProps({
  id: Number,
  name: String,
  title: String,
  content: String,
  dateTime: String,
});
const emit = defineEmits(["checkRow", "unCheckRow"]);
const isChecked = ref(false);
const newDateForm = ref("");
const checkRow = (id: number | undefined) => {
  if (!isChecked.value) {
    emit("checkRow", id);
    isChecked.value = true;
  } else {
    emit("unCheckRow", id);
    isChecked.value = false;
  }
};
onBeforeMount(() => {
  let time = new Date(String(props.dateTime));
  //new Date 하지 않으면 함수 사용 불가
  newDateForm.value =
    time.getFullYear() +
    "년 " +
    time.getMonth() +
    1 +
    "월 " +
    time.getDate() +
    "일 " +
    time.getHours() +
    "시 " +
    time.getMinutes() +
    "분 " +
    time.getSeconds() +
    "초";
});
</script>
<template>
  <tr v-bind:class="{ isChecked: isChecked }">
    <td><button @click="checkRow(id)">선택</button></td>
    <td>{{ id }}</td>
    <!-- <td>{{ name }}</td> -->
    <td>
      <RouterLink :to="{ path: `/contents/${props.id}` }">{{
        title
      }}</RouterLink>
    </td>
    <td>
      <RouterLink :to="{ path: `/contents/${props.id}` }">{{
        content
      }}</RouterLink>
    </td>
    <td>
      {{ newDateForm }}
    </td>
  </tr>
</template>

<style>
.isChecked {
  background-color: yellow;
}
</style>
