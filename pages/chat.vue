<script lang="ts" setup>
definePageMeta({
    middleware: ['auth'],
})


const supabase = useSupabaseClient()
const { play } = useSound('../assets/not.mp3')
const name = useCookie("nameCookie")

const editName = ref(false)
const newName = ref(name.value)
const massage = ref("")

const massages = ref([])

const saveName = () => {
    name.value = newName.value
    editName.value = false
}

const sendMassage = async () => {
    if (massage.value) {
        const { data, error } = await supabase
            .from('massages')
            .insert([{ name: name.value, body: massage.value }])
        if (error) {
            console.log(error)
        }
    }


    massage.value = ""
}

const fetchData = async () => {
    await supabase
        .from('massages')
        .select('*')
        .order('id', { ascending: false })
        .then(({ data, error }) => {
            if (error) {
                console.log(error)
            }
            massages.value = data
        })
}

onMounted(() => {
    fetchData()
})


watchEffect(async () => {

    await supabase
        .from('massages')
        .on('INSERT', (payload) => {
            fetchData()
            play()
        })
        .subscribe()
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
            <div v-for="item in massages" key="item.id" m="2" border="rounded" bg="gray-3" flex="lg:~ row" justify="between">
                <div flex="lg:~ row gap-2">
                    <MazAvatar m="x-2" size="0.5rm" src="https://pbs.twimg.com/profile_images/598181608198381570/-cFG43y2_400x400.jpg" />
                    <div m="y-3">{{item.name}}</div>
                    <div m="y-3">
                        {{item.body}}
                    </div>
                </div>
                <div flex="lg:~ row gap-2" m="y-2">
                    <div m="y-2">
                        {{item.created_at.slice(0,10)}}
                    </div>
                    <UiIcon m="y-2 r-2" text="lg" icon="i-healthicons:i-schedule-school-date-time-outline" />
                </div>
            </div>
        </div>
    </div>
</template>

