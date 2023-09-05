<template>
    <div>My Account</div>
    <van-button type="primary" @click="back">Back</van-button>
</template>
    
<script setup lang='ts'>
import router from '@/router'

const back = () => {
    router.back()
}
</script>
    
<style>
    
</style>