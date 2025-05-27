<script>
import { ref } from "vue";

export default {
    setup() {
        const phrases = [
            "What if god said 'Segmention fault (core dumped)'",
            "Where some people see Σ, i see for(size_t i = 1; i <= n; i++)",
            "Rainy days are cool",
            "🐴 Morse",
            "Kasane Teto supremacy",
            "Nothing serious in here, seriously",
            "nop",
            "Too lazy to use more than two colors",
        ];

        const phrase = ref(phrases[Math.floor(Math.random() * phrases.length)]);
        return {
            phrase,
        };
    },
};
</script>

<template>
    <main>
        <div class="phil-container">
            <p>“{{ phrase }}”</p>
        </div>
    </main>
</template>

<style scoped>
.phil-container {
    color: var(--on-background);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30vh;
    width: 100w;
}
p {
    color: var(--on-background);
    font-family: "Satoshi";
    font-style: italic;
    font-size: 1.2rem;
}

@media only screen and (max-width: 600px) {
    p {
        font-size: 4vw;
    }
}
</style>
