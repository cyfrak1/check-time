<script>
    export let typeOfInput = 'text';
    export let placeholder = 'deafult text';
    export let inputValue;
    export let inputConfig = {
        id:'pleaseAddId',
        height:'100px',
        width:'200px',
        textPosition:'center'       
    }
</script>
<input 
    type={typeOfInput} 
    on:change={(event)=>{inputValue(event.target.value)}}
    class="container"
    placeholder={placeholder}
    style="--width:{inputConfig.width}; --height:{inputConfig.height}; --textPosition:{inputConfig.textPosition}" 
/>
<style>
    .container{
        height: var(--height);
        width: var(--width);
        color: #fff;
        background: #11161D;
        display: flex;
        align-items: center;
        justify-content: var(--textCenter);
        font-family: 'Popins', sans-serif;
        font-size: 1em;
        border: none;
        margin: 20px 0 20px 0;
        padding: 10px;
    }
    .container:focus{
        outline: none !important;
        border: 3px solid #51557E;
    }
</style>