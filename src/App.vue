<script setup>
import { RouterView } from 'vue-router'
import MyHeader from './components/MyHeader.vue';
</script>

<template>
  <MyHeader/>
  <RouterView />
</template>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>
