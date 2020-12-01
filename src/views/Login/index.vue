<template>
  <div class="login">
    <img src="./images/img-01.png" alt="插图" class="inset">
    <div class="form-container">
      <h2 class="landIn">
        <span v-for="(item, index) in titleArray" :key="index" :style="{ animationDelay: `${index * 0.05}s` }">{{ item }}</span>
      </h2>
      <div class="input-container">
        <i class="yzliang-yonghuming"></i>
        <input type="text" autocomplete="off" v-model="username">
      </div>
      <div class="input-container">
        <i class="yzliang-mima"></i>
        <input type="password" autocomplete="off" v-model="password">
      </div>
      <div class="submit-btn" @click="onSubmit">
        <i class="yzliang-zhifeiji"></i>
        登 录
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useTitle } from './hooks/TitleAnimation'
import { useLogin } from './hooks/Login'
export default {
  setup () {
    const { titleArray } = useTitle('Hi,欢迎来到我的博客！')
    const { username, password, onSubmit } = useLogin()
    return {
      titleArray,
      username,
      password,
      onSubmit
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  min-width: 800px;
  height: 100vh;
  background-image: url('./images/bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  .inset {
    width: 40%;
    min-width: 320px;
    height: auto;
    position: absolute;
    left: calc((60% - 500px) / 2);
    top: 50%;
    transform: translateY(-50%);
  }
  .form-container {
    width: 320px;
    height: 380px;
    position: absolute;
    right: 84px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 20px;
    background-color: rgb(240 244 243);
    box-shadow: 10px 15px 40px 0px rgba($color: #000000, $alpha: 0.5);
    padding-top: 40px;
    .landIn {
      flex-wrap: wrap;
      line-height: 1.8;
      white-space: pre;
      height: 40px;
      display: flex;
      justify-content: center;
      color: #333;
      span {
        animation: landIn 0.8s ease-out both;
      }
    }
    .submit-btn {
      width: 280px;
      height: 50px;
      background: linear-gradient(126deg, #8468F5 0%, #EC74E7 100%);
      border-radius: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 20px;
      margin: 0 auto;
      margin-top: 40px;
      cursor: pointer;
      position: relative;
      > i {
        font-size: 20px;
        color: #fff;
        margin-right: 10px;
      }
      &::after {
        content: "";
        display: block;
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        pointer-events: none;
        background-color: #8468F5;
        background-repeat: no-repeat;
        background-position: 50%;
        opacity: 0;
        transition: all .6s;
        border-radius: 45px;
      }
      &:active:after {
        opacity: .3;
        //设置初始状态
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: 0s;
      }
    }
  }
}
@keyframes landIn {
  from {
    opacity: 0;
    transform: translateY(-20%);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.input-container {
  width: 280px;
  height: 50px;
  border-radius: 25px;
  line-height: 50px;
  margin: 0 auto;
  background-color: #FFF;
  padding: 0 30px 0 50px;
  box-sizing: border-box;
  position: relative;
  transition: all 0.5s;
  margin-top: 30px;
  > i {
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    color: rgb(125 131 141);
  }
  > input {
    width: calc(100% - 10px);
    height: 40px;
    margin: 5px 0 5px 10px;
    font-size: 18px;
    line-height: 40px;
  }
  &:focus-within {
    box-shadow: 0px 5px 20px rgba($color: #000000, $alpha: 0.2);
  }
}
</style>
