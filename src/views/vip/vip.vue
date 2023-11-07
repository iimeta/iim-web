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
    <div class="table el-main scroller me-scrollbar me-scrollbar-thumb">
      <div class="theader">
        <div>会员等级</div>
        <div>模型权限</div>
        <div>免费额度(tokens)</div>
        <div class="mr20">权益说明</div>
      </div>

      <div class="row" v-for="item in items" :key="item.level">
        <div>{{ item.name }}</div>
        <div>
          <span class="models" v-for="item in item.models" :key="item">
            {{ item }}
          </span>
        </div>
        <div>{{ item.free_tokens }}</div>
        <div class="mr20">{{ item.remark || "-" }}</div>
      </div>
    </div>
  </section>
</template>

<style lang="less" scoped>
.table {
  width: 100%;

  .theader {
    width: 100%;
    border-bottom: 1px solid var(--border-color);
    font-size: 16px;
  }

  .row {
    border-bottom: 1px solid var(--border-color);
  }

  .theader,
  .row {
    display: flex;
    align-items: center;
    padding: 10px 0;

    > div {
      width: 100%;
      display: block;
      text-align: center;
    }

    .models {
      width: 150px;
      display: inline-block;
    }
  }
}
</style>
