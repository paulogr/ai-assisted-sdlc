<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const categoryOptions = ["Web Development", "Backend Development", "Design", "Writing"];
const experienceLevelOptions = ["Entry level", "Intermediate", "Expert"];
const projectTypeOptions = ["Fixed price", "Hourly"];

const projects = ref([]);
const query = ref("");
const category = ref("");
const experienceLevel = ref("");
const projectType = ref("");
const minBudget = ref("");
let latestRequest = 0;

function buildSearchParams() {
    const search = new URLSearchParams();

    if (query.value.trim()) search.set("q", query.value.trim());
    if (category.value) search.set("category", category.value);
    if (experienceLevel.value) search.set("experienceLevel", experienceLevel.value);
    if (projectType.value) search.set("projectType", projectType.value);
    if (minBudget.value !== "") search.set("minBudget", minBudget.value);

    return search;
}

async function loadProjects(search) {
    const request = ++latestRequest;
    const url = search.size ? `/api/projects?${search}` : "/api/projects";
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Could not load projects");
    }

    const loadedProjects = await response.json();

    if (request === latestRequest) {
        projects.value = loadedProjects;
    }
}

function pushSearchState(search) {
    const queryString = search.toString();
    const url = `${window.location.pathname}${queryString ? `?${queryString}` : ""}${window.location.hash}`;

    window.history.pushState(null, "", url);
}

function submitSearch() {
    const search = buildSearchParams();

    pushSearchState(search);
    loadProjects(search);
}

function clearSearch() {
    query.value = "";
    category.value = "";
    experienceLevel.value = "";
    projectType.value = "";
    minBudget.value = "";

    const search = buildSearchParams();
    pushSearchState(search);
    loadProjects(search);
}

function restoreSearch() {
    const search = new URLSearchParams(window.location.search);
    const restoredCategory = search.get("category") || "";
    const restoredExperienceLevel = search.get("experienceLevel") || "";
    const restoredProjectType = search.get("projectType") || "";
    const restoredMinBudget = (search.get("minBudget") || "").trim();
    const parsedMinBudget = Number(restoredMinBudget);

    query.value = search.get("q") || "";
    category.value = categoryOptions.includes(restoredCategory) ? restoredCategory : "";
    experienceLevel.value = experienceLevelOptions.includes(restoredExperienceLevel) ? restoredExperienceLevel : "";
    projectType.value = projectTypeOptions.includes(restoredProjectType) ? restoredProjectType : "";
    minBudget.value = restoredMinBudget && Number.isFinite(parsedMinBudget) && parsedMinBudget >= 0 ? restoredMinBudget : "";

    loadProjects(search);
}

onMounted(() => {
    window.addEventListener("popstate", restoreSearch);
    restoreSearch();
});

onBeforeUnmount(() => {
    window.removeEventListener("popstate", restoreSearch);
});
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
            <form class="search" @submit.prevent="submitSearch">
                <div class="search-field keyword-field">
                    <label for="project-search">Search projects</label>
                    <input id="project-search" v-model="query" type="search" placeholder="Try Vue, design, or API" />
                </div>
                <div class="filter-controls">
                    <div class="search-field">
                        <label for="category-filter">Category</label>
                        <select id="category-filter" v-model="category">
                            <option value="">All categories</option>
                            <option v-for="option in categoryOptions" :key="option" :value="option">{{ option }}</option>
                        </select>
                    </div>
                    <div class="search-field">
                        <label for="experience-filter">Experience level</label>
                        <select id="experience-filter" v-model="experienceLevel">
                            <option value="">All experience levels</option>
                            <option v-for="option in experienceLevelOptions" :key="option" :value="option">{{ option }}</option>
                        </select>
                    </div>
                    <div class="search-field">
                        <label for="type-filter">Project type</label>
                        <select id="type-filter" v-model="projectType">
                            <option value="">All project types</option>
                            <option v-for="option in projectTypeOptions" :key="option" :value="option">{{ option }}</option>
                        </select>
                    </div>
                    <div class="search-field">
                        <label for="budget-filter">Minimum budget</label>
                        <input id="budget-filter" v-model="minBudget" type="number" min="0" step="any" placeholder="Any budget" />
                    </div>
                </div>
                <div class="search-actions">
                    <button type="submit">Search</button>
                    <button class="clear-button" type="button" @click="clearSearch">Clear all</button>
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
