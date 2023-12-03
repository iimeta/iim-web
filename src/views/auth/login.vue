<script setup>
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { NDivider, NForm, NFormItem, NConfigProvider } from "naive-ui";
import { ServeLogin } from "@/api/auth";
import { setAccessToken } from "@/utils/auth";
import { palyMusic } from "@/utils/talk";
import socket from "@/socket";
import { useUserStore } from "@/store/user";
import config from "../../../package.json";

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const formRef = ref();
const rules = {
  username: {
    required: true,
    trigger: ["blur", "input"],
    message: "账号不能为空",
  },
  password: {
    required: true,
    trigger: ["blur", "input"],
    message: "密码不能为空",
  },
};

const model = reactive({
  username: "",
  password: "",
  loading: false,
});

const onLogin = () => {
  model.loading = true;

  const response = ServeLogin({
    account: model.username,
    password: model.password,
    platform: "web",
  });

  response.then(async (res) => {
    if (res.code == 200) {
      window["$message"].success("登录成功");
      setAccessToken(res.data.access_token, res.data.expires_in);
      socket.connect();
      userStore.loadSetting();
      router.push(route.query.redirect || "/");
    } else {
      window["$message"].warning(res.message);
    }
  });

  response.finally(() => {
    model.loading = false;
  });
};

const onValidate = (e) => {
  e.preventDefault();

  // 谷歌浏览器提示音需要用户主动交互才能播放，登录入口主动交互一次，后面消息提示音就能正常播放了
  palyMusic(true);

  formRef.value.validate((errors) => {
    !errors && onLogin();
  });
};
</script>

<template>
  <n-config-provider :theme="null">
    <section class="el-container is-vertical login-box login">
      <header class="el-header box-header">
        <i class="login-box-logo" />
        欢迎回来
      </header>

      <main class="el-main" style="padding: 3px">
        <n-form ref="formRef" size="large" :model="model" :rules="rules">
          <n-form-item path="username" :show-label="false">
            <n-input
              placeholder="邮箱/手机号"
              v-model:value="model.username"
              @keydown.enter.native="onValidate"
            />
          </n-form-item>

          <n-form-item path="password" :show-label="false">
            <n-input
              placeholder="请输入密码"
              type="password"
              show-password-on="click"
              v-model:value="model.password"
              @keydown.enter.native="onValidate"
            />
          </n-form-item>

          <n-button
            type="primary"
            size="large"
            block
            class="mt-t20"
            @click="onValidate"
            :loading="model.loading"
          >
            立即登录
          </n-button>
        </n-form>

        <div class="helper">
          <n-button text color="#D4A978" @click="router.push('/auth/forget')">
            找回密码
          </n-button>
          <n-button text color="#D4A978" @click="router.push('/auth/register')">
            还没有账号？立即注册
          </n-button>
        </div>
        <div class="copyright">
          <a href="https://github.com/iimeta/iim-client" target="_blank">
            <span
              ><b>v{{ config.version }}</b></span
            >
          </a>
          <br />
          <span>Copyright © 2023 IIM. All Rights Reserved.</span>
        </div>
      </main>
    </section>
  </n-config-provider>
</template>

<style lang="less" scoped>
@import "@/assets/css/login.less";
</style>
