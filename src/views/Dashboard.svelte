<script>
    import { onMount } from 'svelte';
    import { Pie } from 'svelte-chartjs';
    import { formatData } from '../data'
    import { checkCursor } from '../check-cursor';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
  } from 'chart.js';

  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
    window.api.ListenForRunningWindowsApps(()=>{})
    window.api.saveProgramRunningTime();
    checkCursor();
    window.api.processPythonScript()
    let data;
    onMount(async()=>{
        await formatData((data1)=>{data = data1});
    })
    setInterval(async()=>{
        await formatData((data1)=>{data = data1});
    },20000)
</script>
<div class="container">
    <div class="container-chart">
        {#if data}
            {#key data}
                <Pie {data} options={{ responsive: true }}/>
            {/key}
        {/if}
    </div>
</div>
<style>
    .container{
        height: 94vh;
        width: 100%;
        position: absolute;
        top: 6vh;
        background: #1B2430;
        padding: 20px;
    }
    .container-chart{
        height: 300px;
        width: 200px;
    }
</style>