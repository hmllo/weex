<template>
    <van-tabs v-model:active="active" shrink title-active-color="#333333" title-inactive-color="#AAAAAA" class="v-tabs" line-width="0" line-height="0" @click-tab="switchTab">
        <van-tab v-for="(item,index) in types" :key="index" :title="item.name" :name="item.channel"></van-tab>
        <div v-if="!hasData">
            <van-empty image="search" :description="noData" />
        </div>
        <div class="type-chart-item" v-else>
            <div v-for="(value,index) in kdata" :key="index">
                <typechart :data="value" :currentTab="currentTab" v-if="coinlist[currentTab].includes(value.instId)"></typechart>
            </div>
        </div>
    </van-tabs>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import i18n from '@/locale'
import typechart from '@/components/market/typechart.vue'
import { computed } from 'vue';

const active = ref('recommend')

const types = [
    {name: i18n.global.t('market.recommend'), channel: 'recommend'},
    {name: i18n.global.t('market.collection'), channel: 'collection'},
    {name: i18n.global.t('market.crypto'), channel: 'crypto'},
    {name: i18n.global.t('market.forex'), channel: 'forex'},
    {name: i18n.global.t('market.futures'), channel: 'futures'},
    {name: i18n.global.t('market.index'), channel: 'index'},
]

const noData = i18n.global.t('common.noData')

const props = defineProps({
    kdata: {
        type: Object,
        default: () => []
    },
    coinlist: {
        type: Object,
        default: () => {}
    }
})

// 当前选项卡
const currentTab = ref('recommend')

const switchTab = (tab: any) => {
    currentTab.value = tab.name
}

// 当前选项卡是否有数据
const hasData = computed(() => {
    return props.coinlist[currentTab.value]?.length > 0
})


</script>

<style lang="scss" scoped>
.v-tabs {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

:deep(.van-tabs__nav) {
    display: flex;
    gap: 5px;
    padding-left: 0;
    padding-bottom: 0;
    color: 'red';
}

:deep(.van-tab__panel) {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.type-chart-item {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

</style>