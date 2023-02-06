<script setup lang="ts">
import { ref } from "vue";
defineProps({
  id: Number,
  name: String,
  title: String,
  content: String,
  dateTime: Array,
});
const emit = defineEmits(["checkRow", "unCheckRow"]);
const isChecked = ref(false);
const checkRow = (id: number) => {
  if (!isChecked.value) {
    emit("checkRow", id);
    isChecked.value = true;
  } else {
    emit("unCheckRow", id);
    isChecked.value = false;
  }
};
</script>
<template>
  <tr v-bind:class="{ isChecked: isChecked }">
    <td><button @click="checkRow(id)">선택</button></td>
    <td>{{ id }}</td>
    <td>{{ name }}</td>
    <td>{{ title }}</td>
    <td>{{ content }}</td>
    <td v-if="dateTime">
      {{ dateTime[0] }}년 {{ dateTime[1] }}월 {{ dateTime[2] }}일
      {{ dateTime[3] }}시 {{ dateTime[4] }}분 {{ dateTime[5] }}초
    </td>
  </tr>
</template>

<style>
.isChecked {
  background-color: yellow;
}
</style>
