<script lang="ts" setup>
definePageMeta({
    middleware: ['auth'],
})

const supabase = useSupabaseClient()


const name = useCookie("nameCookie")

const editName = ref(false)
const newName = ref(name.value)
const massage = ref("")

const saveName = () => {
    name.value = newName.value
    editName.value = false
}


const sendMassage = async () => {
    const { data, error } = await supabase
        .from('massages')
        .insert([{ name: name.value, body: massage.value }])
    if (error) {
        console.log(error)
    }
}


async function getMassages() {
    const { data, error } = await supabase
        .from('massages')
        .select('*')
    if (error) {
        console.log(error)
    }
    return data
}

const mySubscription = supabase
    .from('massages')
    .on('INSERT', (payload) => {
        console.log('Change received!', payload)
    })
    .subscribe()

watchEffect(async () => {

    const data = await getMassages()

    const mySubscription = supabase
        .from('massages')
        .on('INSERT', (payload) => {
            console.log('Change received!', payload)
        })
        .subscribe()

    console.log(mySubscription)

})





</script>
<template>
    <div m="4" flex="lg:~ row gap-2" justify="between">
        <div flex="lg:col basis-1/4 " bg="red" border="rounded-lg" h="screen">
            <div m="1" flex="lg: row gap-2" justify="between" bg="gray-200" border="rounded-lg">
                <div v-if="!editName">
                    <div p="2">
                        your Name : {{name}}
                    </div>
                </div>
                <div v-else>
                    <MazInput class="m-2" size="xs" v-model="newName" placeholder="your name" />
                </div>
                <div>
                    <MazBtn v-if="!editName" @click="editName= true" m="2" size="xs" color="transparent">
                        <UiIcon icon="i-bx:edit" />
                    </MazBtn>
                    <MazBtn v-else @click="saveName" m="2" size="xs" color="transparent">
                        <UiIcon icon="i-akar-icons:check" />
                    </MazBtn>
                </div>
            </div>
            <div m="x-1 y-10">
                <div flex="lg:~ row" w="full">
                    <div w="full">
                        <MazInput class="m-2" size="md" v-model="massage" placeholder="your massage" />
                    </div>
                    <div>
                        <MazBtn @click="sendMassage" fab class="mt-2" size="md">
                            <UiIcon icon="i-akar-icons:send" />
                        </MazBtn>
                    </div>
                </div>
            </div>
        </div>
        <div flex="lg:col basis-3/4" bg="blue" border="rounded-lg">
            <div>
                <MazBtn @click="getMassages" fab class="mt-2" size="md">
                    <UiIcon icon="i-akar-icons:send" />
                </MazBtn>
            </div>
        </div>
    </div>
</template>

