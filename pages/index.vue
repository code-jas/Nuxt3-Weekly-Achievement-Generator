<script setup>
import { ref } from 'vue'

//DATA
const state = reactive({ 
    // data
    user: {},
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
    


//METHODS
const dateRangeOnChange = (dates) => {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    if(dates[0] && dates[1]){ 
        state.dateRange = dates
        loadAchievementReports(state.user, dates)
    } else { 
        state.dateRange = []
        loadAchievementReports(state.user)
    }
}

// ASYNC METHODS
const loadAchievementReports = async(userDetails, dateRange) =>  { 
    try {
        state.fetchLoading = true;
        let payload  = { ...userDetails}
        if (dateRange)  payload = { ...userDetails, dateRange }
        
        console.log('payload :>> ', payload);
        const {data}  = await useFetch(`/api/clockify/time-entries`, {
            method: 'post',
            body: payload
        })
        console.log("loadAchievementReports RES :>>" , data)
    } catch (error) {
        console.log("loadAchievementReports Error :>>" , error)
    } finally { 
        state.fetchLoading = false;
    }

}
const printWar = async() =>  { 
    const res  = await useFetch(`/api/clockify/generate-war`, {
    method: 'post',
    body: user
    })

    let a = document.createElement("a");
    if (res.data.value) {
        a.href = "data:image/png;base64," + res.data.value;
        console.log('res.data.value :>> ', res.data.value);
        // a.download = `${this.clockifyAcc.name}-${formattedPeriodCovered}-weekly-achievement-report.xlsx`;
        a.download = `heello-weekly-achievement-report.xlsx`;
        a.click();
    }
}

const fetchData = () =>  {
    // const user = useCookie<{ name: string }>('user')
    state.user = useCookie('user').value
    state.user  ?   loadAchievementReports(state.user) : state.showModal = true
}

fetchData()
// const user = {
//     name: 'John Doe',
//     position: 'Software Engineer'
// }

// const data  = await useFetch(`/api/clockify/time-entries`, {
//     method: 'post',
//     body: user
//     })
</script>


<template>
    <div style="margin: 40px">
        <a-row type="flex" justify="start" align="top" :gutter="[30, 20]">
            <a-col :span="12" justify="center" align="left">
                <a-range-picker @change="dateRangeOnChange" :size="state.size" style="width:400px;" />
            </a-col>
            <a-col :span="12" type="flex" justify="center" align="right">
                <a-button type="primary" :size="state.size" @click="state.showModal = true" style="margin-right: 12px;">
                    Input Details
                </a-button>
                <a-tooltip placement="top"> 
                    <template slot="title"><span>Download Weekly Accomplishment Reports</span></template>
                    <a-button type="primary" :size="state.size" @click="printWar">
                        <CommonIcon type="DownloadOutlined" /> Download
                    </a-button>
                </a-tooltip>
            </a-col>
            <a-col :span="10" v-if="state.user" >
                <a-descriptions :column="1" title="User Details" size="small" bordered>
                    <a-descriptions-item label="Name">{{ state.user.name }}</a-descriptions-item>
                    <a-descriptions-item label="Position">{{ state.user.position }}</a-descriptions-item>
                </a-descriptions>
            </a-col>

            <a-col :span="24" >
                <a-spin tip="Loading..." class="center-loading" :spinning="state.fetchLoading">
                    <div v-if="state.user">
                        <a-table :columns="columns" :data-source="state.accomplishmentReports" bordered size="small" :pagination="{ pageSize: 30 }"  >
                        </a-table>
                    </div>
                    <div v-else class="center-loading">
                        <h1>INPUT YOUR DETAILS HAHAHA</h1>
                    </div>
                </a-spin>
            </a-col>

        </a-row>
        <InputModal :open="state.showModal" @close="state.showModal = false"  @reload="fetchData"/>
    </div>
</template>

