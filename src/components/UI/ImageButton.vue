<template>
    <Button class="image-button">
        <slot></slot>
    </Button>  
</template>

<script>

export default {
    name: 'ImageButton',
    props: {
        color: {
            type: String,
            default: 'teal'
        }
    }
}

</script>

<style>
    .image-button {
        border: none;
        background-color: transparent;
        padding: 5px 10px;
    }

    .image-button svg {
        scale: 1.3;
        fill: v-bind(color);
    }

    .image-button:hover svg {
        cursor: pointer;
        fill: black;
    }
</style>
    