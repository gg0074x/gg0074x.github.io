<script setup></script>

<template>
    <main>
        <div class="loader-container">
            <div class="loader"></div>
        </div>
    </main>
</template>

<style scoped>
.loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
}

.loader {
    background-color: white;
    animation: load 2s 0s infinite ease-in-out;
    width: 64px;
    aspect-ratio: 1;
}

@keyframes load {
    0% {
        border-radius: 0%;
        clip-path: none;
        transform: rotate(0deg);
    }
    50% {
        border-radius: 50%;
        clip-path: none;
        transform: rotate(360deg);
    }
    100% {
        border-radius: 0%;
        clip-path: none;
        transform: rotate(720deg);
    }
}
</style>
