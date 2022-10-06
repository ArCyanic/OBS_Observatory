<template>
    <el-tabs v-model="tabActiveName" class="tabs">
        <el-tab-pane :label="tabNames[0]" :name="tabNames[0]">
            <div>
                <div class="compare-picker" v-if="namesReceiver.data.length">
                    <span>Pick repositories</span>
                    <el-cascader v-model="modelName1_1" :options="namesReceiver.data" placeholder="Select Repository" />
                    <el-cascader v-model="modelName1_2" :options="namesReceiver.data" placeholder="Select Repository" />
                    <el-button :loading="loading" type="primary" @click="checkSpatial">Check</el-button>
                </div>
                <div v-if="spatialDiffDataReceiver.diff.length">
                    <DiffTableSpatial :data="spatialDiffDataReceiver.diff" :repositoryName1="repositoryName1"
                        :repositoryName2="repositoryName2" />
                    <div class="lists">
                        <ListTable :data="spatialDiffDataReceiver.same" name="Same for Both" />
                        <ListTable :data="spatialDiffDataReceiver.unique1" :name="'Unique for ' + repositoryName1 " />
                        <ListTable :data="spatialDiffDataReceiver.unique2" :name="'Unique for ' + repositoryName2 " />
                    </div>
                </div>
            </div>


        </el-tab-pane>
        <el-tab-pane :label="tabNames[1]" :name="tabNames[1]">
            <div class="compare-picker" v-if="namesReceiver.data.length">
                <span>Pick repository and dates</span>
                <el-cascader v-model="modelName2" :options="namesReceiver.data" placeholder="Select Repository"
                    @change="change" />
                <el-select v-model="modelDate1" :disabled="disabled" placeholder="Date 1">
                    <el-option v-for="item in datesReceiver.dates" :key="item" :label="item" :value="item" />
                </el-select>
                <el-select v-model="modelDate2" :disabled="disabled" placeholder="Date 2">
                    <el-option v-for="item in datesReceiver.dates" :key="item" :label="item" :value="item" />
                </el-select>
                <el-button :loading="loading" type="primary" @click="checkTemporal">Check</el-button>
            </div>
            <DiffTableTemporal :data="temporalDiffDataReceiver.data" :fixedColumns="['Package Name']" :dynamicColumns="['Status']" v-if="temporalDiffDataReceiver.data.length" :key="timer" />
        </el-tab-pane>
    </el-tabs>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { fetchData } from '../utils';
import { CompareRes, CascaderNames } from './DiffPackages/types'

import { ElMessage } from 'element-plus';

import DiffTableSpatial from './DiffPackages/DiffTableSpatial.vue';
import ListTable from './DiffPackages/ListTable.vue';
import DiffTableTemporal from './Diff/DiffTable.vue';


const tabActiveName = ref('Spatial')
const tabNames = ['Spatial', 'Temporal']

// Codes for Tab 'Spatial'
const loading = ref(false)

const modelName1_1 = ref([])
const modelName1_2 = ref([])
const repositoryName1 = computed(() => modelName1_1.value.length ? modelName1_1.value[0] + '_' + modelName1_1.value[1] : '')
const repositoryName2 = computed(() => modelName1_2.value.length ? modelName1_2.value[0] + '_' + modelName1_2.value[1] : '')

const namesReceiver = reactive<{ 'data': CascaderNames[] }>({ 'data': [] })

const spatialDiffDataReceiver = reactive<CompareRes>({
    unique1: [],
    unique2: [],
    same: [],
    diff: [],
})

const checkSpatial = async () => {
    // incorrect operation handling 
    if (modelName1_1.value.length == 0 || modelName1_2.value.length === 0) {
        ElMessage({
            message: 'Select correctly.',
            type: 'error'
        })
        return
    }

    // data receiving
    loading.value = true
    let addition = { repositoryName1: repositoryName1.value, repositoryName2: repositoryName2.value }
    await fetchData('/api/observatory-packages/getPackagesDiffSpatial', spatialDiffDataReceiver, addition)
    console.log(spatialDiffDataReceiver);
    loading.value = false

}

// Codes for Tab 'Temporal'
const modelName2 = ref([])
const repositoryName = computed(() => modelName2.value.length ? modelName2.value[0] + '_' + modelName2.value[1] : '')
const disabled = ref(true)
const modelDate1 = ref('')
const modelDate2 = ref('')

interface TemporalDiffData {
    'Package Name': string,
    'Status': string,
    'addition': string | number
}

const datesReceiver = reactive<{ dates: string[] }>({ dates: [] })
const temporalDiffDataReceiver = reactive<{data: TemporalDiffData[]}>({data: []})

const change = async () => {
    await fetchData('/api/observatory-packages/getDates', datesReceiver, { repositoryName: repositoryName.value })
    modelDate1.value = modelDate2.value = datesReceiver.dates.length ? datesReceiver.dates[0] : ''
    disabled.value = false
}

const timer = ref<number>(0)
const checkTemporal = async () => {
    if (modelDate1.value === '' || modelDate2.value === '') {
        ElMessage({
            message: 'Select correctly.',
            type: 'error'
        })
        return
    }
    await fetchData('/api/observatory-packages/getPackagesDiffTemporal', temporalDiffDataReceiver, {repositoryName: repositoryName.value, date1: modelDate1.value, date2: modelDate2.value})
    console.log(temporalDiffDataReceiver.data);
    
    timer.value = new Date().getTime()
}

onMounted(async () => {
    await fetchData('/api/observatory-packages/getRepositories', namesReceiver)
})




</script>

<style scoped>
.lists {
    display: flex;
    justify-content: space-between;
}
</style>