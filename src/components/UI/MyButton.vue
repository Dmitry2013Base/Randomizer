<template>
    <Button class="button">
        <slot></slot>
    </Button>  
</template>

<script>

export default {
    name: 'MyButton'
}

</script>

<style scoped>
    .button {
        border: 2px solid teal;
        background-color: transparent;
        color: teal;
        font-size: 14px;
        font-weight: bold;
        padding: 5px 10px;
    }

    .button:hover {
        cursor: pointer;
        background-color: bisque;
    }

    .button:disabled {
        border: 2px solid lightgray;
        color: lightgray;
        pointer-events: none;
    }
</style>
    