<template>
    <div class="home-market-wrapper">
        <div class="chart-wrapper">
            <charts v-for="(item,index) in charts_kdata" :key="index" :kdata="item"/>
        </div>

        <div class="market-wrapper">
            <div class="title">{{ m_title }}</div>
            <div class="types">
                <types :kdata="all_crypto" :coinlist="coin_list" />
            </div>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import charts from '@/components/market/charts.vue'
import types from '@/components/market/types.vue'
import i18n from '@/locale'
import { get_coin_list, get_icon } from '@/utils/api'
import { ref, inject, onMounted, onUnmounted } from 'vue'
import { getSubscribeJsonBody, getUnsubscribeJsonBody } from '@/utils/common'
import { useStore } from '@/stores/store'

const ws: any = inject('ws')

const store = useStore()

const getIcon = () => {
    get_icon().then((res: any) => {
        store.setIcons(res)
    })
}

onMounted(() => {
    getIcon()
    getCoinList()
    subscribeHeader()
    onmessage()
})

onUnmounted(() => {
    unsubscribeHeader()
})


// 本页数据监听wss频道
const channel = 'home'


const m_title = i18n.global.t('market.title')

const show_data = ref(<any>[])
const kdata = ref([])
const charts_kdata = ref([])
const coin_list = ref(<any>{})
const getCoinList = () => {
    get_coin_list().then((res: any) => {
        coin_list.value = res
        store.setCoinList(res)
    })
}

// 所有加密货币数据
const all_crypto = ref([])
const tid = ref('')

// 订阅header
const subscribeHeader = () => {
    ws.onopen = () => {
        ws.send(getSubscribeJsonBody(channel))
    }
}

// 取消订阅header
const unsubscribeHeader = () => {
    ws.send(getUnsubscribeJsonBody(tid.value))
}

// onmessage
const onmessage = () => {
    ws.onmessage = (res: any) => {
        const data = JSON.parse(res.data)
        if (data.data.channel === channel) {
            kdata.value = data.data.data
            show_data.value = Object.keys(coin_list.value).reduce((result: any, key: any) => {
                result[key] = kdata.value.filter((item: any) => coin_list.value[key].includes(item.instId))
                return result
            }, {})
            charts_kdata.value = show_data.value.header
            all_crypto.value = show_data.value.crypto
            tid.value = data.tid
        }
    }
}

</script>
    
<style lang="scss" scoped>

.home-market-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .chart-wrapper {
        display: flex;
        gap: 8px;
        height: 110px;
    }

    .market-wrapper {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .title {
            font-size: 18px;
            font-weight: bold;
            color: #000;
        }

        .types {
            display: flex;
            font-size: 14px;

            .type {
                color: #aaa;
                padding: 5px 10px;
            }
        }
    }
}
</style>