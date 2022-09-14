<template>
    <main>
        <Start />
    </main>
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: ['auth'],
})
const flash = useFlash()






</script>

