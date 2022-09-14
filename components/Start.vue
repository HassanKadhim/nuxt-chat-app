<script lang="ts" setup>
import { watchEffect } from '#imports'
const name = ref()
//save the name in the cookie
const nameCookie = useCookie("nameCookie");

const saveName = () => {
    const nameCookie = useCookie("nameCookie");
    nameCookie.value = name.value
    // if (nameCookie.value) {
    //     navigateTo("chat");
    // }

}

watchEffect(() => {
    if (name.value) {
        navigateTo("chat");
    }
})


</script>

<template>
    <main>
        <div m="y-2" flex="lg:~ row gap-2" justify="content lg:center">
            <h1>Welcome Chat App</h1>
        </div>
        <div class="">
            <div p="4" class="flex flex-col gap-2" bg="gray" border="rounded-lg">
                <div>Enter your Name</div>
                <MazInput v-model="name" size="sm" placeholder="Enter your Name" />
                <MazBtn @click="saveName" class="mt-2" size="sm">Go</MazBtn>
            </div>
        </div>


    </main>
</template>