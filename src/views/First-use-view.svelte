<script>
	import Button from '../components/Button.svelte';
    import {push} from 'svelte-spa-router';
    const buttonClicked = ( boolean ) => {
        if (boolean) {
            push('/program-list');
        }
    }
</script>

<div class="wrapper">
    <img class="wrapper-logo" src="assets/icon.png" height="200" width="200" alt="logo" />
    <p class="wrapper-text">Witaj w aplikacji check time, która służy do kontrolowania czasu pracy pracownika. Od tego momentu twoja praca na komputerze będzie rejestrowana i zamieniana na dane które będą widoczne dla ciebie i twojego pracodawcy.</p>
	<Button 
        buttonClicked={buttonClicked} 
        buttonHeight="80px" 
        buttonWidth="300px"
        buttonName="Akceptuje i przechodzę dalej"
    ></Button>
</div>

<style>
	.wrapper{
        height: 100vh;
        width: 100%;
        background: #1B2430;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .wrapper-text{
        height: 100px;
        width: 700px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Popins', sans-serif;
        font-weight: 300;
    }
</style>