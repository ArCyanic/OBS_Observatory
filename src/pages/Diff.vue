<template>
    <div class="compare-picker">
        <span>Pick Time</span>
        <el-select v-model="receiver.date1" placeholder="former">
            <el-option v-for="item in receiver.options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="receiver.date2">
            <el-option v-for="item in receiver.options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button type="primary" @click="check" placeholder="latter" >Check</el-button>
    </div>
    <DiffTable :data="receiver.data" :fixed-columns="fixedColumns" :dynamic-columns="dynamicColumns" v-if="receiver.data.length" :key="timer" />
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue';
import { fetchData } from '../utils';
import DiffTable from './Diff/DiffTable.vue'

import { DiffItem } from './Diff/types';

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

const fixedColumns = ['Project Name', 'Repo Name']
const dynamicColumns = ref<string[]>([])

onBeforeMount(async () => {
    await fetchData('/api/observatory-projects/getDiff', receiver)
    dynamicColumns.value = Object.keys(receiver.data[0]).slice(2, -1)
})

const timer = ref<number>(0)
const check = async () => {
    await fetchData('/api/observatory-projects/getDiff', receiver, { date1: receiver.date1, date2: receiver.date2 })
    timer.value = new Date().getTime()
}

</script>

<style scoped>

</style>