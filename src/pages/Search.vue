<template>
    <el-row>
        <el-input v-model="packageName" style="width: 20%;" placeholder="Package Name">
            <template #append>
                <el-button :icon="Search" @click="search" /> 
            </template> 
        </el-input> 
    </el-row> 

    <el-table :data="receiver.data" v-if="receiver.data.length"> 
        <el-table-column prop="projectName" label="Project" />
        <el-table-column prop="packageName" label="Package" />
    </el-table>
</template>

<script setup lang="ts"> 
import { fetchData } from '../utils'; 
import { Search } from '@element-plus/icons-vue' 
import { reactive, ref } from 'vue'; 

interface SearchItem {
    projectName: string,
    packageName: string,
}

const packageName = ref('')
const receiver = reactive<{ data: SearchItem[] }>({ data: [] })
const search = async () => {
    fetchData('/api/observatory-packages/search-package', receiver, { 'packageName': packageName.value })
    console.log(receiver.data)
}
</script>

<style scoped>
</style>