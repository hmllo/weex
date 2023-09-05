<template>
    <van-nav-bar :title="app_name" class="navbar" fixed>
        <template #left>
            <van-icon name="wap-nav" size="25" color="#000" @click="show_menu"/>
        </template>
    </van-nav-bar>

    <Menu ref="menu" />

</template>
    
<script setup lang='ts'>
import i18n from '@/locale'
import { ref } from 'vue'
import Menu from '@/views/menu/Menu.vue'

const app_name = i18n.global.t('common.appName')

const menu: any = ref(null)

const show_menu = () => {
    menu.value.show = true
}

</script>
    
<style lang="scss" scoped>
.navbar {
    height: 55px;
}
</style>