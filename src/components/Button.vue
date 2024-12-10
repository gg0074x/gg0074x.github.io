<script setup lang="ts">
defineProps<{
  title: string,
  url: string,
  description: string
}>();
</script>

<template>
  <div class="button-container">
    <a :href=url target="_blank">
      <p>{{ title }}</p>
      <span class="description">{{ description }}</span>
    </a>
  </div>
</template>

<style scoped>
.button-container{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  min-width: 80%;
  max-width: 80%;
  transition: ease-in-out 0.25s;
  border-radius: 8px;
  padding: 1.5% 0;
  overflow: hidden;
}

.button-container:hover{
  transform: scale(1.1);
  background-color: var(--color-background-mute);
}

.button-container:hover .description{
  opacity: 1;
  margin: 2% 4%;
  max-height: 200px
}

a{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.description{
  transition: ease-in-out 0.5s;
  transition-delay: 0.7s;
  opacity: 0;
  max-height: 0;
  font-size: small;
}
</style>
