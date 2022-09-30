<script>
	import Button from './../components/Button.svelte';
    import Title from "../components/Title.svelte";
    import {push} from 'svelte-spa-router'
    
    let data = [];
    let loading = false;
    let officePrograms;

    const loadOfficePrograms = () => {
        window.api.returnStoredOfficePrograms((data)=>{
            officePrograms = data;
        });
    }
    const checkIfItsAOfficeProgram = (program) => {
        let isOfficeProgram = false;
        if(officePrograms != undefined){
            if(officePrograms.length > 1){
                officePrograms.forEach((element,index) => {
                    if(element.name === program){
                        isOfficeProgram = true;
                    }
                });
            }
            else{
                if(officePrograms.name === program){
                    isOfficeProgram = true;
                }
            }
        }
        return isOfficeProgram;
    }
    const loadData = () => {
        loading = true;
        loadOfficePrograms();
        setTimeout(()=>{
            window.api.getCurrentPrograms().then(value => {
            data = value;
            loading = false;
        });
        },1000);
    }
    const saveAsOfficeProgram = ( nameOfprogram ) => {
        changeVisualAspectOfListElement(nameOfprogram);
    }
    const changeVisualAspectOfListElement = ( id ) => {
        const liInDoom = document.getElementById(id);
        if(liInDoom.classList.contains('container-programs-list-element--active')){
            liInDoom.classList.remove('container-programs-list-element--active');
            window.api.deleteFromListOfOfficePrograms(id);
            
            console.log(id)
        }
        else{
            liInDoom.classList.add('container-programs-list-element--active');
            window.api.saveListOfOfficePrograms({"name":id});
            console.log(id)
        }
    }
    const test = () => {
        push('/config')
    }
</script>
<div class="container">
    <div class="container-wrapper">
        <Title titleText="programy biurowe🧑‍💼"></Title>
        <p class="container-wrapper-text">Poniżej zostały wypisane  wszystkie programy na twoim komputerze. Aby aplikacja mogła zidentyfikować które programy należą do kategorii Programy Biurowe (Programy które są potrzebne pracownikowi do parcy) proszę zaznaczyć odpowiednie programy i przejść dalej.</p>
        <div class="search">
            <input class="search-input" type="text" placeholder="Szukaj programu" />
        </div>
    </div>
    <article class="container-programs">
        <ul class="container-programs-list">
            {#each data as program}
                {#if program.DisplayName != undefined && document.getElementById(program.DisplayName) == null}
                    <li 
                        id={program.DisplayName}
                        on:click={()=>{saveAsOfficeProgram(program.DisplayName)}} 
                        class="{ checkIfItsAOfficeProgram(program.DisplayName) ? 'container-programs-list-element container-programs-list-element--active' : 'container-programs-list-element'}"
                    >{program.DisplayName}</li>
                {/if}
            {/each}
            {#if data.length == 0 && loading == false}
                <div class="load">Kliknij🖱️ w poniższy guzik "Załaduj programy" aby załadować programy</div>
            {/if}
            {#if loading && data.length == 0}
                <div class="load">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            {/if}
        </ul>
    </article>
    <div class="container-button">
        <Button buttonName="Załaduj programy" buttonClicked={loadData}></Button>
        <Button buttonName="Dalej" buttonClicked={test}></Button>
    </div>
</div>
<style>
    .container{
        min-height: 100vh;
        width: 100%;
        background: #1B2430;
        position: absolute;
        top: 6vh;
    }
    .container-wrapper{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .container-wrapper-text{
        width: 80%;
        color: #fff;
        font-family: 'Popins', sans-serif;
        font-size: 1.3em;
        margin-top: 50px;
    }
    .search{
        height: 5vh;
        width: 80%;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        /* padding-right: 20px; */
    }
    .search-input{
        height: 30px;
        width: 300px;
        background: #fff;
        color: #fff;
        border: none;
    }
    .search-input:placeholder{
        color: #11161D;
    }
    .container-programs{
        width:100%;
        min-height: 40vh;
        margin-top: 5vh;
    }
    .container-programs-list{
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
    }
    .container-programs-list-element{
        min-height: 100px;
        min-width: 200px;
        background: #11161D;
        color: #fff;
        font-family: 'Popins', sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px;
        cursor: pointer;
    }
    .container-programs-list-element--active{
        background: #00df2d;
    }
    .container-button{
        height: 5vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        position: relative;
        bottom: 5vh;
        padding: 5vh;

    }
    .load{
        height: 20vh;
        width: 100%;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        font-family: 'Popins', sans-serif;
    }
    .dot{
        height: 40px;
        width: 40px;
        background: #11161D;
        position: absolute;
        border-radius: 100%;
    }
    .dot:nth-child(1){
        animation: animationForFirstDot 1.8s infinite;
    }
    .dot:nth-child(2){
        animation: animationForSecDot 1.8s infinite;
    }
    .dot:nth-child(3){
        animation: animationForThirdDot 1.8s infinite;
    }
    @keyframes animationForFirstDot{
        0%{
            transform: translateX(0%);
        }
        50%{
            transform: translateX(-200%);
        }
        100%{
            transform: translateX(0%);
        }
    }
    @keyframes animationForSecDot{
        0%{
            transform: scale(150%);
        }
        50%{
            transform: scale(100%);
        }
        100%{
            transform: scale(150%);
        }
    }
    @keyframes animationForThirdDot{
        0%{
            transform: translateX(0%);
        }
        50%{
            transform: translateX(200%);
        }
        100%{
            transform: translateX(0%);
        }
    }
</style>