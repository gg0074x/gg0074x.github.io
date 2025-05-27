<script setup></script>

<template>
    <main>
        <div class="footer-container">
            <h2>Made with ❤️ by Chiwa</h2>
            <div class="links-container">
                <a href="https://github.com/gg0074x" target="_blank"
                    ><i class="devicon-github-original"></i
                ></a>
                <a href="https://x.com/ChiwuaB" target="_blank"
                    ><i class="devicon-twitter-original"></i
                ></a>
            </div>
        </div>
    </main>
</template>

<style scoped>
.footer-container {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 16vh;
    justify-content: center;
    align-items: center;
    padding: 0.2rem;
    gap: 2px;
}

.links-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 40%;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

a {
    text-decoration: none;
    color: rgba(var(--on-background-rgb), 0.5);
    transition: ease-in-out 0.2s;
}

a:hover {
    color: rgba(var(--on-background-rgb), 1);
}

i {
    font-size: 4vh;
}

h2 {
    color: var(--on-background);
    font-family: "Satoshi";
    margin: 0;
}

@media only screen and (max-width: 600px) {
    h2 {
        font-size: 4vw;
    }
}

@media only screen and (max-width: 992px) and (min-width: 600px) {
    h2 {
        font-size: 2vw;
    }
}
</style>
