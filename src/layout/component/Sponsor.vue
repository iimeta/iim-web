<script setup>
import { ref } from "vue";
import { Close } from "@icon-park/vue-next";
import { storage } from "@/utils/storage";

let isShowReward = ref(false);
let isShowGroup = ref(false);

// let rewardNum = storage.get('reward', 0)
// let groupNum = storage.get('group', 0)

setTimeout(() => {
  isShowReward.value = true;
  // isShowReward.value = isShowReward <= 8;
}, 1000 * 60 * 2);

setTimeout(() => {
  isShowGroup.value = true;
  // isShowGroup.value = isShowGroup <= 8;
}, 1000 * 60 * 5);

const onCloseReward = () => {
  isShowReward.value = false;
  // storage.set('reward', rewardNum + 1)
};

const onCloseGroup = () => {
  isShowGroup.value = false;
  // storage.set('group', groupNum + 1)
};
</script>

<template>
  <div>
    <div class="reward" v-show="isShowReward">
      <div class="title">
        <span><b>开源支持</b></span>
        <n-icon :size="18" :component="Close" @click="onCloseReward" />
      </div>

      <div class="main">
        <div class="pay-box">
          <img src="https://image.iim.ai/public/images/Alipay.png" />
          <p><b>支付宝</b></p>
        </div>
        <div class="pay-box">
          <img src="https://image.iim.ai/public/images/WeChatPay.png" />
          <p><b>微信支付</b></p>
        </div>
      </div>
      <div class="footer">
        <b>如果这个项目帮助到了你，可以请作者喝杯咖啡表示感谢 ☕</b>
      </div>
    </div>
    <div class="reward" v-show="isShowGroup">
      <div class="title">
        <span><b>交流群</b></span>
        <n-icon :size="18" :component="Close" @click="onCloseGroup" />
      </div>

      <div class="main">
        <div class="group-box">
          <img src="https://image.iim.ai/public/images/QQGroup.png" />
          <p>
            <a
              href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=dp8EgZvsbxYX2-AL2-gXcGcrQVdZ8H42&authKey=c37n2VXO0kedTPoF2DZrH2bAYQTp0w0qgjGJ3NzNYbfLoCIz9WGDX8kMvnf%2Fzy1E&noverify=0&group_code=676713188"
              target="_blank"
            >
              <b>QQ群</b>
            </a>
          </p>
        </div>
        <div class="group-box">
          <img src="https://image.iim.ai/public/images/WeChatGroup.png" />
          <p><b>微信群</b></p>
        </div>
      </div>
      <div class="footer">
        <b>欢迎加入交流群</b>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.reward {
  position: fixed;
  width: 550px;
  height: 400px;
  right: 20px;
  bottom: 20px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  box-sizing: border-box;
  overflow: hidden;
  user-select: none;
  z-index: 9999;
  background: var(--im-bg-color);

  .title {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    width: 100%;
    font-size: 18px;
    position: relative;
    box-sizing: border-box;

    i {
      position: absolute;
      right: 15px;
      top: 18px;
      font-size: 18px;
      cursor: pointer;
    }
  }

  .main {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .pay-box {
      width: 218px;
      height: 268px;
      background: #007afc;
      margin: 0 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 5px;

      img {
        width: 188px;
        height: 188px;
      }

      p {
        margin-top: 18px;
        color: #ffffff;
        font-size: 18px;
      }

      &:last-child {
        background: #05c160;
      }
    }
    .group-box {
      width: 218px;
      height: 268px;
      background: #fff;
      margin: 0 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 5px;

      a {
        color: #2f81f7;
      }

      img {
        width: 188px;
        height: 188px;
      }

      p {
        margin-top: 18px;
        color: #05c160;
        font-size: 18px;
      }
    }
  }

  .footer {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
  }
}
</style>
