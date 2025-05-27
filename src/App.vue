<script setup>
import { ref, onMounted } from "vue";
import Loader from "./components/Loader.vue";
import Greet from "./components/Greet.vue";
import Philosophy from "./components/Philosophy.vue";
import Presentation from "./components/Presentation.vue";
import Tech from "./components/Tech.vue";
import RandomAnimeGirl from "./components/RandomAnimeGirl.vue";
import Music from "./components/Music.vue";
import Repos from "./components/Repos.vue";
import Error from "./components/Error.vue";
import Footer from "./components/Footer.vue";

const error = ref(false);

const loading = ref(true);
const imgUrl = ref("");
const repos = ref("");
const repoLangs = ref(new Array());

const imageSrc = "https://avatars.githubusercontent.com/gg0074x";
var firstTime = false;

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = reject;
        img.src = url;
    });
}

onMounted(async () => {
    try {
        if (localStorage.getItem("firstTime")) {
            firstTime = localStorage.getItem("firstTime") == "true";
        } else {
            firstTime = true;
        }

        imgUrl.value = await loadImage(imageSrc);
        let repoResponse = await fetch(
            "https://api.github.com/users/gg0074x/repos",
        );
        repos.value = await repoResponse.json();

        let repoLangArray = new Array();
        for (let i = 0; i < repos.value.length; i++) {
            let langResponse = await fetch(repos.value[i]["languages_url"]);
            let langJson = await langResponse.json();
            repoLangArray.push(langJson);
        }
        repoLangs.value = repoLangArray;

        if (firstTime) {
            await new Promise((r) => setTimeout(r, 2500));
            localStorage.setItem("firstTime", false);
        }
        loading.value = false;
    } catch (e) {
        error.value = true;
        console.error("Image failed to load", e);
    }
});
</script>

<template>
    <main>
        <div v-if="loading">
            <Loader />
        </div>
        <div v-else>
            <div v-if="error">
                <Error />
            </div>
            <div v-else>
                <Greet :imgSrc="imgUrl" />
                <Philosophy />
                <Presentation />
                <Tech />
                <RandomAnimeGirl />
                <Music />
                <Repos :repos="repos" :reposLangs="repoLangs" />
                <Footer />
            </div>
        </div>
    </main>
</template>

<style scoped></style>
