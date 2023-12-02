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

]
    

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