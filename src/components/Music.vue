<script>
import { ref } from "vue";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import MusicItem from "./MusicItem.vue";
import musicPages from "../json/music.json";

const songs = ref([]);

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

let songArray = new Array();

for (let i = 0; i < musicPages.length; i++) {
    songArray = songArray.concat(musicPages[i]["items"]);
}

songArray = shuffle(songArray);

songs.value = songArray;

export default {
    components: {
        Splide,
        SplideSlide,
        MusicItem,
    },
    setup() {
        return {
            songs,
        };
    },
};
</script>

<template>
    <main>
        <div class="music-container">
            <div class="song-container">
                <h2>Some music i like</h2>
                <div style="width: 100%; height: 50vh">
                    <Splide
                        :options="{
                            type: 'loop',
                            rewind: true,
                            perPage: 4,
                            perMove: 1,
                            pagination: false,
                            autoplay: true,
                            breakpoints: {
                                1600: {
                                    perPage: 3,
                                },
                                1200: {
                                    perPage: 2,
                                    padding: '2rem',
                                },
                                992: {
                                    perPage: 2,
                                },
                                600: {
                                    perPage: 1,
                                    padding: '2rem',
                                },
                            },
                        }"
                    >
                        <SplideSlide v-for="song in songs">
                            <MusicItem
                                :title="song['snippet']['title']"
                                :artist="
                                    song['snippet']['videoOwnerChannelTitle']
                                "
                                :videoId="
                                    song['snippet']['resourceId']['videoId']
                                "
                                :artistId="
                                    song['snippet']['videoOwnerChannelId']
                                "
                            />
                        </SplideSlide>
                    </Splide>
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
    width: 100%;
    font-size: 1rem;
}

.splide__slide {
    display: flex;
    justify-content: center;
}

h2 {
    color: var(--on-background);
    font-family: "Satoshi";
}

p {
    margin: 0px;
}

@media only screen and (max-width: 1600px) {
    .song-container {
        width: 100%;
    }
}

@media only screen and (max-width: 1200px) {
    .song-container {
        width: 100%;
    }
}

@media only screen and (max-width: 600px) {
    .song-container {
        width: 100%;
    }

    .music-container {
        padding: 1rem;
    }
}

@media only screen and (max-width: 992px) and (min-width: 600px) {
    .song-container {
        width: 100%;
    }

    .music-container {
        padding: 3rem;
    }
}
</style>
