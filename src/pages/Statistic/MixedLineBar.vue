<template>
    <div id="mixed_line_bar" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted } from "vue";
import { Summary } from "../../types";

const props = defineProps<{
    data: Summary[]
}>()

const emits = defineEmits<(event: 'check', i: number) => void>()

onMounted(() => {
    console.log(props.data)
    let chart = echarts.init(
        document.getElementById("mixed_line_bar") as HTMLElement
    );
    let series: { name: string, type: string, data: number[] }[] = props.data[0].data.map((d) => d.category).map((category, index) => {
        return {
            name: category,
            type: 'bar',
            data: props.data.map((day) => day.data[index].total)
        }
    });
    series.push({
        name: 'total',
        type: 'line',
        data: props.data.map((day) => day.total)
    })
    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        legend: {
            data: [...props.data[0].data.map((d) => d.category), 'total']
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
                type: 'category',
                data: props.data.map((day) => day.date),
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                // name: 'Partition',
                // min: 0,
                // max: 250,
                // interval: 50,
            },
            {
                type: 'value',
                // name: 'Total',
                // min: 0,
                // max: 25,
                // interval: 5,
            }
        ],
        series: series
    };
    chart.setOption(option as any)
    chart.on('click', function (params: any) {
        emits('check', params.dataIndex)
        console.log('click in mixed');
        
    })
})
</script>

<style scoped>
</style>