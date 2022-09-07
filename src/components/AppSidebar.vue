<template>
    <el-menu default-active="1" :collapse="isCollapsed" :router="true" background-color="#123456" text-color="#cccccc">
        <el-menu-item class="flex-center" style="background-color: #224466" index="">
            <span v-if="!isCollapsed" @click="update">Tarsier-OERV</span>
            <el-icon v-if="isCollapsed" @click="updateAll">
                <Platform />
            </el-icon>
        </el-menu-item>
        <!-- use :router="true" rather than router="true", or compiler will warn you with string "true" -->
        <el-sub-menu index="/projects-observatory">
            <template #title>
                <el-icon>
                    <Management />
                </el-icon>
                <span>Projects Observatory</span>
            </template>
            <el-menu-item index="/projects-observatory/statistic">Statistic</el-menu-item>
            <el-menu-item index="/projects-observatory/diff">Diff</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/packages-observatory">
            <template #title>
                <el-icon><TakeawayBox /></el-icon>
                <span>Packages Observatory</span>
                
            </template>
            <el-menu-item index="/packages-observatory/search">Search</el-menu-item>
        </el-sub-menu>

    </el-menu>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "../store";
import axios from "axios";

import { h } from 'vue'
import { ElMessage } from 'element-plus'

const store = useStore();
const { isCollapsed } = storeToRefs(store) // needed to transform into reactive variable

const update = async () => {
    let response = await axios({
        method: 'get',
        url: '/api/update/updateLocal',
    });
    console.log(response.data);
    ElMessage({
        message: 'Data updated, please refresh web.',
        type: 'success',
  })
}

const updateAll = async () => {
    let response = await axios({
        method: 'get',
        url: '/api/update/updateRepository',
    });
    ElMessage({
        message: 'Start update data, this may take a few minutes.',
  })
    response = await axios({
        method: 'get',
        url: '/api/update/updateLocal',
    });
    console.log(response.data);
    ElMessage({
        message: 'Data updated, please refresh web.',
        type: 'success',
        showClose: true,
        duration: 0
  })
}
</script>

<style scoped>
.el-menu {
    height: 100%;
}
</style>
