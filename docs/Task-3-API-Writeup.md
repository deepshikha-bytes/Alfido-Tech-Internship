# Task 3: GitHub Profile Finder

## Objective

The objective of this task was to use a public REST API to fetch and display data dynamically on a webpage.

## Project Description

GitHub Profile Finder is an API integration project built using HTML, CSS, and JavaScript. In this project, the user can enter any GitHub username and the application fetches public profile information from the GitHub REST API.

The fetched data is displayed dynamically on the webpage using JavaScript DOM manipulation.

## API Used

This project uses the public GitHub REST API.

### User Profile Endpoint

```text
https://api.github.com/users/{username}
```

Example:

```text
https://api.github.com/users/deepshikha-bytes
```

This endpoint is used to fetch GitHub user profile details such as profile image, name, username, bio, followers, following, public repositories, location, company, and account joining date.

### Repositories Endpoint

```text
https://api.github.com/users/{username}/repos?sort=updated&per_page=5
```

Example:

```text
https://api.github.com/users/deepshikha-bytes/repos?sort=updated&per_page=5
```

This endpoint is used to fetch the user's recent public repositories.

## Features

- Search GitHub profile by username
- Fetch data using JavaScript Fetch API
- Display profile image, name, username, and bio
- Show followers, following, and public repositories count
- Display location, company, and joined date
- Show recent repositories
- Display repository language, stars, and forks
- Loading state while fetching data
- Error state for invalid username
- Responsive user interface

## Technologies Used

- HTML
- CSS
- JavaScript
- Fetch API
- GitHub REST API
- DOM Manipulation

## Working Process

1. User enters a GitHub username in the search box.
2. JavaScript captures the input value.
3. Fetch API sends a request to the GitHub REST API.
4. API returns profile data in JSON format.
5. JavaScript extracts useful data from the response.
6. The data is displayed dynamically on the webpage.
7. If the username is invalid, an error message is shown.

## Loading and Error Handling

The project includes a loading message while data is being fetched from the API. If the user enters an invalid GitHub username, an error message is displayed instead of showing a blank page.

## Screenshots

Screenshots are available in the following folder:

```text
screenshots/task-3
```

Suggested screenshots:

1. Initial screen
2. Search result for a valid GitHub username
3. Recent repositories section
4. Error state using wrong username

## Live Project

Add live project link here after hosting:

```text
https://deepshikportfolio.z23.web.core.windows.net/Task-3-API-Integration-Project/
```

## Source Code

GitHub Repository:

```text
https://github.com/deepshikha-bytes/Alfido-Tech-Internship
```

## Conclusion

This project helped me understand how to integrate a public REST API into a frontend project. I learned how to use the Fetch API, handle JSON data, manage loading and error states, and display API data dynamically on a webpage.