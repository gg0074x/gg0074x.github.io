<script setup>
import { ref, onMounted, shallowRef } from "vue";
import Rust from "./code/Rust.vue";
import Asm from "./code/Asm.vue";
import Python from "./code/Python.vue";
import C from "./code/C.vue";
import Vue from "./code/Vue.vue";
import Kotlin from "./code/Kotlin.vue";
import Dart from "./code/Dart.vue";
import Error from "./Error.vue";

const error = ref(false);
const techButtons = ref(null);
const codeComponents = [Rust, Asm, Python, C, Vue, Kotlin, Dart];
const codeComponent = shallowRef(Rust);

function select(index) {
    if (techButtons.value != null) {
        for (const el of techButtons.value) {
            el.classList.remove("selected");
        }
        techButtons.value[index].classList.add("selected");
        codeComponent.value = codeComponents[index];
    }
}

onMounted(async () => {
    try {
        techButtons.value = document.getElementById("tech-selector").children;
    } catch (e) {
        error.value = true;
        console.log(e);
    }
});
</script>

<template>
    <main>
        <div class="tech-container" v-if="!error">
            <div class="list">
                <h2>Tech i find myself familiarized with</h2>
                <div class="tech">
                    <ul class="selector" id="tech-selector">
                        <li class="rust selected">
                            <a @click="select(0)">
                                <i class="devicon-rust-original orange"></i>
                                Rust
                            </a>
                        </li>
                        <li class="asm">
                            <a @click="select(1)">
                                <i class="asm">Intel ASM</i>Assembly</a
                            >
                        </li>
                        <li class="python">
                            <a @click="select(2)">
                                <i class="devicon-python-plain yellow"></i>
                                Python
                            </a>
                        </li>
                        <li class="c">
                            <a @click="select(3)">
                                <i class="devicon-c-plain blue"></i>
                                C
                            </a>
                        </li>
                        <li class="vue">
                            <a @click="select(4)">
                                <i class="devicon-vuejs-plain green"></i>
                                Vue
                            </a>
                        </li>
                        <li class="kotlin">
                            <a @click="select(5)">
                                <i class="devicon-kotlin-plain purple"></i>
                                Kotlin
                            </a>
                        </li>
                        <li class="dart">
                            <a @click="select(6)">
                                <i class="devicon-dart-plain lightblue"></i>
                                Dart
                            </a>
                        </li>
                    </ul>
                    <div class="code">
                        <component :is="codeComponent" />
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <Error />
        </div>
    </main>
</template>

<style scoped>
.tech-container {
    overflow: visible;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
    height: 100vh;
    width: 100vw;
    padding: 5rem;
}

.list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    width: 50%;
    height: 70%;
}

h2 {
    color: var(--on-background);
    font-family: "Satoshi";
}

.tech {
    display: flex;
    justify-content: center;
    align-items: center;
    height: max-content;
    width: 100%;
}

.selector {
    background-color: rgba(var(--color-background-rgb), 20%);
    width: 13%;
    height: max-content;
    margin: 0;
    justify-content: center;
    padding: 0;
    list-style-type: none;
    overflow: auto;
    overflow-x: hidden;
}

li {
    width: 100%;
    aspect-ratio: 1.4;
    transition: ease-out 0.2s;
}

li:hover,
.selected {
    background-color: var(--on-background);
}

.selected a {
    color: var(--color-background);
}

i {
    font-size: 2rem;
}

.orange {
    color: #ff6a00;
}
.green {
    color: #56e369;
}
.lightblue {
    color: #0095ff;
}
.blue {
    color: #435cd9;
}
.purple {
    color: #b70fff;
}
.yellow {
    color: #ffe854;
}

a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: var(--on-background);
    font-family: "Satoshi";
    transition: ease-out 0.2s;
    user-select: none;
}

a:hover {
    color: var(--color-background);
}

.code {
    background-color: var(--color-background);
    height: 100%;
    width: 75%;
    color: var(--on-background);
    font-family: "Roboto";
    border: solid 1px var(--on-background);
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-feature-settings: "ss01";
}

main {
    --keyword: #ff578c;
    --punctuation: #c0c0c0;
    --literal: #262626;
    --identifier: #454545;
}

@media (prefers-color-scheme: dark) {
    main {
        --keyword: #ff578c;
        --punctuation: #303030;
        --literal: #e8e8e8;
        --identifier: #757575;
    }
}

:deep(span) {
    font-family: CascadiaCodeItalic;
}

:deep(.keyword) {
    color: var(--keyword);
}

:deep(.punctuation) {
    color: var(--punctuation);
}

:deep(.literal) {
    color: var(--literal);
}

:deep(.identifier) {
    color: var(--identifier);
}

.asm {
    font-size: 1rem;
}

@media only screen and (max-width: 1600px) {
    :deep(span) {
        font-size: 1.5vw;
    }
    .asm {
        font-size: 1vw;
    }

    i {
        font-size: 2vw;
    }
    a {
        font-size: 1.2vw;
    }

    .list {
        width: 65%;
    }
}

@media only screen and (max-width: 600px) {
    .code {
        align-items: unset;
        overflow: scroll;
        text-wrap: nowrap;
        padding: 2rem;
    }
    :deep(span) {
        font-size: 6vw;
        text-wrap: nowrap;
    }
    .asm {
        font-size: 3vw;
    }

    .selector {
        width: 20%;
    }

    li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        aspect-ratio: unset;
        min-height: 10vh;
    }

    i {
        font-size: 6vw;
    }
    a {
        min-height: inherit;
        font-size: 4vw;
    }

    .tech-container {
        padding: 1rem;
    }

    .list {
        width: 100%;
        height: 100%;
        padding: 0;
    }
}

@media only screen and (max-width: 992px) and (min-width: 600px) {
    :deep(span) {
        font-size: 2vw;
    }
    .asm {
        font-size: 2vw;
    }

    .selector {
        width: 20%;
    }

    li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        aspect-ratio: unset;
        min-height: 10vh;
    }

    i {
        font-size: 4vw;
    }
    a {
        min-height: inherit;
        font-size: 2vw;
    }

    .list {
        width: 90%;
        height: 100%;
    }
}
</style>
