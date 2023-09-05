<template>
    <div class="typechart">
        <div class="item-coin-info">
            <img :src="icons[data.instId]" alt="" class="icon">
            <div class="instId">
                <div class="title">{{ data.instId.split('-')[0] }}</div>
                <div class="subtitle">{{ data.instId.split('-')[1] }}</div>
            </div>
        </div>
        <div class="item-price-info">
            <div class="coin-price">
                <div class="title">{{ lastPrice }}</div>
                <div class="subtitle">≈${{ usd }}</div>
            </div>
            <div class="chartgroup">    
                <div ref="chartContainer" class="chart"></div>
                <div class="percent" :class="status ? 'rise' : 'fall'">{{ percent }}</div>
            </div>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import { useStore } from '@/stores/store'
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue'
import { createChart } from 'lightweight-charts'
import { computed } from 'vue';

const store = useStore()
const icons: any = store.icons

const props = defineProps({
    data: {
        type: Object,
        default: () => []
    },
    currentTab: {
        type: String,
        default: 'recommend'
    }
})

// 涨跌状态
const status = ref(true)
// 涨跌幅
const percent = ref('')
// 最新价格
const lastPrice = ref(0.00)
// 美元格式转换
const usd = ref('')
// k线数据
const src_data = computed(() => {
    return {...props.data}
})

const xydata = ref(<any>[])

// chart
const chartContainer = ref()

let series: any
let chart: any

const chartOptions = reactive(<any>{
    grid: {
        vertLines: {visible: false},
        horzLines: {visible: false},
    },
    corsshair: {
        vertLine: {
            visible: false,
        },
        horzLine: {
            visible: false,
        }
    },
    handleScroll: false,
    handleScale: false,
})
const seriesOptions = reactive({
    color: status.value ? '#29a1b2' : '#EF4C47',
    lineWidth: 2,
    priceLineVisible: false,
    crosshairMarkerVisible: false,
    crosshairMarkerBorderColor: '#1e1e1e',
})
const timeScaleOptions = reactive({
    visible: false,
})
const priceScaleOptions = reactive({
    visible: false,
})

const addSeriesAndData = (kdata: any) => {
    const firstPrice = kdata[0][4]
    const lp = kdata[kdata.length - 1][4] * 1
    percent.value = ((lp - firstPrice) / firstPrice * 100).toFixed(2) + '%'
    status.value = lp > firstPrice
    percent.value = status.value ? '+' + percent.value : percent.value

    lastPrice.value = parseFloat(lp.toFixed(6))
    usd.value = Number(lastPrice.value).toLocaleString('en-US', {style: 'decimal', maximumFractionDigits: 6})

    seriesOptions.color = status.value ? '#29a1b2' : '#EF4C47'
    series = chart.addLineSeries(seriesOptions)

    xydata.value = []
    xydata.value = kdata.map((item: any) => {
        return {time: item[0] / 1000, value: parseFloat(item[4])}
    })
    series.setData(xydata.value)
}

const drawChart = () => {
    const kdata: any = Object.values(src_data.value.data).reverse()
    chart = createChart(chartContainer.value, chartOptions)
    chart.priceScale('right').applyOptions(priceScaleOptions)
    chart.timeScale().applyOptions(timeScaleOptions)
    chart.timeScale().fitContent()
    addSeriesAndData(kdata)
}

onMounted(() => {
    drawChart()
})

onUnmounted(() => {
    if (chart) {
        chart.remove()
        chart = null
    }
})

watch(
  () => props.data,
  () => {
    const kdata: any = Object.values(src_data.value.data).reverse()
    addSeriesAndData(kdata)
    
  }
)
</script>
    
<style lang="scss" scoped>
.typechart {
    width: 100%;
    height: 48px;
    display: flex;

    .item-coin-info {
        display: flex;
        align-items: center;
        gap: 20px;
        justify-content: flex-start;
        width: 100%;

        .icon {
            width: 32px;
            height: 32px;
        }
        
        .instId {
            .title {
                font-size: 16px;
                color: #333333;
                font-weight: 700;
                overflow-wrap: anywhere;
            }

            .subtitle {
                font-size: 12px;
                color: #AAAAAA;
            }
        }
    }

    .item-price-info {
        display: flex;
        gap: 20px;
        justify-content: flex-end;
        width: 100%;
        align-items: center;

        .coin-price {
            .title {
                font-size: 16px;
                color: #333333;
                font-weight: 700;
                overflow-wrap: anywhere;
            }

            .subtitle {
                font-size: 12px;
                color: #AAAAAA;
            }
        }

        .chartgroup {
            .chart {
                width: 74px;
                height: 25px;
            }

            .percent {
                font-size: 14px;
                font-weight: 700;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .rise {
                color: #29A1B2;
            }

            .fall {
                color: #EF4C47;
            }
        }
    }

    

    
}
</style>