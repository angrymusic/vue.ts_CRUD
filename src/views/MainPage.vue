<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import TableContent from "../components/TableContent.vue";
import axios from "axios";
import { RouterLink } from "vue-router";

interface dataType {
  id: number;
  name: string;
  title: string;
  content: string;
  dateTime: string;
}

const tableElements = ref<dataType[]>([]);
const checkedRows = ref<number[]>([]);
const updateRow = computed(() =>
  checkedRows.value.length === 0 ? 0 : checkedRows.value[0]
);

const refreshTable = async () => {
  //   tableElements.value = [];
  await axios
    .get<dataType[]>("http://112.220.234.180:18080/api/post/list")
    .then((res) => {
      //   for (let i = 0; i < res.data.length; i++) {
      //     let info = res.data[i];
      //     tableElements.value.push({
      //       id: info.id,
      //       name: info.name,
      //       title: info.title,
      //       content: info.content,
      //       dateTime: info.dateTime,
      //     });
      //   }
      tableElements.value = res.data;
    })
    .catch((err) => {
      console.log("[조회 에러] " + err);
    });
};

const checkRow = (id: number) => {
  console.log("check");
  checkedRows.value.push(id);
};
const unCheckRow = (id: number) => {
  console.log("uncheck");
  checkedRows.value = checkedRows.value.filter((n) => n !== id);

  // for (let i = 0; i < checkedRows.value.length; i++) {
  //   if (checkedRows.value[i] === id) {
  //     checkedRows.value.splice(i, 1);
  //   }
  // }

  console.log(updateRow.value);
};
const deleteRow = async () => {
  //promise
  // await Promise.all
  const deleteList: Promise<void>[] = [];

  for (let i = 0; i < checkedRows.value.length; i++) {
    console.log(checkedRows.value[i]);
    deleteList.push(
      axios.delete(
        "http://112.220.234.180:18080/api/post/" + checkedRows.value[i]
      )
      // .then((res) => {
      //   console.log(res);
      // })
      // .catch((err) => {
      //   console.log("[선택 삭제 에러] " + err);
      // })
    );
  }
  const response = await Promise.all(deleteList);
  console.log(response);
  refreshTable();
};

const deleteAll = () => {
  axios
    .delete("http://112.220.234.180:18080/api/post/all")
    .then((res) => {})
    .catch((err) => {
      console.log("[전체 삭제 에러] " + err);
    });
};

onMounted(async () => {
  await refreshTable();
});
</script>

<template>
  <button @click="refreshTable">조회</button>
  <RouterLink to="/write"><button>추가</button></RouterLink>
  <button @click="deleteRow">삭제</button>
  <RouterLink v-if="updateRow !== 0" :to="{ path: `/update/${updateRow}` }"
    ><button>수정</button></RouterLink
  >
  <button @click="deleteAll">전체삭제</button>
  <table>
    <tr>
      <td>check</td>
      <td>id</td>
      <!-- <td>name</td> -->
      <td>title</td>
      <td>content</td>
      <td>dateTime</td>
    </tr>
    <TableContent
      @checkRow="checkRow"
      @unCheckRow="unCheckRow"
      v-for="item in tableElements"
      :key="item.id"
      v-bind:id="item.id"
      v-bind:name="item.name"
      v-bind:title="item.title"
      v-bind:content="item.content"
      v-bind:dateTime="item.dateTime"
    ></TableContent>
  </table>
</template>
<style>
td {
  border: 1px solid black;
  padding: 0px 10px 0px 10px;
}
table {
  border: 1px solid black;
}
</style>
