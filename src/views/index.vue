<template>
    <div v-if="!isCoinbaseWallet">
        <noDapp />
    </div>
    <div v-else>
        <HomeView />
    </div>
</template>

<script setup lang="ts">
import { useStore } from '@/stores/store'
import HomeView from '@/views/HomeView.vue'
import noDapp from '@/components/precheck/noDapp.vue'

const store = useStore()
const isCoinbaseWallet = store.isCoinbaseWallet
</script>

<style scoped>
</style>
