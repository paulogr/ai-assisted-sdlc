<script setup>
import { onMounted, ref } from "vue";

const projects = ref([]);
const query = ref("");

async function loadProjects() {
    const search = new URLSearchParams();

    if (query.value.trim()) {
        search.set("q", query.value.trim());
    }

    const url = search.size ? `/api/projects?${search}` : "/api/projects";
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Could not load projects");
    }

    projects.value = await response.json();
}

onMounted(loadProjects);
</script>

<template>
    <header class="site-header">
        <a class="brand" href="/">WorkMatch</a>
        <span>Find work that fits</span>
    </header>

    <main>
        <section class="hero">
            <p class="eyebrow">Freelance marketplace</p>
            <h1>Find your next project</h1>
            <p class="hero-copy">Browse opportunities from clients looking for independent professionals.</p>
            <form class="search" @submit.prevent="loadProjects">
                <label for="project-search">Search projects</label>
                <div class="search-controls">
                    <input id="project-search" v-model="query" type="search" placeholder="Try Vue, design, or API" />
                    <button type="submit">Search</button>
                </div>
            </form>
        </section>

        <section class="results" aria-labelledby="results-title">
            <div class="results-heading">
                <div>
                    <p class="eyebrow">Open projects</p>
                    <h2 id="results-title">
                        {{ `${projects.length} projects available` }}
                    </h2>
                </div>
            </div>
            <div class="project-list">
                <article v-for="project in projects" :key="project.id" class="project-card">
                    <div class="project-card-heading">
                        <div>
                            <p class="category">{{ project.category }}</p>
                            <h3>{{ project.title }}</h3>
                        </div>
                        <strong>${{ project.budget }}</strong>
                    </div>

                    <p class="description">{{ project.description }}</p>

                    <div class="details">
                        <span>{{ project.experienceLevel }}</span>
                        <span>{{ project.projectType }}</span>
                    </div>

                    <ul class="skills" aria-label="Required skills">
                        <li v-for="skill in project.skills" :key="skill">{{ skill }}</li>
                    </ul>
                </article>
            </div>
        </section>
    </main>
</template>
