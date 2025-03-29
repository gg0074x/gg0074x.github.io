<script setup lang="ts">
defineProps<{
  title: string;
  url: string;
  description: string;
}>();
</script>

<template>
  <div class="button-container">
    <a :href="url" target="_blank">
      <p>{{ title }}</p>
      <span class="description">{{ description }}</span>
    </a>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  min-width: 80%;
  max-width: 80%;
  transition: ease-in-out 0.1s;
  border-radius: 8px;
  padding: 1.5% 0;
  margin: 2% 0;
}

.button-container:hover {
  transform: scale(1.1);
  background-color: var(--color-background-mute);
}

.button-container:hover .description {
  opacity: 1;
  margin: 2% 4%;
  max-height: 200px;
}

a {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.description {
  transition: ease-in-out 0.3s;
  opacity: 0;
  max-height: 0;
  font-size: small;
  color: var(--color-text-dimmed);
}

/* LANGUAGE CLASSES OR SOMETHING */
.rust:hover {
  background-color: rgba(var(--rust), 0.2);
}
.vue:hover {
  background-color: rgba(var(--vue), 0.2);
}
.go:hover {
  background-color: rgba(var(--go), 0.2);
}
.javascript:hover {
  background-color: rgba(var(--js), 0.2);
}
.typescript:hover {
  background-color: rgba(var(--ts), 0.2);
}
.kotlin:hover {
  background-color: rgba(var(--kotlin), 0.2);
}
.c:hover {
  background-color: rgba(var(--c), 0.2);
}

@media (max-width: 1024px) {
  .description {
    opacity: 1;
    max-height: 100px;
    font-size: small;
    margin: 0% 2%;
    color: var(--color-text-dimmed);
  }
  .button-container:hover .description {
    margin: 0% 2%;
    max-height: 200px;
  }
}
</style>
