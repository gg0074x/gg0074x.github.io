<script>
import { ref } from "vue";

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const urls = ref(
    shuffle([
        "https://open.spotify.com/embed/track/0HqZX76SFLDz2aW8aiqi7G?utm_source=generator",
        "https://open.spotify.com/embed/track/6WkJ2OK163XXS2oARUC9JM?utm_source=generator",
        "https://open.spotify.com/embed/track/4IiuExPFijOGZnVxGsKWcc?utm_source=generator",
        "https://open.spotify.com/embed/track/2qpzWc8i7nja6CpvGczkUe?utm_source=generator",
        "https://open.spotify.com/embed/track/3khEEPRyBeOUabbmOPJzAG?utm_source=generator",
        "https://open.spotify.com/embed/track/7ueP5u2qkdZbIPN2YA6LR0?utm_source=generator",
        "https://open.spotify.com/embed/track/1TAC5SANfK7l6wGHtUQ7MX?utm_source=generator",
        "https://open.spotify.com/embed/track/1XsN9Flu0VvZpXmrkBtZGt?utm_source=generator",
        "https://open.spotify.com/embed/track/0eu4C55hL6x29mmeAjytzC?utm_source=generator",
        "https://open.spotify.com/embed/track/2FY7b99s15jUprqC0M5NCT?utm_source=generator",
        "https://open.spotify.com/embed/track/5YtjgewpB55VaDbGw45uqB?utm_source=generator",
        "https://open.spotify.com/embed/track/7gHkDNieGzYmyuC7E1Xbxw?utm_source=generator",
        "https://open.spotify.com/embed/track/2ILz4eU7UCTv0Wup7F5lVt?utm_source=generator",
        "https://open.spotify.com/embed/track/5sPKAEb7afrIMtdqEnI6H6?utm_source=generator",
        "https://open.spotify.com/embed/track/3vFZheR74pxUkzxqhXTZ2X?utm_source=generator",
        "https://open.spotify.com/embed/track/5DEtelB6EyMO5nsdYmN0HK?utm_source=generator",
        "https://open.spotify.com/embed/track/2YAzpDuHmAe5kROOlyDnmv?utm_source=generator",
        "https://open.spotify.com/embed/track/6KYOlIwDHbrbeBbJEtQ0Fj?utm_source=generator",
        "https://open.spotify.com/embed/track/0kdqcbwei4MDWFEX5f33yG?utm_source=generator",
        "https://open.spotify.com/embed/track/6woV8uWxn7rcLZxJKYruS1?utm_source=generator",
        "https://open.spotify.com/embed/track/1j6Agt1Sn2DjQ0NA33J3r2?utm_source=generator",
        "https://open.spotify.com/embed/track/1ndUYRPchJVNQCM7XwN7Hq?utm_source=generator",
        "https://open.spotify.com/embed/track/47UFoOuvrkt4khE7c5aap6?utm_source=generator",
        "https://open.spotify.com/embed/track/6tMdpUXfT70TD6Eh3XfB1p?utm_source=generator",
        "https://open.spotify.com/embed/track/0wZUJxxybEiafs0BIg9SAP?utm_source=generator",
        "https://open.spotify.com/embed/track/0d28khcov6AiegSCpG5TuT?utm_source=generator",
        "https://open.spotify.com/embed/track/0q6LuUqGLUiCPP1cbdwFs3?utm_source=generator",
        "https://open.spotify.com/embed/track/28BHwinU69xKIlL7vVln2k?utm_source=generator",
        "https://open.spotify.com/embed/track/65FJZsh3LaUFt0y1NWiljo?utm_source=generator",
        "https://open.spotify.com/embed/track/2t7RNUa8I8fbZAEAmZOkBl?utm_source=generator",
        "https://open.spotify.com/embed/track/6SZwj6cjc8JQbkrr8cbIUn?utm_source=generator",
    ]),
);

