<template>
    <van-nav-bar title="Ai量化" left-arrow @click-left="back" :border="false" />
    <div class="info">
        <div class="header">
            <div class="item">
                <div class="title">总共套利</div>
                <div class="value">{{ info.money }}{{ info.unit }}</div>
            </div>
            <div class="item">
                <div class="title">今日挖矿</div>
                <div class="value">{{ info.today }}{{ info.unit }}</div>
            </div>
        </div>
        <div class="link">
            <div class="link-info">
                <div class="title">AI量化介绍</div>
                <div class="sub-title">机器人是如何工作的？</div>
            </div>
            <van-icon size="20px" color="#ccc" name="arrow" />
        </div>
    </div>
    <div class="info">
        <div class="link">
            <div class="link-info">
                <div class="title">查询订单</div>
            </div>
            <van-icon size="20px" color="#ccc" name="arrow" />
        </div>
    </div>
    <div class="list">
        <div class="list-item">
            <div class="header">
                <div class="title">{{ info.title }}</div>
            </div>
            <div class="body">
                <div class="item">
                    <div class="title">限额(USDT)</div>
                    <div class="value">{{ info.money }} - {{ info.money }}</div>
                </div>
                <div class="item">
                    <div class="title">每日收益</div>
                    <div class="value">{{ info.rate }}</div>
                </div>
                <div class="item">
                    <div class="title">周期</div>
                    <div class="value">{{ info.day }}天</div>
                </div>
            </div>
            <div class="footer">
                <div class="icons">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="button">托管</div>
            </div>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const Router = useRouter()

const info = ref({
    money: 0.0652345,
    unit: 'ETH',
    today: 0,
    id: 1,
    title: 'quantification',
    status: 1,
    rate: '3%',
    day: 3,
    date: '2023-08-29 23:16:51'
})

const back = () => {
    Router.back()
}
</script>
    
<style lang="scss" scoped>
.info{
    margin: 16px 16px 0;
    padding: 0 16px;
    border-radius: 8px;
    box-shadow: 0px 2px 12px rgba($color: #000000, $alpha: 0.1);
    .header{
        display: flex;
        justify-content: space-around;
        text-align: center;
        padding: 16px 0;
        border-bottom: 1px solid #eee;
        .title{
            line-height: 30px;
        }
        .value{
            line-height: 30px;
            font-weight: 600;
            font-size: 18px;
        }
    }
    .link{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 0;
        .title{
            color: rgb(99, 157, 174);
            font-size: 18px;
            font-weight: 600;
        }
        .sub-title{
            color: #aaa;
        }
    }
}

.list {

    .list-item {
        margin: 16px 16px 0;
        padding: 0 16px 16px;
        border-radius: 8px;
        box-shadow: 0px 2px 12px rgba($color: #000000, $alpha: 0.1);
    }

    .header {

        .title {
            font-size: 18px;
            font-weight: 500;
            border-bottom: 1px solid #ddd;
            line-height: 60px;
        }
    }

    .body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 16px 0 10px;

        .title {
            color: #909399;
        }

        .value {
            font-size: 18px;
            font-weight: 500;
        }
    }

    .footer {
        color: #909399;

        .icons{
            background-color: rgb(238,247,247);
            border-radius: 6px;
            padding: 8px;
            display: flex;
            span{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: #ccc;
                display: block;
                margin-right: 10px;
            }
        }
        .button{
            background-color: rgb(99, 157, 174);
            border-radius: 6px;
            margin-top: 16px;
            color: #fff;
            text-align: center;
            line-height: 40px;
            font-size: 18px;
        }
    }

}
</style>