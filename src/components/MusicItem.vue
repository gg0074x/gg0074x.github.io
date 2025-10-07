<script setup>
const props = defineProps(["title", "artist", "videoId", "artistId"]);

console.log(props.imageurl);
</script>

<template>
    <main>
        <div class="song-card">
            <div class="thumb">
                <img
                    loading="lazy"
                    :src="`https://i.ytimg.com/vi/${videoId}/hq720.jpg`"
                />
            </div>
            <div class="song-details">
                <a
                    :href="`https://music.youtube.com/watch?v=${props.videoId}`"
                    target="_blank"
                >
                    <h3>
                        {{
                            props.title.length > 25
                                ? `${props.title.substring(0, 22)}...`
                                : props.title
                        }}
                    </h3>
                </a>
                <a
                    :href="`https://music.youtube.com/channel/${props.artistId}`"
                    target="_blank"
                >
                    <p>{{ props.artist.replace(" - Topic", "") }}</p>
                </a>
            </div>
        </div>
    </main>
</template>

<style scoped>
.song-card {
    max-width: 20vw;
    max-height: 60vh;
    border-radius: 20px;
    background-color: var(--on-background);
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.thumb {
    width: 100%;
    aspect-ratio: 1/1;
}

img {
    height: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
}

.song-details {
    display: flex;
    height: max-content;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1.2rem;
}

a {
    color: var(--color-background);
    text-decoration: none;
}

h3,
p {
    margin: 0.2em 0;
    text-wrap: nowrap;
}

h3 {
    font-family: DelaGothicOne;
    font-weight: 100;
    transition: ease-in-out 0.2s;
}

h3:hover {
    text-decoration: underline;
}

p {
    font-family: Satoshi;
}

@media only screen and (max-width: 1600px) {
    .song-card {
        max-width: 25vw;
        max-height: 60vh;
    }
}

@media only screen and (max-width: 1200px) {
    .song-card {
        max-width: 30vw;
        max-height: 60vh;
    }
}

@media only screen and (max-width: 600px) {
    .song-card {
        max-width: 60vw;
        max-height: 60vh;
    }
    h3,
    p {
        font-size: 3vw;
        text-wrap: wrap;
        text-align: center;
    }
}

@media only screen and (max-width: 992px) and (min-width: 600px) {
    .song-card {
        max-width: 35vw;
        max-height: 60vh;
    }
    h3 {
        font-size: 2vw;
    }
}
</style>
