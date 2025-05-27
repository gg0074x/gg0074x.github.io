<script setup>
import { onMounted, ref } from "vue";
import Error from "./Error.vue";

const props = defineProps(["repos", "reposLangs"]);

const error = ref(false);

if (!props.repos || !props.reposLangs || !props.reposLangs[0]) {
    error.value = true;
}
</script>

<template>
    <main>
        <div class="repos-container" v-if="!error">
            <h2>My projects in GitHub</h2>
            <div class="repo-card" v-for="(repo, index) in props.repos">
                <a class="clickonme" :href="repo['html_url']" target="_blank">
                    <h2 class="repo-name">{{ repo["name"] }}</h2>
                    <h3 v-if="repo['fork']">Forked</h3>
                    <p class="description">{{ repo["description"] }}</p>
                    <div class="langs">
                        <p
                            class="lang"
                            v-for="lang in Object.keys(props.reposLangs[index])"
                        >
                            {{ lang }}
                        </p>
                    </div>
                </a>
            </div>
        </div>
        <div v-else>
            <Error />
        </div>
    </main>
</template>

<style scoped>
.repos-container {
    display: grid;
    grid-gap: 1rem;
    height: max-content;
    width: 100vw;
    padding: 5rem;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    justify-items: center;
    align-items: center;
}

.repo-card {
    display: flex;
    flex-direction: column;
    aspect-ratio: 0.8;
    width: 80%;
    border: solid 1px var(--on-background);
    padding: 0;
    transition: ease-in-out 0.2s;
}

.repo-card:hover {
    box-shadow: 5px 5px 0px var(--on-background);
}

h2 {
    color: var(--on-background);
    font-family: "Satoshi";
}

h2.repo-name {
    font-size: 100%;
    margin: 0px;
    padding: 0.2rem 0.7rem;
    background-color: var(--on-background);
    width: max-content;
    color: var(--color-background);
    font-family: "Satoshi";
}

h3 {
    margin: 0px;
    font-size: 96%;
    color: var(--on-background);
    font-family: "Satoshi";
}

p {
    font-size: 90%;
}

p.description {
    color: var(--on-background);
    font-family: "Satoshi";
}

.langs {
    justify-self: end;
    display: flex;
    flex-wrap: wrap-reverse;
    gap: 4px;
    margin-top: auto;
}

p.lang {
    margin: 0;
    width: max-content;
    padding: 0 0.6rem;
    border: solid 1px var(--on-background);
    border-radius: 50px;
    color: var(--on-background);
    font-family: "Satoshi";
}

a.clickonme {
    width: 100%;
    height: 100%;
    text-decoration: none;
    padding: 1rem;
    display: flex;
    flex-direction: column;
}

@media only screen and (max-width: 1600px) {
    .repos-container {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
}

@media only screen and (max-width: 1200px) {
    .repos-container {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media only screen and (max-width: 600px) {
    .repos-container {
        display: flex;
        flex-direction: column;
        max-height: 60vh;
        overflow-x: hidden;
        overflow: scroll;
        width: 90%;
    }
}

@media only screen and (max-width: 992px) and (min-width: 600px) {
    .repos-container {
        display: flex;
        flex-direction: column;
        max-height: 60vh;
        overflow-x: hidden;
        overflow: scroll;
        width: 50%;
    }
}
</style>
