<template>
    <el-row justify="space-around" v-if="receiverTrend.data.length">
        <el-card style="width: 400px; height: 450px;" :body-style="{
            width: '100%', height: '80%', padding: '0px'
        }">
            <template #header>
                <div class="flex-center" >
                    <div>Package Building Trend</div>
                </div>
            </template>
            <MixedLineBar :data="receiverTrend.data" @check="check" />
        </el-card>

        <el-card style="width: 400px; height: 450px;" :body-style="{
            width: '100%', height: '80%', padding: '0px'
        }">
            <template #header>
                <div class="card-header">
                    <div>{{ receiverTrend.data[index].date }}</div>
                    <span>
                        <el-radio-group v-model="radio" size="small">
                            <el-radio-button label="Stack" />
                            <el-radio-button label="Table" />
                        </el-radio-group>
                    </span>
                </div>
            </template>
            <div class="flex-center" style="width: 100%; height: 100%">
                <Table :data="receiverTrend.data[index].data" v-if="radio === 'Table'" />
                <StackedColumn :data="receiverTrend.data[index].data" v-if="radio === 'Stack'" />
            </div>
        </el-card>
    </el-row>

    <el-card>
        <template #header>
            The Latest Projects Statistics 
        </template>
        <Table :data="receiverTable.data" />
    </el-card>
        
    
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue';

import Table from '@/components/ChartTable.vue'
import StackedColumn from './Statistic/StackedColumn.vue';
import MixedLineBar from './Statistic/MixedLineBar.vue';

import { Summary } from '../types';
import { fetchData } from '../utils';

const radio = ref('None') // Table | Stack
const index = ref(0)
const receiverTable = reactive({ data: [{}] })
const receiverTrend = reactive<{ data: Summary[] }>({ data: [] })

onBeforeMount(async () => {
    await fetchData('/api/observatory-project/getProjectStatistics', receiverTable)
    await fetchData('/api/observatory-project/getTrend', receiverTrend)
    
    radio.value = 'Stack'
    index.value = receiverTrend.data.length - 1
})

const check = (i: number) => {
    index.value = i
}

</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
/* :deep(.el-card) {
    background-color: #123456;
    color: white;
} */


</style>