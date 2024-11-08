// Sample credentials for login (for testing purposes)
const correctUsername = "user";
const correctPassword = "password";

// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (username === correctUsername && password === correctPassword) {
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("errorMessage").style.display = "block";
    }
});

// Fetch GitHub users
async function fetchGitHubUsers() {
    try {
        const response = await fetch("https://api.github.com/users");
        const users = await response.json();
        return users.slice(0, 10); // Top 10 users
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

// Display users on the dashboard
async function displayUsers() {
    const userList = document.getElementById("userList");
    userList.innerHTML = ""; // Clear previous users
    const users = await fetchGitHubUsers();
    users.forEach(user => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = user.html_url;
        link.textContent = user.login;
        link.target = "_blank";
        listItem.appendChild(link);
        userList.appendChild(listItem);
    });
}

// Sort users alphabetically
function sortUsers() {
    const userList = document.getElementById("userList");
    const users = Array.from(userList.getElementsByTagName("li"));
    users.sort((a, b) => a.textContent.localeCompare(b.textContent));
    userList.innerHTML = ""; // Clear previous list
    users.forEach(user => userList.appendChild(user));
}

// Event listeners for dashboard actions
document.addEventListener("DOMContentLoaded", () => {
    const fetchButton = document.getElementById("fetchButton");
    const sortOptions = document.getElementById("sortOptions");
    const logoutButton = document.getElementById("logoutButton");

    fetchButton.addEventListener("click", displayUsers);
    sortOptions.addEventListener("change", (event) => {
        if (event.target.value === "alphabetical") {
            sortUsers();
        } else {
            displayUsers();
        }
    });
    logoutButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });
});
