<script setup lang="ts">
import { ref } from "vue";
import TableContent from "../components/TableContent.vue";
import axios from "axios";
import { RouterLink } from "vue-router";

interface dataType {
  id: number;
  name: string;
  title: string;
  content: string;
  dateTime: [];
}

const tableElements = ref<dataType[]>([]);
const checkedRows = ref<number[]>([]);
const updateRow = ref<number>(0);

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

  if (checkedRows.value.length !== 0) {
    //처음 선택된 row가 수정할 row
    updateRow.value = checkedRows.value[0];
  } else {
    updateRow.value = 0;
  }
  console.log(updateRow.value);
};
const unCheckRow = (id: number) => {
  console.log("uncheck");
  for (let i = 0; i < checkedRows.value.length; i++) {
    if (checkedRows.value[i] === id) {
      checkedRows.value.splice(i, 1);
    }
  }
  if (checkedRows.value.length !== 0) {
    //처음 선택된 row가 수정할 row
    updateRow.value = checkedRows.value[0];
  } else {
    updateRow.value = 0;
  }
  console.log(updateRow.value);
};
const deleteRow = async () => { //promise
  for (let i = 0; i < checkedRows.value.length; i++) {
    await axios
      .delete("http://112.220.234.180:18080/api/post/" + checkedRows.value[i])
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("[선택 삭제 에러] " + err);
      });
  }
  refreshTable();
};

const deleteAll = async () => {
  await axios
    .delete("http://112.220.234.180:18080/api/post/all")
    .then((res) => {})
    .catch((err) => {
      console.log("[전체 삭제 에러] " + err);
    });
};

refreshTable();
</script>

<template>
  <button @click="refreshTable">조회</button>
  <button><RouterLink to="/write">추가</RouterLink></button>
  <button @click="deleteRow">삭제</button>
  <button>
    <RouterLink :to="{ path: `/update/${updateRow}` }">수정</RouterLink>
  </button>
  <button @click="deleteAll">전체삭제</button>
  <table>
    <tr>
      <td>check</td>
      <td>id</td>
      <td>name</td>
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
  <RouterView></RouterView>
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
