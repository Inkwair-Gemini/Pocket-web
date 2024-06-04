<template>
  <div class="layout-content-menu">
    <h-menu active-name="2-1" :open-names="['2']" theme="dark" style="width:15vw">
      <h-submenu name="1">
        <template slot="title">
          <h-icon name="t-b-organization"></h-icon>
          <span slot="title">客户服务</span>
        </template>
        <router-link to="/layouts/customer/AccountRegister/BasicInfo">
          <h-menu-item name="1-1">开户</h-menu-item>
        </router-link>
        <router-link to="/layouts/customer/SelectHold">
          <h-menu-item name="1-2">持仓查询</h-menu-item>
        </router-link>
        <router-link to="/layouts/customer/SelectTrade">
          <h-menu-item name="1-3">交易查询</h-menu-item>
        </router-link>
        <router-link to="/layouts/customer/BankCard">
          <h-menu-item name="1-4">银行卡管理</h-menu-item>
        </router-link>
      </h-submenu>
      <h-submenu name="2">
        <template slot="title">
          <h-icon name="max"></h-icon>
          <span slot="title">产品</span>
        </template>
        <router-link to="/layouts/product/FundManage">
          <h-menu-item name="2-1">产品管理</h-menu-item>
        </router-link>
      </h-submenu>
      <h-submenu name="3">
        <template slot="title">
          <h-icon name="bag"></h-icon>
          <span slot="title">交易</span>
        </template>
        <router-link to="/layouts/trade/Subscription">
          <h-menu-item name="3-1">申购</h-menu-item>
        </router-link>
        <router-link to="/layouts/trade/Redemption">
          <h-menu-item name="3-2">赎回</h-menu-item>
        </router-link>
        <router-link to="/layouts/trade/TradeRecord">
          <h-menu-item name="3-3">交易记录</h-menu-item>
        </router-link>
      </h-submenu>
      <h-submenu name="4">
        <template slot="title">
          <h-icon name="flip"></h-icon>
          <span slot="title">清算</span>
        </template>
        <router-link to="/layouts/liquidation/Daily">
          <h-menu-item name="4-1">清算</h-menu-item>
        </router-link>
        <router-link to="/layouts/liquidation/Dividents">
          <h-menu-item name="4-2">基金分红</h-menu-item>
        </router-link>
        <router-link to="/layouts/liquidation/DividentsRecord">
          <h-menu-item name="4-3">基金分红明细</h-menu-item>
        </router-link>
      </h-submenu>
      <h-submenu name="5">
        <template slot="title">
          <h-icon name="social-usd-outline"></h-icon>
          <span slot="title">资金服务</span>
        </template>
        <router-link to="/layouts/capital/BankCardRecharge">
          <h-menu-item name="5-1">充值</h-menu-item>
        </router-link>
      </h-submenu>
      <h-submenu name="6">
        <template slot="title">
          <h-icon name="computer"></h-icon>
          <span slot="title">其他</span>
        </template>
        <h-menu-item name="6-1">其他</h-menu-item>
      </h-submenu>
    </h-menu>
  </div>
</template>
<style>
.layout-content-menu {
  overflow-y: auto;
  width: 16%;
  background-color: #111725;
  margin-bottom: 8px;
  height: 90vh;
}
/* 
  ::-webkit-scrollbar-track：用于设置滚动条的轨道样式，可以设置其背景颜色、边框圆角等。在这个例子中，设置了轨道的背景颜色为带有10%透明度的黑色。
  ::-webkit-scrollbar：用于设置滚动条本身的样式，包括宽度、高度等。这里将滚动条的宽度和高度都设置为6像素，并且使用 appearance 属性将浏览器默认的滚动条样式隐藏。
  ::-webkit-scrollbar-thumb：用于设置滚动条的滑块样式，即用户可以拖动的部分。这里设置了滑块的背景颜色、边框圆角等，并添加了一些过渡效果，使滑块在颜色变化时有一个平滑的过渡效果。
  */
::-webkit-scrollbar-track {
  background: rgb(234, 230, 230);
  border-radius: 0;
}
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.15);
  transition: color 0.2s ease;
}
</style>