export default {
    setup() {
        return {
            urls,
        };
    },
    mounted() {
        const element = document.getElementById("music-carousel");
        const dots = ref(document.getElementById("dot-holder").children);

        let targetScroll = 0;
        let currentScroll = 0;
        let isScrolling = false;

        element.addEventListener(
            "wheel",
            (e) => {
                if (navigator.appVersion.indexOf("Chrome/") != -1) {
                    return;
                }

                //e.preventDefault(); //this doesnt work
                let scrollStep = 153;

                if (element.scrollTop > scrollStep * (urls.value.length - 1)) {
                    scrollStep +=
                        element.scrollTop -
                        scrollStep * (urls.value.length - 1);
                }

                targetScroll += e.deltaY > 0 ? scrollStep : -scrollStep;

                targetScroll = Math.max(
                    0,
                    Math.min(
                        targetScroll,
                        element.scrollHeight - element.clientHeight,
                    ),
                );

                if (!isScrolling) {
                    isScrolling = true;
                    animateScroll();
                }

                if (
                    targetScroll / scrollStep > 0 &&
                    targetScroll / scrollStep <
                        Math.floor((element.scrollHeight - 153) / scrollStep)
                ) {
                    for (let i = 0; i < dots.value.length; i++) {
                        if (i != 0 && i != dots.value.length - 1) {
                            dots.value[i].classList.add("selected");
                        } else {
                            dots.value[i].classList.remove("selected");
                        }
                    }
                } else if (targetScroll / scrollStep == 0) {
                    for (let i = 0; i < dots.value.length; i++) {
                        if (i == 0) {
                            dots.value[i].classList.add("selected");
                        } else {
                            dots.value[i].classList.remove("selected");
                        }
                    }
                } else if (
                    targetScroll / scrollStep >=
                    Math.floor((element.scrollHeight - 4 - 153) / scrollStep)
                ) {
                    for (let i = 0; i < dots.value.length; i++) {
                        if (i == dots.value.length - 1) {
                            dots.value[i].classList.add("selected");
                        } else {
                            dots.value[i].classList.remove("selected");
                        }
                    }
                }
            },
            { passive: false },
        );

        function animateScroll() {
            const ease = 0.1;
            const diff = targetScroll - currentScroll;

            if (Math.abs(diff) > 0.5) {
                currentScroll += diff * ease;
                element.scrollTop = currentScroll;
                window.requestAnimationFrame(animateScroll);
            } else {
                isScrolling = false;
            }
        }
    },
};
</script>

<template>
    <main>
        <div class="music-container">
            <div class="song-container">
                <h2>Some music i like</h2>
                <div style="width: 100%; display: flex">
                    <div class="music-carousel" id="music-carousel">
                        <div
                            style="height: 152px; width: 100%"
                            v-for="url in urls"
                        >
                            <iframe
                                style="border-radius: 12px"
                                :src="url"
                                width="100%"
                                height="152"
                                frameBorder="0"
                                allowfullscreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="eager"
                            ></iframe>
                        </div>
                        <p
                            style="
                                color: var(--on-background);
                                font-size: 0.6em;
                            "
                        >
                            Im sorry, i tried everything to remove this
                        </p>
                    </div>
                    <ul class="dot-holder" id="dot-holder">
                        <li class="dot selected"></li>
                        <li class="dot"></li>
                        <li class="dot"></li>
                    </ul>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.music-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    height: 100vh;
    width: 100vw;
    padding: 5rem;
}

.song-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    height: 100%;
    width: 40%;
    font-size: 1rem;
}

.music-carousel {
    display: flex;
    flex-direction: column;
    height: 152px;
    width: 65%;
    overflow: auto;
    overflow-x: hidden;
    gap: 1px;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.music-carousel::-webkit-scrollbar {
    display: none;
}

.dot-holder {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.dot {
    margin: 0.4rem;
    background-color: rgba(var(--on-background-rgb), 0.4);
    width: 8px;
    height: 8px;
    aspect-ratio: 1;
    border-radius: 100px;
}

.dot:not(:first-child):not(:last-child) {
    height: 16px;
    margin: 0.1rem;
}

.selected {
    background-color: rgba(var(--on-background-rgb), 1);
}

h2 {
    color: var(--on-background);
    font-family: "Satoshi";
}

p {
    margin: 0px;
}

@supports (-webkit-appearance: none) and (not (-moz-appearance: none)) {
    .dot-holder {
        display: none;
    }

    .music-carousel {
        height: 470px;
        overflow-x: hidden;
        overflow-y: scroll;
        gap: 1px;
        scrollbar-width: unset;
        -ms-overflow-style: unset;
        overflow: scroll;
    }

    .music-carousel::-webkit-scrollbar {
        display: unset;
    }
}

@media only screen and (max-width: 1600px) {
    .song-container {
        width: 60%;
    }
}

@media only screen and (max-width: 1200px) {
    .song-container {
        width: 80%;
    }
}

@media only screen and (max-width: 600px) {
    .song-container {
        width: 100%;
    }

    .dot-holder {
        display: none;
    }

    .music-carousel {
        height: 470px;
        width: 90%;
        overflow-x: hidden;
        overflow-y: scroll;
        gap: 1px;
    }

    .music-container {
        padding: 1rem;
    }
}

@media only screen and (max-width: 992px) and (min-width: 600px) {
    .song-container {
        width: 50%;
    }

    .dot-holder {
        display: none;
    }

    .music-carousel {
        height: 470px;
        width: 90%;
        overflow-x: hidden;
        overflow-y: scroll;
        gap: 1px;
    }

    .music-container {
        padding: 3rem;
    }
}
</style>
