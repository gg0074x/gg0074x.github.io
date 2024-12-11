<script>
import { ref, onMounted } from "vue";
import Button from "./components/Button.vue";
import Tech from "./components/Tech.vue";

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
  },
  async mounted() {
    try {
      const response = await fetch(
        "https://api.github.com/users/gg0074x/repos"
      );
      if (!response.ok) throw new Error("Failed to fetch repos");
      this.repos = await response.json();

      this.repos.forEach((repo) => {
        const lang = repo.language || "Unknown";
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
.container {
  width: 100vw;
  display: flex;
  height: 100vh;
  margin: 0;
}
.small-div {
  flex: 1.2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2%;
  gap: 4%;
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
  .pfp {
    width: 25%;
    aspect-ratio: 1;
    border-radius: 100%;
    border: solid 2px var(--color-border);
  }

  .container {
    width: 100vw;
    display: flex;
    flex-direction: column-reverse;
    height: 100vh;
    margin: 0;
    overflow: auto;
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
