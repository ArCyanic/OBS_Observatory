<template>
    <el-card>
        <template #header>
            Difference between {{props.repositoryName1}} and {{props.repositoryName2}}
        </template>
        <el-table :data="props.data" height="300">
            <el-table-column prop="packageName" label="Package Name" />
            <el-table-column prop="status1" :label="props.repositoryName1" />
            <el-table-column prop="status2" :label="props.repositoryName2" />
        </el-table>
    </el-card>
</template>

<script setup lang="ts">
import { DiffTableItem } from './types'

const props = defineProps<{
    data: Array<DiffTableItem>;
    repositoryName1: string;
    repositoryName2: string;
}>()


</script>

<style scoped>

</style>