<script>
   const disActiveWindow = () => {
    window.api.disActiveWindow();
   }
   const minimalizeWindow = () => {
    window.api.minimalizeWindow();
   }
   const fullWindow = () => {
    window.api.fullWindow();
    }   
</script>
<nav class="wrapper">
    <div class="wrapper-container">
        <img src="assets/icon.png" height="20px" width="20px" style="margin: 10px;" alt="logo"/>
    </div>
    <div class="wrapper-container">
        <button class="wrapper-container-winowsBtn" on:click={minimalizeWindow}>
            <img src="assets/remove.png" width="15px" height="15px" alt="close"/>
        </button>
        <button class="wrapper-container-winowsBtn" on:click={fullWindow}>
            <img src="assets/full.png" width="15px" height="15px" alt="full window"/>
        </button>
        <button class="wrapper-container-winowsBtn" on:click={disActiveWindow}>
            <img src="assets/close.png" width="20px" height="20px" alt="close"/>
        </button>
    </div>
</nav>
<style>
    .wrapper{
        height: 6vh;
        width: 100%;
        background: #11161D;
        display: flex;
        position: fixed;
        top: 0;
        -webkit-app-region:drag;  /* makes titlebar dragable*/
        z-index: 100000000;
    }
    .wrapper-container{
        height: 100%;
        width: 50%;
        display: flex;
    }
    .wrapper-container:nth-child(1){
        align-items: center;
        justify-content: flex-start;
    }
    .wrapper-container:nth-child(2){
        display: inline-flex;
        align-items: center;
        justify-content: flex-end;
    }
    .wrapper-container-winowsBtn{
        height: 100%;
        width: 70px;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        cursor: pointer;
        -webkit-app-region:no-drag;
    }
    .wrapper-container-winowsBtn:hover{
        background: #253040;
    }
    .wrapper-container-winowsBtn:nth-child(3):hover{
        background: #d82525;
    }
</style>