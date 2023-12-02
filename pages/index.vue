<template>
    <div style="margin: 40px">
        <a-row type="flex" justify="start" align="top" :gutter="[30, 20]">
            <a-col :span="12" justify="center" align="left">
                <a-range-picker @change="dateRangeOnChange" :size="state.size" style="width:400px;" />
            </a-col>
            <a-col :span="12" type="flex" justify="center" align="right">
                <a-button type="primary" :size="state.size" @click="state.showModal = true">
                    Input Details
                </a-button>
                <a-tooltip placement="top"> 
                    <template slot="title"><span>Download Weekly Accomplishment Reports</span></template>
                    <a-button type="primary" icon="download" :size="state.size" @click="printWar">
                    Download
                    </a-button>
                </a-tooltip>
            </a-col>
            <a-col :span="10" v-if="clockifyAcc" >
                <a-descriptions :column="1" title="User Details" size="small" bordered>
                    <a-descriptions-item label="Name">{{ clockifyAcc.name }}</a-descriptions-item>
                    <a-descriptions-item label="Position">{{ clockifyAcc.position }}</a-descriptions-item>
                </a-descriptions>
            </a-col>

            <a-col :span="24" >
                <a-spin tip="Loading..." class="center-loading" :spinning="tableLoading">
                    <div v-if="clockifyAcc">
                        <a-table :columns="columns" :data-source="accomplishmentReports" bordered size="small" :pagination="{ pageSize: 30 }"  :rowKey="(record,idx) => idx">
                            <a slot="name" slot-scope="text">{{ text }}</a>
                        </a-table>
                    </div>
                    <div v-else class="center-loading">
                        <h1>INPUT YOUR DETAILS HAHAHA</h1>
                    </div>
                </a-spin>
            </a-col>

        </a-row>
    </div>
</template>

<script setup>
import { ref } from 'vue'

//DATA
const state = reactive({ 
    // data
    clockifyAcc: {},
    accomplishmentReports: [],
    
    //events
    dateRange: [],
    showModal: false,
    fetchLoading: false,
    downloadLoading: false,
    // ui
    size: 'default',
})

const columns = [
    {title: "Date", dataIndex: "date", key: "date", scopedSlots: { customRender: "date" }, width: 150},
    {title: "Descriptions", dataIndex: "description", key: "description", width: 700},
    {title: "Start Time", dataIndex: "startTime", key: "startTime", width: 150, ellipsis: true,},
    {title: "End Time", dataIndex: "endTime", key: "endTime", width: 150, ellipsis: true,},
    {title: "Duration", dataIndex: "duration", key: "duration", width: 150, ellipsis: true, 
        customRender: (text, record) => {
            if (record.formattedTotalDurationPerDay) {
                return record.formattedTotalDurationPerDay;
            } else {
                return text;
            }
        }
    },
]
    

// const columns = [
//    {title: "Name", dataIndex: "name", key: "name"},
//    {title: "Descriptions", dataIndex: "descriptions", key: "descriptions"},
//    {title: "Notes", dataIndex: "notes", key: "notes"},
//    {title: "In/Out", dataIndex:"inOut", key:"inOut"},
//    {title: "Actions", dataIndex: "action", key: "action", scopedSlots: { customRender: "action" }, fixed: "right", width: 150}
// ]

//METHODS
const dateRangeOnChange = (dates) => {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}

// ASYNC METHODS
const fetchData = () =>  {
    console.log('Fetching data...')
    setTimeout(() => {
        console.log('Data fetched!')
    }, 2000)
}

const loadAcievementReports = async(userDetails, dateRange) =>  { 
    console.log('Loading Achievement Reports...')
    setTimeout(() => {
        console.log('Achievement Reports loaded!')
    }, 2000)
}
const printWar = async() =>  { 
    console.log('Printing WAR...')
    setTimeout(() => {
        console.log('WAR printed!')
    }, 2000)
}

fetchData()
</script>