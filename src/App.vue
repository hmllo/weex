<template>
    <router-view />
</template>

<script setup lang="ts">
import { useStore } from '@/stores/store'
import { onMounted } from 'vue'

const store = useStore()

onMounted(() => {
    if (typeof window.ethereum !== 'undefined') {
        store.setIsCoinbaseWallet(true)
    }
})
</script>

<style scoped>
</style>
