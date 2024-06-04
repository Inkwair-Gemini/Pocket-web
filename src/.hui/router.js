import { initRouter, initRouterLayout } from '@hsui/core'

export default initRouter(
  [
    {
      path: '/',
      component: initRouterLayout((layout) => {
        return import('@/layouts/' + layout + '.vue')
      }),
      children: [
        {
          name: 'index',
          path: '',
          component: Index,
        },
        {
          path: 'layouts',
          component: Layouts,
          children: [
            {
              name: 'layouts-index',
              path: '',
              component: LayoutsIndex,
            },
            {
              name: 'layouts-capital-BankCardRecharge',
              name: '资金服务/充值',
              path: 'capital/BankCardRecharge',
              component: LayoutsCapitalBankCardRecharge,
            },
            {
              name: 'layouts-customer-BankCard',
              name: '客户服务/银行卡管理',
              path: 'customer/BankCard',
              component: LayoutsCustomerBankCard,
            },
            {
              name: 'layouts-customer-SelectHold',
              name: '客户服务/持仓查询',
              path: 'customer/SelectHold',
              component: LayoutsCustomerSelectHold,
            },
            {
              name: 'layouts-customer-SelectTrade',
              name: '客户服务/交易查询',
              path: 'customer/SelectTrade',
              component: LayoutsCustomerSelectTrade,
            },
            {
              name: 'layouts-liquidation-Daily',
              name: '清算/清算',
              path: 'liquidation/Daily',
              component: LayoutsLiquidationDaily,
            },
            {
              name: 'layouts-liquidation-Dividents',
              name: '清算/基金分红',
              path: 'liquidation/Dividents',
              component: LayoutsLiquidationDividents,
            },
            {
              name: 'layouts-liquidation-DividentsRecord',
              name: '清算/基金分红明细',
              path: 'liquidation/DividentsRecord',
              component: LayoutsLiquidationDividentsRecord,
            },
            {
              name: 'layouts-product-FundManage',
              name: '产品/产品管理',
              path: 'product/FundManage',
              component: LayoutsProductFundManage,
            },
            {
              name: 'layouts-trade-Redemption',
              name: '交易/赎回',
              path: 'trade/Redemption',
              component: LayoutsTradeRedemption,
            },
            {
              name: 'layouts-trade-Subscription',
              name: '交易/申购',
              path: 'trade/Subscription',
              component: LayoutsTradeSubscription,
            },
            {
              name: 'layouts-trade-TradeRecord',
              name: '交易/交易记录',
              path: 'trade/TradeRecord',
              component: LayoutsTradeTradeRecord,
            },
            {
              name: 'layouts-customer-AccountRegister-BankCard',
              name: '客户服务/开户/银行卡绑定',
              path: 'customer/AccountRegister/BankCard',
              component: LayoutsCustomerAccountRegisterBankCard,
            },
            {
              name: 'layouts-customer-AccountRegister-BasicInfo',
              name: '客户服务/开户/基本信息登记',
              path: 'customer/AccountRegister/BasicInfo',
              component: LayoutsCustomerAccountRegisterBasicInfo,
            },
            {
              name: 'layouts-customer-AccountRegister-Complete',
              name: '客户/开户/完成注册',
              path: 'customer/AccountRegister/Complete',
              component: LayoutsCustomerAccountRegisterComplete,
            },
            {
              name: 'layouts-customer-AccountRegister-Risk',
              name: '客户服务/开户/风险评估',
              path: 'customer/AccountRegister/Risk',
              component: LayoutsCustomerAccountRegisterRisk,
            },
          ],
        },
        {
          name: 'login',
          path: 'login',
          component: Login,
        },
        {
          name: '__404__',
          path: '*',
          component: __404__,
        },
      ],
    },
  ],
  { base: '/', mode: 'hash' }
)

function Index() {
  return import(/* webpackChunkName: "index" */ '@/views/index.vue')
}
function Layouts() {
  return import(/* webpackChunkName: "layouts" */ '@/views/layouts.vue')
}
function LayoutsIndex() {
  return import(
    /* webpackChunkName: "layouts-index" */ '@/views/layouts/index.vue'
  )
}
function LayoutsCapitalBankCardRecharge() {
  return import(
    /* webpackChunkName: "layouts-capital-BankCardRecharge" */ '@/views/layouts/capital/BankCardRecharge.vue'
  )
}
function LayoutsCustomerBankCard() {
  return import(
    /* webpackChunkName: "layouts-customer-BankCard" */ '@/views/layouts/customer/BankCard.vue'
  )
}
function LayoutsCustomerSelectHold() {
  return import(
    /* webpackChunkName: "layouts-customer-SelectHold" */ '@/views/layouts/customer/SelectHold.vue'
  )
}
function LayoutsCustomerSelectTrade() {
  return import(
    /* webpackChunkName: "layouts-customer-SelectTrade" */ '@/views/layouts/customer/SelectTrade.vue'
  )
}
function LayoutsLiquidationDaily() {
  return import(
    /* webpackChunkName: "layouts-liquidation-Daily" */ '@/views/layouts/liquidation/Daily.vue'
  )
}
function LayoutsLiquidationDividents() {
  return import(
    /* webpackChunkName: "layouts-liquidation-Dividents" */ '@/views/layouts/liquidation/Dividents.vue'
  )
}
function LayoutsLiquidationDividentsRecord() {
  return import(
    /* webpackChunkName: "layouts-liquidation-DividentsRecord" */ '@/views/layouts/liquidation/DividentsRecord.vue'
  )
}
function LayoutsProductFundManage() {
  return import(
    /* webpackChunkName: "layouts-product-FundManage" */ '@/views/layouts/product/FundManage.vue'
  )
}
function LayoutsTradeRedemption() {
  return import(
    /* webpackChunkName: "layouts-trade-Redemption" */ '@/views/layouts/trade/Redemption.vue'
  )
}
function LayoutsTradeSubscription() {
  return import(
    /* webpackChunkName: "layouts-trade-Subscription" */ '@/views/layouts/trade/Subscription.vue'
  )
}
function LayoutsTradeTradeRecord() {
  return import(
    /* webpackChunkName: "layouts-trade-TradeRecord" */ '@/views/layouts/trade/TradeRecord.vue'
  )
}
function LayoutsCustomerAccountRegisterBankCard() {
  return import(
    /* webpackChunkName: "layouts-customer-AccountRegister-BankCard" */ '@/views/layouts/customer/AccountRegister/BankCard.vue'
  )
}
function LayoutsCustomerAccountRegisterBasicInfo() {
  return import(
    /* webpackChunkName: "layouts-customer-AccountRegister-BasicInfo" */ '@/views/layouts/customer/AccountRegister/BasicInfo.vue'
  )
}
function LayoutsCustomerAccountRegisterComplete() {
  return import(
    /* webpackChunkName: "layouts-customer-AccountRegister-Complete" */ '@/views/layouts/customer/AccountRegister/Complete.vue'
  )
}
function LayoutsCustomerAccountRegisterRisk() {
  return import(
    /* webpackChunkName: "layouts-customer-AccountRegister-Risk" */ '@/views/layouts/customer/AccountRegister/Risk.vue'
  )
}
function Login() {
  return import(/* webpackChunkName: "login" */ '@/views/login.vue')
}
function __404__() {
  return import(/* webpackChunkName: "__404__" */ '@/views/__404__.vue')
}