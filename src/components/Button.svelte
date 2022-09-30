<script>
    export let buttonName = "Button content";
    export let buttonHeight = "50px";
    export let buttonWidth = "200px";
    export let buttonClicked;
    const outputData = () => {
        buttonClicked(true);
    }
</script>
<button style="--width:{buttonWidth}; --heigth:{buttonHeight}" class="wrapper" on:click={outputData}>
    <p class="wrapper-text">{buttonName}</p>
</button>
<style>
.wrapper{
    height: var(--heigth);
    width: var(--width);
    background: #51557E;
    color: #fff;
    margin-top: 30px;
    margin-left: 10px;
    border: none;
    border-radius: 55px;
    cursor: pointer;
}
.wrapper-text{
    text-transform: uppercase;
    font-family: 'Poppins', sans-serif;
    font-weight: bolder;
}
</style>