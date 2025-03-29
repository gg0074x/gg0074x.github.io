<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  title: string;
}>();

const egg = ref(false);

function setEmoji(title: string) {
  if (title === "Rust") {
    egg.value = !egg.value;
  }
  console.log(egg.value);
}
</script>

<template>
  <div class="tech-container">
    <span class="dot"></span>
    <p :class="egg ? 'emoji' : ''" @mousedown="setEmoji(title)">{{ title }}</p>
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
.tech-container {
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
.go .dot {
  background-color: rgb(var(--go));
}
.javascript .dot {
  background-color: rgb(var(--js));
}
.typescript .dot {
  background-color: rgb(var(--ts));
}
.kotlin .dot {
  background-color: rgb(var(--kotlin));
}
.c .dot {
  background-color: rgb(var(--c));
}
.emoji:after {
  content: " 🦀";
}
</style>
