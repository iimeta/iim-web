<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ServeVipInfo, ServeGenerateSecretKey } from "@/api/vip";
import { clipboard } from "@/utils/common";
import { Info } from "@icon-park/vue-next";
import { NPopover, NSpace, NImage } from "naive-ui";

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
  const response = ServeGenerateSecretKey().then((res) => {
    if (res.code == 200) {
      window["$message"].success("生成成功");
      detail.secret_key = res.data.secret_key;
    } else {
      window["$message"].error(res.message);
    }
  });
};

// 复制密钥
const onCopySecretKey = () => {
  return clipboard(detail.secret_key, () =>
    window["$message"].success("已复制")
  );
};
</script>

<template>
  <section>
    <main class="el-container container">
      <im-avatar
        class="mr20 ml20 avatar-box"
        :size="113"
        :src="detail.avatar"
        :username="detail.nickname"
        :fontSize="50"
      />
      <div class="infos mt10">
        <div class="info-item">
          <span class="name">会员账号 :</span>
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
      </div>
    </main>
    <footer>
      <div class="api-infos">
        <div class="api-info-item ml20">
          <div class="title">免费额度</div>
          <div class="text orange">
            {{ detail.used_tokens }} / {{ detail.total_tokens }}
          </div>
          <div class="footer-text">每日在线30分钟, 零点可获得免费额度</div>
        </div>
        <div class="api-info-item ml20">
          <div class="title">使用次数</div>
          <div class="text orange">{{ detail.usage_count }}</div>
          <div class="footer-text">每天0点刷新使用次数</div>
        </div>
        <div class="api-info-item ml20">
          <div class="title">API 密钥</div>
          <div class="text">{{ detail.secret_key || "-" }}</div>
          <div class="footer-button">
            <span>
              <n-button
                type="primary"
                text
                size="large"
                @click="onCopySecretKey"
              >
                复制
              </n-button>
            </span>
            <span class="ml40">
              <n-button
                type="primary"
                text
                size="large"
                @click="onGenerateSecretKey"
              >
                生成
              </n-button>
            </span>
          </div>
        </div>
        <div class="api-info-item ml20">
          <div class="title">API 接口</div>
          <div class="text">https://api.iim.ai</div>
          <div class="footer-button">
            <a href="https://github.com/iimeta/iim-api" target="_blank">
              <span>
                <n-button type="primary" text size="large"> 查看 </n-button>
              </span>
            </a>
            <a href="https://gitee.com/iimeta/iim-api" target="_blank">
              <span class="ml40">
                <n-button type="primary" text size="large"> 备用 </n-button>
              </span>
            </a>
          </div>
        </div>
        <div class="api-info-item ml20">
          <div class="title">交流群</div>
          <div class="group">
            <n-space>
              <n-image
                width="70"
                class="ml30"
                src="https://image.iim.ai/public/images/QQGroup.png"
              />
              <n-image
                width="70"
                class="ml50"
                src="https://image.iim.ai/public/images/WeChatGroup.png"
              />
            </n-space>
          </div>
        </div>
      </div>
    </footer>
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
  }
}

.api-infos {
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;

  .api-info-item {
    height: 150px;
    width: 300px;
    align-items: center;
    background-color: #303033;
    border-radius: 10px;
    margin-bottom: 20px;

    .title {
      font-size: 18px;
      text-align: center;
      flex-shrink: 0;
      color: #fff;
      margin-top: 20px;
    }

    .text {
      width: 260px;
      font-size: 20px;
      text-align: center;
      margin: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .orange {
      color: #ee9028;
    }

    .footer-text {
      font-size: 12px;
      text-align: center;
      margin-left: 5px;
      margin-top: 22px;
      color: #afabab;
    }

    .footer-button {
      width: 100px;
      display: flex;
      margin: auto;
      margin-top: 20px;
    }
    .group {
      width: 260px;
      margin: auto;
      margin-top: 20px;
    }
  }
}

.avatar-box {
  border-radius: 5px;
  margin-top: 21px;
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
