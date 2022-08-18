<template>
    <div ref="chartContainer" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
const props = defineProps<{
    data: { category: string; success: number; total: number; successRate: number }[];
}>();

const chartContainer = ref()

onMounted(() => {
    console.log(props); 
    let chart = echarts.init(
        chartContainer.value, 
    );
    let option = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },
        legend: {
            top: '3%'
        },
        grid: {
            top: "12%",
            left: "5%",
            right: "5%",
            bottom: "0%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                data: props.data.map((d) => d.category),
                axisLabel: {fontSize: 10}
            },
            
        ],
        yAxis: [
            {
                type: "value",
            },
        ],
        series: [
            {
                name: "Succeeded",
                type: "bar",
                barWidth: 5,
                stack: "stack",
                emphasis: {
                    focus: "series",
                },
                data: props.data.map((d) => d.success),
            },
            {
                name: "Others",
                type: "bar",
                stack: "stack",
                emphasis: {
                    focus: "series",
                },
                data: props.data.map((d) => d.total - d.success),
            },
        ],
    };
    chart.setOption(option as any);
});
</script>

<style scoped>
</style>
