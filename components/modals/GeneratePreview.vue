<script setup lang="ts">
// const generateWar = async() =>  { 
//     try {
//         state.downloadLoading = true;
//         const dateRange = JSON.parse(JSON.stringify(state.dateRange))

//         if(dateRange.length <= 0) return console.log('ERROR!!! Please select date range');
//         const formattedPeriodCovered = `${dayjs(dateRange[0]).format('MMMM DD YYYY')} - ${dayjs(dateRange[1]).format('MMMM DD YYYY')}`;
//         const payload = { 
//             ...state.user,
//             periodCovered: formattedPeriodCovered,
//             accomplishmentReports: state.accomplishmentReports
//         }

//         const res  = await useFetch(`/api/clockify/generate-war`, {
//             method: 'post', body: payload
//         })
//         let a = document.createElement("a");
//         if (res.data.value) {
//             a.href = "data:image/png;base64," + res.data.value;
//             a.download = `${state.user.name}-${formattedPeriodCovered}-weekly-accomplishment-report.xlsx`;
//             // a.download = `heello-weekly-achievement-report.xlsx`;
//             a.click();
//         }
//     } catch (error) {
//         console.log('error :>> ', error);
//     } finally { 
//         state.downloadLoading = false
//     }
// }
</script>
<template>
    <div>
        <Button>
            <CloudDownload class="mr-2 text-sm w-4 h-4" /> Export
        </Button>
    </div>
</template>
