<script setup>
import { onMounted } from "vue";
const props = defineProps(["imgSrc"]);

onMounted(async () => {
    try {
        var container = document.getElementById("container");
        const greetings = [
            "Hello, I'm Chiwa",
            "Hola, soy Chiwa",
            "こんにちは、チワです",
            "Olá, sou Chiwa",
        ];
        var index = 0;
        var text = document.getElementById("text");
        text.textContent = greetings[index];

        async function changeGreeting() {
            index += 1;
            text.className = "hidden";
            if (index == greetings.length) {
                index = 0;
            }
            await new Promise((r) => setTimeout(r, 1500));
            text.textContent = greetings[index];
            await new Promise((r) => setTimeout(r, 1500));
            text.className = "";
            await new Promise((r) => setTimeout(r, 4000));
            await changeGreeting();
        }
        await new Promise((r) => setTimeout(r, 4000));
        await changeGreeting();
    } catch {
        console.log("error");
    }
});
</script>

<template>
    <main>
        <div class="greet-container">
            <div id="container">
                <img class="img" :src="props.imgSrc" />
                <span id="text"></span>
            </div>
        </div>
    </main>
</template>

<style scoped>
.greet-container {
    color: var(--on-background);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
}
#container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 12%;
    width: 100vw;
    gap: 2%;
}
span {
    color: var(--on-background);
    font-family: "DelaGothicOne";
    font-weight: 100;
    font-size: 3rem;
    width: 30%;
    transition: opacity ease-in-out 1.5s;
    cursor: default;
}
.hidden {
    opacity: 0;
}

.img {
    border-radius: 50%;
    height: 100%;
    aspect-ratio: 1;
    border: 1px solid;
    border-color: var(--on-background);
}

@media only screen and (max-width: 600px) {
    #container {
        height: 20%;
        flex-direction: column;
    }

    .img {
        height: 70%;
    }

    span {
        text-align: center;
        width: 100%;
        font-size: 8vw;
    }
}

@media only screen and (max-width: 992px) and (min-width: 600px) {
    #container {
        height: 25%;
        flex-direction: column;
    }

    .img {
        height: 100%;
    }

    span {
        text-align: center;
        width: 80%;
        font-size: 6vw;
    }
}
</style>
