<template>
    <van-nav-bar title="Ai量化" left-arrow @click-left="back" :border="false" />
    <div class="list">
        <div class="list-item" v-for="item in list" :key="item.id">
            <div class="header">
                <div class="title">{{ item.title }}</div>
            </div>
            <div class="body">
                <div class="item">
                    <div class="title">限额(USDT)</div>
                    <div class="value">{{ item.money }} - {{ item.money }}</div>
                </div>
                <div class="item">
                    <div class="title">每日收益</div>
                    <div class="value">{{ item.rate }}</div>
                </div>
                <div class="item">
                    <div class="title">周期</div>
                    <div class="value">{{ item.day }}天</div>
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
const tabCur = ref(0)
const statusJson = {
    1: '待开始',
    2: '进行中',
    3: '已结束',
}
const list = ref(<any>[])
const total = ref(0)
const params = reactive({
    page: 1,
    size: 5
})
const getList = () => {
    total.value = 10
    list.value = [{
        id: 1,
        title: 'quantification',
        status: 1,
        money: 500,
        rate: '3%',
        day: 3,
        date: '2023-08-29 23:16:51'
    }, {
        id: 2,
        title: 'quantification',
        status: 2,
        money: 500,
        rate: '3%',
        day: 3,
        date: '2023-08-29 23:16:51'
    }, {
        id: 3,
        title: 'quantification',
        status: 3,
        money: 500,
        rate: '3%',
        day: 3,
        date: '2023-08-29 23:16:51'
    }, {
        id: 4,
        title: 'quantification',
        status: 1,
        money: 500,
        rate: '3%',
        day: 3,
        date: '2023-08-29 23:16:51'
    }, {
        id: 5,
        title: 'quantification',
        status: 1,
        money: 500,
        rate: '3%',
        day: 3,
        date: '2023-08-29 23:16:51'
    }, {
        id: 6,
        title: 'quantification',
        status: 1,
        money: 500,
        rate: '3%',
        day: 3,
        date: '2023-08-29 23:16:51'
    }, {
        id: 7,
        title: 'quantification',
        status: 1,
        money: 500,
        rate: '3%',
        day: 3,
        date: '2023-08-29 23:16:51'
    }]
}
getList();

const back = () => {
    Router.back()
}
</script>
    
<style lang="scss" scoped>
.tabs {
    display: flex;

    .tabs-item {
        flex: 1;
        text-align: center;
        border-bottom: 3px solid #ccc;
        height: 46px;
        line-height: 46px;
    }

    .active {
        color: rgb(99, 157, 153);
        border-color: rgb(99, 157, 153);
        font-weight: 500;
    }
}

.list {
    height: calc(100vh - 46px);
    overflow-y: auto;
    padding-bottom: 40px;

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