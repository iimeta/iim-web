<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ServeVips } from "@/api/vip";
import { clipboard } from "@/utils/common";

const router = useRouter();

const items = ref([]);

ServeVips({}).then((res) => {
  if (res.code == 200) {
    items.value = res.data.items || [];
  }
});
</script>

<template>
  <section class="el-container is-vertical height100">
    <div class="el-main scroller me-scrollbar me-scrollbar-thumb">
      <div class="header">IIM 您的专属助手</div>
      <div class="vip">
        <div
          class="vip-item"
          v-for="item in items"
          :key="item.level"
          :style="{ backgroundColor: item.color || '#303033' }"
        >
          <div class="name">{{ item.name }}</div>
          <div class="mt10">权益说明</div>
          <div class="mt10">{{ item.remark || "-" }}</div>
          <div class="mt10">满足免费额度 {{ item.free_tokens }}</div>
          <div class="mt10">
            <span>模型权限: </span>
            <span class="models" v-for="item in item.models" :key="item">
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="less" scoped>
.header {
  font-size: 30px;
  text-align: center;
  margin-top: 20px;
}
.vip {
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
  .vip-item {
    height: 260px;
    width: 360px;
    border-radius: 10px;
    margin-bottom: 20px;
    margin-left: 50px;
    padding: 20px;
    .name {
      font-size: 20px;
    }
  }
}
</style>
