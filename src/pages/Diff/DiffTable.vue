<template>
    <el-table :data="data.display" :row-style="rowStyle">
        <el-table-column v-for="key in props.fixedColumns" :prop="key" :label="key" />

        <el-table-column v-for="key in props.dynamicColumns" :key="key" :label="key">
            <template #default="scope">
                {{ scope.row[scope.column.label] }}
                <span v-if="+scope.row.addition === +scope.row.addition">
                    <DiffCellPostfix :n="judge(scope)" />
                </span>

            </template>

        </el-table-column>
    </el-table>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import DiffCellPostfix from './DiffCellPostfix.vue'

const props = defineProps<{
    data: {
        [prop: string]: number | string,
        addition: number | string
    }[],
    fixedColumns: string[],
    dynamicColumns: string[]
}>();

/**
 * divide raw data into two sections
 * display: data deleted, added and after changing
 * former: data before changing
 */
const data = reactive({
    display: props.data.filter((d) => +d.addition !== +d.addition || +d.addition >= 0),
    former: props.data.filter((d) => +d.addition < 0)
})

const judge = (scope: any) => {
    const former = data.former.filter((d) => +d.addition === -(+scope.row.addition))[0][scope.column.label]
    const latter = scope.row[scope.column.label]
    if (+former === +former) {
        // type keyType = 'Success Rate' | 'Total' | 'Succeeded' | 'Failed' | 'Unresolvable' // this is really really disgusting...
        const res = +latter - (+former as number)
        return Math.abs(res) >= 1 ? res : +res.toFixed(2)
    } else {
        return former === latter ? '' : former
    }
}

const rowStyle = ({ row }: { row: any }) => {
    return row.addition === 'add' ? { color: 'green' } : row.addition === 'delete' ? { color: 'red' } : {}
}

</script>

<style scoped>

</style>