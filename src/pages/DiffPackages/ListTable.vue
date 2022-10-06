<template>
    <el-card :body-style="{padding: '5px'}" style="width: 33%">
        <template #header> 
            <span>{{name}}</span>
        </template>
        <el-table :data="props.data" height="300">
            <el-table-column prop="packageName" label="Package Name" />
            <el-table-column prop="status" label="Status" />
        </el-table>
    </el-card>

</template>

<script setup lang="ts">
import { BuildData } from './types';
const props = defineProps<{
    data: BuildData[],
    name: string
}>()


</script>

<style scoped>

</style>