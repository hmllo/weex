<template>
    <div class="unauthorized">
        <div class="container">
            <div class="img-container">
                <img :src="svgURL" alt="">
            </div>
            <div class="text-container">
                <div class="title">{{ title }}</div>
                <div class="subtitle">{{ subtitle }}</div>
                <div class="subtitle">{{ desc }}</div>
            </div>
            <div class="copy-btn">
                <van-button type="primary" class="btn" color="#29a1b2" @click="clickCopy">
                    <svg data-v-9b7784eb="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" class="iconify iconify--ri"><path fill="currentColor" d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.006-1H7ZM5.002 8L5 20h10V8H5.002ZM9 6h8v10h2V4H9v2Z"></path></svg>
                    {{ copyLink }}
                </van-button>

            </div>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import i18n from '@/locale'
import useClipboard from 'vue-clipboard3'
import { showToast } from 'vant'
import svgURL from '@/assets/unauthorization.svg'

const title = i18n.global.t('noDapp.title')
const subtitle = i18n.global.t('noDapp.subtitle')
const desc = i18n.global.t('noDapp.desc')
const copyLink = i18n.global.t('noDapp.copyLink')

const { toClipboard } = useClipboard()

const clickCopy = async () => {
    await toClipboard(window.location.href)
    showToast({
        message: i18n.global.t('common.copySuccess'),
        position: 'bottom'
    })
}
</script>
    
<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .text-container {
        display: flex;
        flex-direction: column;
        gap: 5px;
        justify-content: center;
        align-items: center;

        .title {
            color: #000;
            font-weight: 700;
            font-size: 22px;
            text-align: center;
        }

        .subtitle {
            color: #000;
            font-weight: 400;
            font-size: 16px;
            text-align: center;
        }
    }

    .copy-btn {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .btn {
            width: 343px;
            height: 40px;
        }
    }


}
</style>