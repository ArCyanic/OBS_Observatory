<template>
    <span v-if="(typeof props.n) === 'number'">
        <el-icon>
            <CaretTop color="green" v-if="props.n > 0" />
            <CaretTop color="red" v-else-if="props.n < 0" />
        </el-icon>
        <span v-if="props.n != 0" :style="{color: props.n > 0 ? 'green' : 'red'}">{{ props.n > 0 ? props.n : -props.n }}</span>
    </span>
    <span v-else-if="props.n != ''">
        <!-- <el-icon>
            <ArrowLeft />
        </el-icon> -->
        &nbsp &lt- &nbsp
        <!-- <span :style="{color: props.n === 'succeeded' ? 'green' : 'red'}">{{props.n}}</span> -->
        <span>{{props.n}}</span>
    </span>



</template>
<script setup lang="ts">
const props = defineProps<{
    n: number | string
}>()
</script>