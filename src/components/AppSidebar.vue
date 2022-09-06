<template>
    <el-menu default-active="1" :collapse="isCollapsed" :router="true" background-color="#123456" text-color="#cccccc">
        <el-menu-item class="flex-center" style="background-color: #224466">
            <span v-if="!isCollapsed" @click="update">BRAND</span>
            <el-icon v-if="isCollapsed">
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

const store = useStore();
const { isCollapsed } = storeToRefs(store) // needed to transform into reactive variable

const update = async () => {
    const response = await axios({
        method: 'get',
        url: '/api/update/',
    });
    console.log(response.data);
}
</script>

<style scoped>
.el-menu {
    height: 100%;
}
</style>
