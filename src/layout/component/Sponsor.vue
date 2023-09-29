<script setup>
import { ref } from 'vue'
import { Close } from '@icon-park/vue-next'
import { storage } from '@/utils/storage'

let isShow = ref(false)

let num = storage.get('reward', 0)

setTimeout(() => {
  isShow.value = num <= 2
}, 1000 * 60* 10)

const onClose = () => {
  isShow.value = false
  storage.set('reward', num + 1)
}
</script>

<template>
  <div>
    <div class="reward" v-show="isShow">
      <div class="title">
        <span><b>开源支持</b></span>
        <n-icon :size="18" :component="Close" @click="onClose" />
      </div>

      <div class="main">
        <div class="pay-box">
          <img
            src="https://image.iim.ai/public/images/Alipay.png"
          />
          <p><b>支付宝</b></p>
        </div>
        <div class="pay-box">
          <img
            src="https://image.iim.ai/public/images/WeChatPay.png"
          />
          <p><b>微信支付</b></p>
        </div>
      </div>
      <div class="footer">
        <b>如果这个项目帮助到了你，可以请作者喝杯咖啡表示感谢 ☕</b>
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
      background: #007AFC;
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
        background: #05C160;
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
