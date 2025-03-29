<script>
import { ref, onMounted, nextTick } from "vue";
import Button from "./components/Button.vue";
import Tech from "./components/Tech.vue";

let square = ref(null);
let grabbing = ref(false);
let rotation = ref(0);
let x = 0;
let y = 0;
let mousex = 0;
let mousey = 0;
let initialAngle = 0;
let startRotation = 0;
const friction = 0.98;
let angularVelocity = 0;
let lastAngle = 0;

function degrees(angleInRadians) {
  return angleInRadians * (180 / Math.PI);
}

function applyMomentum() {
  if (!grabbing.value && Math.abs(angularVelocity) > 0.01) {
    rotation.value += angularVelocity;
    angularVelocity *= friction;

    requestAnimationFrame(applyMomentum);
  }
}

export default {
  components: {
    Button,
    Tech,
  },
  data() {
    return {
      repos: [],
      techUsage: {},
      color: "000000",
    };
  },
  computed: {
    sortedTechs() {
      return Object.fromEntries(
        Object.entries(this.techUsage).sort(([, a], [, b]) => b - a)
      );
    },
    style() {
      return { transform: "rotate(" + rotation.value + "deg)" };
    },
  },
  methods: {
    formatTitle(repo) {
      return repo.fork ? `Forked | ${repo.name}` : repo.name;
    },
    getRandomColor() {
      let output = "#";
      for (let i = 0; i < 6; ++i) {
        output += Math.floor(Math.random() * 16).toString(16);
      }
      return output;
    },
    changeColor() {
      this.color = this.getRandomColor();
    },
    onSquarePointerDown(event) {
      var bodyRect = document.body.getBoundingClientRect();
      var elemRect = square.value.getBoundingClientRect();
      x = elemRect.left - bodyRect.left + elemRect.width / 2;
      y = elemRect.top - bodyRect.top + elemRect.height / 2;

      let dx = x - event.clientX;
      let dy = event.clientY - y;

      initialAngle = degrees(Math.atan2(-dy, dx));
      if (initialAngle < 0) initialAngle += 360;

      startRotation = rotation.value;

      grabbing.value = true;
    },
    onSquarePointerUp() {
      grabbing.value = false;
      applyMomentum();
    },
  },

  async mounted() {
    square.value = document.getElementById("square");
    addEventListener("mouseup", this.onSquarePointerUp);
    addEventListener("mousemove", (event) => {
      if (square.value == undefined) {
        return;
      }
      mousex = event.clientX;
      mousey = event.clientY;
      if (grabbing.value) {
        let dx = x - mousex;
        let dy = mousey - y;

        let angle = degrees(Math.atan2(-dy, dx));
        if (angle < 0) {
          angle += 360;
        }

        let delta = angle - initialAngle;

        angularVelocity = angle - lastAngle;
        lastAngle = angle;
        rotation.value = startRotation + delta;
      }
    });
    try {
      const response = await fetch("https://api.github.com/users/gg0074x/repos");
      if (!response.ok) throw new Error("Failed to fetch repos");
      this.repos = await response.json();

      this.repos.forEach((repo) => {
        const lang = repo.language;
        if (lang == null) {
          return;
        }
        if (!this.techUsage[lang]) this.techUsage[lang] = 0;
        this.techUsage[lang]++;
      });

      this.color = this.getRandomColor();
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<template>
  <header>
    <div
      id="square"
      class="square"
      :style="style"
      @pointerdown="onSquarePointerDown($event)"
      @pointerup="onSquarePointerUp()"
    ></div>
  </header>
  <main>
    <div class="container">
      <div class="small-div">
        <div class="list">
          <h2>Techs</h2>
          <div class="tech-div">
            <Tech
              v-for="(count, tech) in sortedTechs"
              :class="tech.toLowerCase()"
              :title="tech"
            ></Tech>
          </div>
        </div>
        <div class="list">
          <h2>Projects</h2>
          <div class="projects-div">
            <Button
              v-for="repo in repos"
              :class="repo.language ? repo.language.toLowerCase() : 'unknown'"
              :title="formatTitle(repo)"
              :url="repo.html_url"
              :description="repo.description || 'No description available.'"
            ></Button>
          </div>
        </div>
      </div>
      <div class="large-div">
        <div class="profile-container">
          <img
            src="https://avatars.githubusercontent.com/gg0074x"
            class="pfp"
          />
          <div>
            <a
              href="https://www.github.com/gg0074x"
              target="_blank"
              :style="{ '--random-color': color }"
              @mouseover="changeColor()"
            >
              Chiwa
            </a>
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
.square {
  height: 40px;
  width: 40px;
  aspect-ratio: 1;
  background-color: white;
  cursor: grab;
  transition: border-radius ease-in-out 0.3s;
}
.square:hover {
  border-radius: 8px;
}

main {
  height: calc(100vh - calc(16px + 16px + 40px));
  width: 100vw;
  overflow: hidden;
}
header {
  width: 100vw;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 100vw;
  display: flex;
  height: 100%;
  margin: 0;
  bottom: 76px;
}
.small-div {
  height: 100%;
  flex: 1.2;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 2%;
  gap: 8%;
}

.list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

.large-div {
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10%;
  padding-top: 2%;
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
  padding: 2% 0%;
  width: 100%;
  overflow-y: auto;
}

.projects-div::-webkit-scrollbar {
  width: 8px;
}

.projects-div::-webkit-scrollbar-thumb {
}

.projects-div::-webkit-scrollbar-thumb:hover {
}

.tech-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2% 0%;
  width: 100%;
  overflow-y: auto;
}

.tech-div::-webkit-scrollbar {
  width: 8px;
}

.tech-div::-webkit-scrollbar-thumb {
}

.tech-div::-webkit-scrollbar-thumb:hover {
}

h2 {
  font-size: 1.9rem;
  font-weight: bold;
}

a {
  display: inline-block;
  width: max-content;
  font-size: 3rem;
  font-weight: 100;
  text-decoration: none;
  color: var(--color-heading);
  transition: ease-in-out 0.25s;
}
a:hover {
  text-decoration: underline;
}

a {
  position: relative;
  padding-left: 10px;
  padding-right: 10px;

  &:before {
    position: absolute;
    z-index: -1;
    content: "";
    background: var(--random-color);
    height: 70%;
    left: 0;
    bottom: 10%;
    width: 0%;
    opacity: 0.7;
    transition: all 0.5s;
  }

  &:hover:before {
    width: 100%;
  }
}

@media (max-width: 1024px) {
  main {
    height: max-content;
    overflow: visible;
  }
  .pfp {
    width: 25%;
    aspect-ratio: 1;
    border-radius: 100%;
    border: solid 2px var(--color-border);
  }

  .container {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column-reverse;
    height: max-content;
    margin: 0;
    overflow: visible;
    gap: 6%;
  }
  .profile-container {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4%;
  }
  .projects-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2% 0%;
    width: 100%;
    overflow-y: visible;
  }

  .tech-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2% 0%;
    width: 100%;
    overflow-y: visible;
  }
}
</style>
