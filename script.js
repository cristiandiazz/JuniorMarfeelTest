function findUser() {
    const username = document.getElementById("search").value;
    document.getElementById("error").style.display = "none";
    document.getElementById("userAndRepos").style.display = "none";
    document.getElementById("userRepos").innerHTML = "";
    getUserData(`https://api.github.com/users/${username}`, printUserInfo)
    getUserRepos(`https://api.github.com/users/${username}/repos`, printUserRepos);

    function getUserData(userUrl, userData) {

        fetch(userUrl)
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    document.getElementById("error").style.display = "block";
                } else {
                    userData(data);
                    return data;
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    function getUserRepos(userRepoUrl, userRepos) {

        fetch(userRepoUrl)
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    document.getElementById("error").style.display = "block";
                } else {
                    userRepos(data);
                    return data;
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    function printUserInfo(data) {
        document.getElementById("userAndRepos").style.display = "block";
        document.getElementById("username").innerText = "@";
        document.getElementById("username").innerText += data.login;
        document.getElementById("fullname").innerText = data.name;
        document.getElementById("userBio").innerText = data.bio;
        document.getElementById("githubImage").src = data.avatar_url;
    };

    function printUserRepos(data) {
        const list = document.createElement("ul");
        data.map(repo => {
            const row = document.createElement("li");
            row.innerHTML = `${repo.name}
                <img class="github-star" src="images/star.png" alt="Stars">
                <span>${repo.stargazers_count}</span> <img class="github-fork" src="images/fork.png" alt="Forks">
                <span>${repo.forks_count}</span>`;
            list.appendChild(row);
        });
        document.getElementById("userRepos").appendChild(list);
    }
};