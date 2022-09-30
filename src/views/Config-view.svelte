<script>
	import Title from './../components/Title.svelte';
	import Input from './../components/Input.svelte';
	import Button from './../components/Button.svelte';
    import {push} from 'svelte-spa-router';

    let firstInputValue = '', secoundInputValue = '';
    let isAlertActive = false, isConfigComplete = false;
    const inputConfig = {
        height: '70px',
        width: '350px',
        textPosition: 'flex-start',
    }
    const firstInputValueFun = ( value ) => {
        firstInputValue = value;
    }
    const secoundInputValueFun = ( value ) => {
        secoundInputValue = value;
    }
    const buttonClicked = () => {
        if(firstInputValue === secoundInputValue && firstInputValue != '' && secoundInputValue != ''){
            window.api.savePassword(firstInputValue);
            isConfigComplete = true;
        }
        else{
            isAlertActive = true;
        }
    }
    const buttonConfigClicked = () => {
        window.api.setFirstUse();
        push('/dashboard');
    }
</script>
<div class="container">
        <Title titleText="Ustaw hasło🔑" margin="0"></Title>
        <div class="container-wrapper">
            <Input 
                typeOfInput="password" 
                inputConfig={inputConfig} 
                placeholder="Podaj hasło"
                inputValue={(value)=>{firstInputValueFun(value)}}
            ></Input>
            <Input 
                typeOfInput="password" 
                inputConfig={inputConfig} 
                placeholder="Powtórz hasło"
                inputValue={(value)=>{secoundInputValueFun(value)}}
            ></Input>
            {#if isAlertActive}
                <div class="container-wrapper-alert">
                    <p class="contaier-wrapper-alert-text">Niezgodność haseł spróbuj wpisać hasło ponownie</p>
                </div>
            {/if}
            <Button 
                buttonName="Dalej"  
                buttonWidth="350px"
                buttonClicked={buttonClicked} 
            ></Button>
        </div>
        {#if isConfigComplete}
            <div class="container-complete">
                <Title titleText="Konfiguracja zakończona🔥" margin="'10vh 0 0 0'"></Title>
                <p class="container-complete-text">Od tego momentu aplikacja check time będzie monitorować twojego pracownika. </p>
                <Button 
                    buttonName="Dalej"
                    buttonClicked={buttonConfigClicked} 
                ></Button>
                <img class="container-complete-logo" src="assets/icon.png" height="200" width="200" alt="logo" />
            </div>
        {/if}
        <img class="container-logo" src="assets/icon.png" height="200" width="200" alt="logo" />
</div>
<style>
    .container{
        height: 94vh;
        width: 100%;
        background: #1B2430;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: absolute;
        top: 6vh;
        overflow: hidden;
    }
    .container-wrapper{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 20px;
    }
    .container-logo{
        position: absolute;
        top: calc(102vh - 200px);
        left: calc(105vw - 200px);
        transform: rotate(-40deg);
    }
    .container-wrapper-alert{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .contaier-wrapper-alert-text{
        color: rgb(255, 0, 0);
        font-family: 'Popins', sans-serif;
        font-size: .8em;
    }
    .container-complete{
        height: 94vh;
        width: 100%;
        background: #1B2430;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        position: absolute;
        top: 6vh;
        z-index: 100;
    }
    .container-complete-text{
        color: #fff;
        font-family: 'Popins', sans-serif;
        margin-top: 10px;
    }
    .container-complete-logo{
        position: absolute;
        top: calc(100vh - 210px);
        left: 0;
    }
</style>