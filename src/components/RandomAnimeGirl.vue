<script>
import { ref } from "vue";

export default {
    setup() {
        const urls = [
            "https://raw.githubusercontent.com/cat-milk/Anime-Girls-Holding-Programming-Books/master/Rust/Ai_Mie_Reading_The_Rust_Programming_Language.png",
            "https://raw.githubusercontent.com/cat-milk/Anime-Girls-Holding-Programming-Books/master/Rust/Tsukishima_Shijima_The_Rust_programming_language.png",
            "https://raw.githubusercontent.com/cat-milk/Anime-Girls-Holding-Programming-Books/master/Rust/Senko_Holding_The_Rust_Programming_Language.png",
            "https://raw.githubusercontent.com/cat-milk/Anime-Girls-Holding-Programming-Books/master/Rust/Shikanoko-The-Rust-Programming-Language.png",
            "https://raw.githubusercontent.com/cat-milk/Anime-Girls-Holding-Programming-Books/master/Rust/Nene_Sakura_Rust.png",
            "https://raw.githubusercontent.com/cat-milk/Anime-Girls-Holding-Programming-Books/master/Rust/Miyamizu_Mitsuha_On_Ownership_And_Borrowing.jpg",
        ];

        const url = ref(urls[Math.floor(Math.random() * urls.length)]);
        return {
            url,
        };
    },
};
</script>

<template>
    <main>
        <div class="anime-girl-container">
            <div class="img-container">
                <img :src="url" />
            </div>
        </div>
    </main>
</template>

<style scoped>
.anime-girl-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
}

.img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: fit-content;
    padding: 0.4rem;
    border: solid 1px var(--on-background);
}

img {
    max-width: 20vw;
}

@media only screen and (max-width: 1600px) {
    img {
        max-width: 30vw;
    }
}

@media only screen and (max-width: 600px) {
    img {
        max-width: 80vw;
    }
}

@media only screen and (max-width: 992px) and (min-width: 600px) {
    img {
        max-width: 50vw;
    }
}
</style>
