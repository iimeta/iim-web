<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ServeVipInfo, ServeGenerateSecretKey } from "@/api/vip";
import { clipboard } from "@/utils/common";
import { Info } from '@icon-park/vue-next'
import { NPopover } from 'naive-ui'

const detail = reactive({
  vip_name: "",
  user_id: "",
  nickname: "",
  avatar: "",
  secret_key: "",
  reg_time: "",
  usage_count: 0,
  used_tokens: 0,
  total_tokens: 0,
});

// 加载会员信息
ServeVipInfo().then(({ data }) => {
  detail.vip_name = data.vip_name;
  detail.user_id = data.user_id;
  detail.nickname = data.nickname;
  detail.avatar = data.avatar;
  detail.secret_key = data.secret_key;
  detail.reg_time = data.reg_time;
  detail.usage_count = data.usage_count;
  detail.used_tokens = data.used_tokens;
  detail.total_tokens = data.total_tokens;
});

// 生成密钥
const onGenerateSecretKey = () => {
  const response = ServeGenerateSecretKey().then(res => {
    if (res.code == 200) {
      window['$message'].success('生成成功')
      detail.secret_key = res.data.secret_key;
    } else {
      window['$message'].error(res.message)
    }
  })
}

// 复制密钥
const onCopySecretKey = () => {
    return clipboard(detail.secret_key, () =>
      window["$message"].success("已复制")
    );
};

</script>

<template>
  <section class="el-container container">

    <im-avatar round class="mt20 mr20 ml20" :size="80" :src="detail.avatar" :username="detail.nickname" :fontSize="50"/>
    <div class="infos mt20">
      <div class="info-item">
        <span class="name">&#12288;会员ID :</span>
        <span class="text">{{ detail.user_id }}</span>
      </div>
      <div class="info-item">
        <span class="name">会员昵称 :</span>
        <span class="text">{{ detail.nickname }}</span>
      </div>
      <div class="info-item">
        <span class="name">会员等级 :</span>
        <span class="text">{{ detail.vip_name || "-" }}</span>
      </div>
      <div class="info-item">
        <span class="name">注册时间 :</span>
        <span class="text">{{ detail.reg_time }}</span>
      </div>
      <div class="info-item">
        <span class="name">免费额度 :</span>
        <span class="text">{{ detail.used_tokens }} / {{ detail.total_tokens }}</span>
        <n-popover trigger="hover">
          <template #trigger>
            <Info theme="outline" size="14" fill="#1890ff" class="ml10 pointer"/>
          </template>
          <span>每天需在线30分钟以上, 方可在明日0点刷新免费额度(tokens)</span>
        </n-popover>
      </div>
      <div class="info-item">
        <span class="name">使用次数 :</span>
        <span class="text">{{ detail.usage_count }}</span>
        <n-popover trigger="hover">
          <template #trigger>
            <Info theme="outline" size="14" fill="#1890ff" class="ml10 pointer"/>
          </template>
          <span>每天0点刷新使用次数</span>
        </n-popover>
      </div>
      <div class="info-item">
        <span class="name"> API 密钥 :</span>
        <span class="text">{{ detail.secret_key || "-" }}</span>
        <span class="tools">
          <n-button type="primary" text @click="onCopySecretKey"> 复制 </n-button>
        </span>
        <span class="tools">
          <n-button type="primary" text @click="onGenerateSecretKey"> 生成 </n-button>
        </span>
      </div>
    </div>
  </section>
</template>

<style lang="less" scoped>
.infos {
  .info-item {
    height: 30px;
    width: 100%;
    margin: 3px 0;
    display: flex;
    align-items: center;

    .name {
      width: 70px;
      flex-shrink: 0;
      color: #625f5f;
    }

    .text {
      margin-left: 5px;
    }

    .edit {
      text-decoration: underline;
      text-decoration-style: solid;
      text-underline-offset: 3px;
    }

    .tools {
      padding-left: 20px;
      width: 30px;
      display: block;
    }
  }
}

html[data-theme="dark"] {
  .infos {
    .info-item {
      .name {
        color: #afabab;
      }
    }
  }
}
</style>
