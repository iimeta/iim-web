<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ServeInviteFriends } from "@/api/vip";
import { clipboard } from "@/utils/common";

const router = useRouter();

const inviteFriends = reactive({
  invite_url: "",
  items: ref([]),
});

ServeInviteFriends({}).then((res) => {
  if (res.code == 200) {
    inviteFriends.invite_url = res.data.invite_url;
    inviteFriends.items = res.data.items || [];

    let baseURL = import.meta.env.VITE_BASE_API;
    if (baseURL == "") {
      const url = new URL(window.location.href);
      baseURL = `${url.protocol}//${url.hostname}:${
        url.port || (url.protocol == "https:" ? 443 : 80)
      }`;
    }
    inviteFriends.invite_url = baseURL + inviteFriends.invite_url;
  }
});

// 复制邀请链接
const onCopy = () => {
  return clipboard(inviteFriends.invite_url, () =>
    window["$message"].success("已复制")
  );
};
</script>

<template>
  <section class="el-container is-vertical height100">
    <div class="invite">
      <span class="inviteUrl">邀请链接: {{ inviteFriends.invite_url }}</span>
      <span class="tools">
        <n-button type="primary" text @click="onCopy"> 复制 </n-button>
      </span>
      <p class="inviteUrl mt10">邀请人数: {{ inviteFriends.items.length }}</p>
    </div>
    <div class="table el-main scroller me-scrollbar me-scrollbar-thumb">
      <div class="theader">
        <div>昵称</div>
        <div>邮箱</div>
        <div>注册时间</div>
      </div>

      <div class="row" v-for="item in inviteFriends.items" :key="item.email">
        <div>{{ item.nickname }}</div>
        <div>{{ item.email }}</div>
        <div>{{ item.created_at }}</div>
      </div>
    </div>
  </section>
</template>

<style lang="less" scoped>
.invite {
  padding: 20px;
}
.tools {
  padding-left: 20px;
  width: 30px;
}
.inviteUrl {
  font-size: 18px;
}
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
