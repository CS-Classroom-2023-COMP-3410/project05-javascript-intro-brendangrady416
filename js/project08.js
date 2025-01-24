/* script */

document.addEventListener("DOMContentLoaded", () => {
    const storyText = document.getElementById("story-text");
    const choicesContainer = document.getElementById("choices");
    const resetButton = document.getElementById("reset-btn");
    const progressText = document.getElementById("progress");

    const story = {
        start: {
            text: "You find yourself in a dark forest. What do you do?",
            choices: [
                { text: "Walk forward", next: "forward" },
                { text: "Turn back", next: "back" }
            ]
        },
        forward: {
            text: "You encounter a wild beast! Do you fight or run?",
            choices: [
                { text: "Fight", next: "fight" },
                { text: "Run", next: "run" }
            ]
        },
        fight: {
            text: "You bravely defeat the beast and find treasure! What do you do next?",
            choices: [
                { text: "Take the treasure", next: "treasure" },
                { text: "Leave it and explore further", next: "explore" }
            ]
        },
        run: {
            text: "You escape but remain haunted by the encounter. Where do you go next?",
            choices: [
                { text: "Head to the village", next: "village" },
                { text: "Find another path", next: "new_path" }
            ]
        },
        treasure: {
            text: "You become rich and live a happy life. The end!",
            choices: []
        },
        explore: {
            text: "You find a hidden path leading to an ancient ruin. Proceed?",
            choices: [
                { text: "Enter the ruin", next: "ruin" },
                { text: "Go back", next: "back" }
            ]
        },
        village: {
            text: "The villagers welcome you and share their wisdom. The adventure continues!",
            choices: []
        },
        new_path: {
            text: "You stumble upon a mysterious cave. Dare to enter?",
            choices: [
                { text: "Enter the cave", next: "cave" },
                { text: "Walk away", next: "back" }
            ]
        },
        ruin: {
            text: "Inside the ruin, you discover ancient secrets and powerful relics. Congratulations!",
            choices: []
        },
        cave: {
            text: "You venture into the dark cave and find a dragon! The adventure continues...",
            choices: []
        },
        back: {
            text: "You safely return home. The adventure ends.",
            choices: []
        }
    };

    function startGame() {
        let currentScene = localStorage.getItem("currentScene") || "start";
        renderScene(currentScene);
    }

    function renderScene(sceneKey) {
        const scene = story[sceneKey];
        storyText.innerText = scene.text;
        choicesContainer.innerHTML = "";
        localStorage.setItem("currentScene", sceneKey);
        
        scene.choices.forEach(choice => {
            const button = document.createElement("button");
            button.innerText = choice.text;
            button.onclick = () => renderScene(choice.next);
            choicesContainer.appendChild(button);
        });
        progressText.innerText = `Current stage: ${sceneKey}`;
    }

    resetButton.addEventListener("click", () => {
        localStorage.removeItem("currentScene");
        startGame();
    });

    startGame();
});
