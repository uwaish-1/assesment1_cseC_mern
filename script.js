 // Sample credentials for login
 const correctUsername = "user";
 const correctPassword = "password";

 // Handle login form submission
 document.getElementById("loginForm").addEventListener("submit", function(event) {
     event.preventDefault();
     const username = document.getElementById("username").value;
     const password = document.getElementById("password").value;
     
     if (username === correctUsername && password === correctPassword) {
         document.getElementById("loginPage").style.display = "none";
         document.getElementById("dashboard").style.display = "block";
     } else {
         document.getElementById("errorMessage").style.display = "block";
     }
 });

 // Fetch GitHub users
 async function fetchGitHubUsers() {
     try {
         const response = await fetch("https://api.github.com/users");
         if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
         const users = await response.json();
         return users.slice(0, 10); // Top 10 users
     } catch (error) {
         console.error("Error fetching users:", error);
         alert("Failed to fetch GitHub users. Please try again later.");
         return [];
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
         }
     });
     logoutButton.addEventListener("click", () => {
         document.getElementById("dashboard").style.display = "none";
         document.getElementById("loginPage").style.display = "block";
         document.getElementById("userList").innerHTML = ""; // Clear users
         document.getElementById("sortOptions").value = "default"; // Reset sort option
     });
 });