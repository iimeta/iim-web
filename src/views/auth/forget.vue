<script setup>
import { reactive, ref, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { NForm, NFormItem, NInput, NConfigProvider } from "naive-ui";
import { ServeForgetPassword } from "@/api/auth";
import { ServeSendVerifyCode, ServeSendEmailCode } from "@/api/common";
import SmsLock from "@/plugins/sms-lock";
import { isEmail, isMobile } from "@/utils/validate";

const router = useRouter();
const formRef = ref();
const rules = {
  code: {
    required: true,
    trigger: ["blur", "input"],
    message: "验证码不能为空",
  },
  username: {
    required: true,
    trigger: ["blur", "input"],
    // validator(rule, value) {
    //   if (!value) {
    //     return new Error("手机号不能为空");
    //   } else if (!isMobile(value)) {
    //     return new Error("请正确填写手机号");
    //   }
    //   return true;
    // },
    validator(rule, value) {
      if (!value) {
        return new Error("邮箱不能为空");
      } else if (!isEmail(value)) {
        return new Error("请正确填写邮箱");
      }
      return true;
    },
  },
  password: {
    required: true,
    trigger: ["blur", "input"],
    message: "密码不能为空",
  },
};

// 短信按钮倒计时
const lockTime = ref(0);

// 初始化短信按钮锁
const lock = new SmsLock(
  "FORGET_PSW_SMS",
  60,
  (time) => (lockTime.value = time)
);

const model = reactive({
  username: "",
  password: "",
  code: "",
  loading: false,
});

const onForget = () => {
  model.loading = true;

  const response = ServeForgetPassword({
    account: model.username,
    password: model.password,
    code: model.code,
  });

  response.then((res) => {
    if (res.code == 200) {
      window["$message"].success("密码找回成功");

      setTimeout(() => {
        router.push("/auth/login");
      }, 500);
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

  formRef.value.validate((errors) => {
    !errors && onForget();
  });
};

// 发送短信
const onSendSms = () => {
  if (!isMobile(model.username)) {
    window["$message"].warning("请正确填写手机号");
    return;
  }

  const response = ServeSendVerifyCode({
    mobile: model.username,
    channel: "forget_account",
  });

  lock.start();
  
  response.then((res) => {
    if (res.code == 200) {
      window["$message"].success("验证码发送成功");
    } else {
      window["$message"].warning(res.message);
      lock.end();
    }
  });

  response.finally(() => {
    model.loading = false;
  });
};

// 发送邮件
const onSendEmail = () => {
  if (!isEmail(model.username)) {
    window["$message"].warning("请正确填写邮箱");
    return;
  }

  const response = ServeSendEmailCode({
    email: model.username,
    channel: "forget_account",
  });

  lock.start();

  response.then((res) => {
    if (res.code == 200) {
      window["$message"].success("验证码发送成功");
    } else {
      window["$message"].warning(res.message);
      lock.end();
    }
  });

  response.finally(() => {
    model.loading = false;
  });
};

onUnmounted(() => {
  lock.clear();
});
</script>

<template>
  <n-config-provider :theme="null">
    <section class="el-container is-vertical login-box forget">
      <header class="el-header box-header">
        <i class="login-box-logo" />
        找回密码
      </header>

      <main class="el-main" style="padding: 3px">
        <n-form ref="formRef" size="large" :model="model" :rules="rules">
          <n-form-item path="username" :show-label="false">
            <n-input
              placeholder="邮箱"
              v-model:value="model.username"
              @keydown.enter.native="onValidate"
            />
          </n-form-item>

          <n-form-item path="code" :show-label="false">
            <n-input
              placeholder="验证码"
              :maxlength="6"
              v-model:value="model.code"
              @keydown.enter.native="onValidate"
            />
            <n-button
              tertiary
              class="mt-l5"
              @click="onSendEmail"
              :disabled="lockTime > 0"
            >
              获取验证码 <span v-show="lockTime > 0">({{ lockTime }}s)</span>
            </n-button>
          </n-form-item>

          <n-form-item path="password" :show-label="false">
            <n-input
              placeholder="设置密码"
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
            立即找回
          </n-button>
        </n-form>

        <div class="helper">
          <n-button text color="#D4A978" @click="router.push('/auth/register')">
            注册账号
          </n-button>
          <n-button text color="#D4A978" @click="router.push('/auth/login')">
            已有账号，立即登录?
          </n-button>
        </div>
      </main>
    </section>
  </n-config-provider>
</template>

<style lang="less" scoped>
@import "@/assets/css/login.less";
</style>
