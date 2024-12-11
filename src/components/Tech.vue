<script setup lang="ts">
defineProps<{
  title: string,
}>();
</script>

<template>
  <div class="tech-container">
    <span class="dot"></span>
    <p>{{ title }}</p>
  </div>
</template>

<style scoped>
.dot {
  height: 8px;
  width: 8px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}
.tech-container{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5% 0;
  width: 100%;
  gap: 2%;
}

/* LANGUAGE CLASSES OR SOMETHING */
.rust .dot {
  background-color: rgb(var(--rust));
}
.vue .dot {
  background-color: rgb(var(--vue));
}
</style>
