<template>
    <main>
        <div class="presentation-container">
            <div class="presentation">
                <p>
                    I'm a fully self-taught developer since the age of 14,
                    starting in 2019.
                </p>
                <p>
                    Developing multiple kinds of systems has been my addiction,
                    I love learning new things about how computers work.
                </p>
                <p>
                    I started as a game developer wanna-be, but right now I love
                    doing a little bit of everything, from simple websites and
                    apps to low level simple operating systems and compilers.
                </p>
                <p>
                    I know I still got a lot of things to learn, I don't
                    consider myself an expert, but I do my best to keep learning
                    as much as I can.
                </p>
                <p>I'm also studying a computer engineering career.</p>
                <p class="signature"><span>- </span></p>
            </div>
        </div>
    </main>
</template>

<style scoped>
.presentation-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    height: 100vh;
    width: 100vw;
    padding: 5rem;
}

.presentation {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    height: 100vh;
    width: 40vw;
    font-family: "Satoshi";
    font-size: 1.2rem;
}

p {
    color: var(--on-background);
    margin: 0px;
    margin-bottom: 0.6rem;
    transition: ease-in-out 0.25s;
}

p:hover {
    cursor: default;
    color: var(--color-background);
    background-color: var(--on-background);
}

.signature {
    margin-left: 1rem;
}

.signature::after {
    content: "🌧️";
}

.signature:hover::after {
    content: "&#x1f327;";
}

@media only screen and (max-width: 600px) {
    p {
        font-size: 2vh;
    }

    .presentation {
        width: 90vw;
    }

    .presentation-container {
        padding: 1rem;
    }
}

@media only screen and (max-width: 992px) and (min-width: 600px) {
    p {
        font-size: 2vh;
    }

    .presentation {
        width: 60vw;
    }

    .presentation-container {
        padding: 2rem;
    }
}
</style>
