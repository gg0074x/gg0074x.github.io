<script setup>
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let array = ["OWO", "UWU", "QWQ", "TWT"];

let moji = array[getRandomInt(array.length)];
</script>

<template>
    <main class="background">
        <div class="border">
            <div class="hide">
                <h1 id="thing">{{ moji }}</h1>
            </div>
        </div>
    </main>
</template>

<style scoped>
.hide {
    height: 0;
    overflow: hidden;
}

#thing {
    width: fit-content;
    transform: rotate(-20deg);
    padding: 4px;
    font-family: DelaGothicOne;
    color: rgba(var(--on-background-rgb), 10%);
}

.background {
    background-image: -moz-element(#thing);
    background-repeat: repeat;
    position: fixed;
    min-height: 100vh;
    min-width: 100vw;
    z-index: -10;
    animation: pan 60s linear infinite;
}

.border {
    background: radial-gradient(
        circle,
        rgba(var(--color-background-rgb), 0%),
        rgba(var(--color-background-rgb), 10%),
        rgba(var(--color-background-rgb), 20%),
        rgba(var(--color-background-rgb), 23%),
        rgba(var(--color-background-rgb), 26%),
        rgba(var(--color-background-rgb), 30%),
        rgba(var(--color-background-rgb), 60%)
    );
    position: fixed;
    min-height: 100vh;
    min-width: 100vw;
}

@keyframes pan {
    0% {
        background-position: 0% 0%;
    }

    100% {
        background-position: 100% 100%;
    }
}
</style>
