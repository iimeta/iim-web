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
      baseURL = `${url.protocol}//${url.hostname}`;
      if (url.port) {
        if (
          (url.protocol == "https:" && url.port != 443) ||
          (url.protocol == "http:" && url.port != 80)
        ) {
          baseURL = baseURL + `:${url.port}`;
        }
      }
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
        <n-button type="primary" text @click="onCopy" size="large"> 复制 </n-button>
      </span>
      <p class="inviteUrl mt10">邀请人数: {{ inviteFriends.items.length }}</p>
    </div>
    <div class="table el-main scroller me-scrollbar me-scrollbar-thumb">
      <div class="theader">
        <div><b>昵称</b></div>
        <div><b>账号</b></div>
        <div><b>注册时间</b></div>
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
  .theader {
    border: 1px solid #646464;
    font-size: 16px;
    border-radius: 5px 5px 0 0;
    background-color: #303033;
  }

  .row {
    border-bottom: 1px solid #646464;
    background-color: #303033;
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

html[data-theme="light"] {
  .theader {
    border: 1px solid #d4d4d4;
    background-color: #f7f7f7;
    color: #666666;
  }

  .row {
    border-bottom: 1px solid #d4d4d4;
    background-color: #f7f7f7;
    color: #666666;
  }
}
</style>
