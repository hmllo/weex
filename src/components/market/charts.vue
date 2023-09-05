<template>
    <div class="item">
        <div class="item-info">
            <div class="title">
                <div class="coin-name"> {{ instId }}</div>
                <div class="status" :class="{rise: rise, fall: !rise}">{{ risePercent }}</div>
            </div>
            <div class="price" :class="{rise: rise, fall: !rise}">{{ lastPrice }}</div>
        </div>
        <div class="home-kline-container">
            <div ref="chartContainer" class="charts"></div>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue'
import { createChart } from 'lightweight-charts'

const props = defineProps({
    kdata: {
        type: Object,
        default: []
    }
})

const instId = props.kdata.instId.replace('-','/')
// 涨跌状态
const rise = ref(true)
// k线数据
const data = ref(<any>[])
// 最新价格
const lastPrice = ref(0.00)
// 涨跌百分比
const risePercent = ref('')

let series: any
let chart: any

const type = ref('line')
const autosize = ref(true)
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
    color: rise.value ? '#29a1b2' : '#EF4C47',
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

const chartContainer = ref()

const resizeHandler = () => {
    if (!chart || !chartContainer.value) return;
    const dimensions = chartContainer.value.getBoundingClientRect();
    chart.resize(dimensions.width, dimensions.height);
};

function getChartSeriesConstructorName(type: string) {
  return `add${type.charAt(0).toUpperCase() + type.slice(1)}Series`;
}

const addSeriesAndData = () => {
    computeRise(props.kdata.data)
    seriesOptions.color = rise.value ? '#29a1b2' : '#EF4C47'
    const seriesConstructor = getChartSeriesConstructorName(type.value);
    series = chart[seriesConstructor](seriesOptions);
    
    data.value = []
    props.kdata.data.forEach((item: any) => {
        data.value.push({time: parseInt(item[0]) / 1000, value: parseFloat(item[4])})
    })
    data.value.reverse();
    
    series.setData(data.value)
}

// 获取最新价格以及计算涨跌幅
const computeRise = (newData: any) => {
    lastPrice.value = newData[0][4]
    const firstPrice = newData[newData.length - 1][4]

    risePercent.value = ((lastPrice.value - firstPrice) / firstPrice * 100).toFixed(2) + '%'
    rise.value = lastPrice.value > firstPrice
    risePercent.value = rise.value ? '+' + risePercent.value : risePercent.value
    
}



onMounted(() => {
    chart = createChart(chartContainer.value, chartOptions)

    addSeriesAndData()

    if (priceScaleOptions) {
        chart.priceScale('right').applyOptions(priceScaleOptions);
    }

    if (timeScaleOptions) {
        chart.timeScale().applyOptions(timeScaleOptions);
    }

    chart.timeScale().fitContent();

    if (autosize) {
        window.addEventListener('resize', resizeHandler);
    }
})

onUnmounted(() => {
    if (chart) {
        chart.remove()
        chart = null
    }
})

watch(
  () => props.kdata,
  () => {
    addSeriesAndData();
  }
);



</script>
    
<style lang="scss" scoped>
.item {
    height: 109px;
    width: 108px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .item-info {
        
        .title {
            display: flex;
            font-size: 12px;
            gap: 5px;

            .coin-name {
                color: #333333;
            }

            .status {
                font-weight: 400;
            }

        }

        .price {
            font-size: 16px;
            font-weight: 700;
        }
    }

    .home-kline-container {
        .charts {
            height: 60px;
            width: 110px;
        }
    }
}

.rise {
    color: #29a1b2;
}

.fall {
    color: #EF4C47;
}   
    
</style>