<script setup lang="ts">
import Button from "./components/Button.vue";
</script>

<template>
  <main>
    <div class="container">
      <div class="small-div">
        <h2>Projects</h2>
        <div class="projects-div">
          <Button
            title="gg0074x/no-compiler"
            url="https://www.github.com/gg0074x/no-compiler"
            description="A no compiler to compile binary code directly"
          ></Button>
          <Button
            title="gg0074x/ask-cli"
            url="https://www.github.com/gg0074x/ask-cli"
            description="A simple command line tool to use Google Gemini AI"
          ></Button>
          <Button
            title="gg0074x/pawwssword_gen"
            url="https://www.github.com/gg0074x/pawwssword_gen"
            description="A tiny command line tool to generate new randomized passwords with a fun touch"
          ></Button>
        </div>
      </div>
      <div class="large-div">
        <div class="profile-container">
          <img src="./assets/chiwa.png" class="pfp" />
          <div>
            <a href="https://www.github.com/gg0074x" target="_blank"> Chiwa </a>
            <p>
              I'm a 19 year old hobbyist developer and computer engineering
              student.
            </p>
            <p>
              I specialize in low level programming and general software
              development.
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  width: 100vw;
  display: flex;
  height: 100vh;
  margin: 0;
}
.small-div {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2%;
}
.large-div {
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10%;
}

.profile-container {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 4%;
}

.pfp {
  width: 16%;
  aspect-ratio: 1;
  border-radius: 100%;
  border: solid 2px var(--color-border);
}

.projects-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 8%;
}

h2 {
  font-size: 1.5rem;
  font-weight: bolder;
}

a {
  display: inline-block;
  width: min-content;
  font-size: 3rem;
  font-weight: bolder;
  text-decoration: none;
  color: var(--color-heading);
  transition: ease-in-out 0.25s;
}
a:hover {
  transform: scale(1.1);
  text-decoration: underline;
}
</style>
