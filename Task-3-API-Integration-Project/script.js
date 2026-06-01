const searchForm = document.querySelector("#search-form");
const usernameInput = document.querySelector("#username-input");
const message = document.querySelector("#message");
const profileCard = document.querySelector("#profile-card");

const avatar = document.querySelector("#avatar");
const nameElement = document.querySelector("#name");
const usernameElement = document.querySelector("#username");
const bioElement = document.querySelector("#bio");
const reposElement = document.querySelector("#repos");
const followersElement = document.querySelector("#followers");
const followingElement = document.querySelector("#following");
const locationElement = document.querySelector("#location");
const companyElement = document.querySelector("#company");
const joinedDateElement = document.querySelector("#joined-date");
const profileLink = document.querySelector("#profile-link");
const repoList = document.querySelector("#repo-list");

function showMessage(text, type) {
  message.textContent = text;
  message.className = `message ${type}`;
}

function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function showProfile(user) {
  avatar.src = user.avatar_url;
  nameElement.textContent = user.name || "Name not available";
  usernameElement.textContent = `@${user.login}`;
  bioElement.textContent = user.bio || "No bio available.";

  reposElement.textContent = user.public_repos;
  followersElement.textContent = user.followers;
  followingElement.textContent = user.following;

  locationElement.textContent = user.location || "Not available";
  companyElement.textContent = user.company || "Not available";
  joinedDateElement.textContent = formatDate(user.created_at);

  profileLink.href = user.html_url;

  profileCard.classList.remove("hidden");
}

function showRepositories(repos) {
  repoList.innerHTML = "";

  if (repos.length === 0) {
    repoList.innerHTML = `<p>No public repositories found.</p>`;
    return;
  }

  repos.slice(0, 5).forEach((repo) => {
    const repoCard = document.createElement("div");
    repoCard.className = "repo-card";

    repoCard.innerHTML = `
      <h4>
        <a href="${repo.html_url}" target="_blank">
          ${repo.name}
        </a>
      </h4>

      <p>${repo.description || "No description available."}</p>

      <div class="repo-meta">
        <span>💻 ${repo.language || "Not specified"}</span>
        <span>⭐ ${repo.stargazers_count}</span>
        <span>🍴 ${repo.forks_count}</span>
      </div>
    `;

    repoList.appendChild(repoCard);
  });
}

async function fetchGitHubProfile(username) {
  try {
    showMessage("Loading profile details...", "loading");
    profileCard.classList.add("hidden");
    repoList.innerHTML = "";

    const userResponse = await fetch(`https://api.github.com/users/${username}`);

    if (!userResponse.ok) {
      throw new Error("User not found");
    }

    const user = await userResponse.json();

    const repoResponse = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`
    );

    const repos = await repoResponse.json();

    showProfile(user);
    showRepositories(repos);
    showMessage("Profile loaded successfully!", "success");
  } catch (error) {
    profileCard.classList.add("hidden");
    repoList.innerHTML = "";
    showMessage("User not found. Please check the username and try again.", "error");
  }
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();

  if (username === "") {
    showMessage("Please enter a GitHub username.", "error");
    profileCard.classList.add("hidden");
    return;
  }

  fetchGitHubProfile(username);
});