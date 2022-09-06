<template>
    <div class="date-checker">
        <span>Pick Time</span>
        <el-select v-model="receiver.date1">
            <el-option v-for="item in receiver.options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="receiver.date2">
            <el-option v-for="item in receiver.options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button type="primary" @click="check" >Check</el-button>
    </div>
    <DiffTable :data="receiver.data" v-if="receiver.data.length" :key="timer" />
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue';
import { fetchData } from '../utils';
import DiffTable from './Diff/DiffTable.vue'

import { DiffItem } from '../types';

interface Option {
    value: string,
    label: string,
    children?: Option
}
const receiver = reactive<{ data: DiffItem[], date1: string, date2: string, options: Option[] }>({
    data: [],
    date1: '',
    date2: '',
    options: []
})

onBeforeMount(async () => {
    await fetchData('/api/observatory-project/getDiff', receiver)
})

const timer = ref<number>(0)
const check = async () => {
    await fetchData('/api/observatory-project/getDiff', receiver, { date1: receiver.date1, date2: receiver.date2 })
    console.log('refresh', receiver.data);
    timer.value = new Date().getTime()
}

</script>

<style scoped>
.date-checker {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 35%;
}
</style>