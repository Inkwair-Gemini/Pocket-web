<template>
    <div>
        <div class="title">
            {{ title }}
        </div>
        <div class="process" style="width: 80%;margin-left:10%">
            <h-steps :current="current" style="margin-top: 1%;">
                <h-step :title="getStatus(0)"  content="基本信息登记"></h-step>
                <h-step :title="getStatus(1)" content="银行卡绑定"></h-step>
                <h-step :title="getStatus(2)" content="风险评估"></h-step>
                <h-step :title="getStatus(3)" content="完成注册"></h-step>
            </h-steps>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        title: String,
        current: Number,
    },
    methods:{
        getStatus(number){
            if(number === this.current){
                return "进行中"
            }else if(number > this.current){
                return "待进行"
            }else{
                return "已完成"
            }
        }
    }
}
</script>
<style scoped>
    .title{
        padding: 1.5vh;
        font-size: large;
        color: black;
        font-weight: bold;
    }
    .process{
        background-color: #c7d6f4;
        height: 13vh;
        padding-top: 1vh;
        padding-left: 10%;
    }
</style>