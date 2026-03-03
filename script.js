const disneyCharacters = [
  {
    name: "Mickey Mouse",
    avatar: "🐭",
    description: "You are cheerful, friendly, and always bring people together.",
  },
  {
    name: "Elsa",
    avatar: "❄️",
    description: "You are powerful, independent, and not afraid to be yourself.",
  },
  {
    name: "Simba",
    avatar: "🦁",
    description: "You are brave, loyal, and growing into your potential.",
  },
  {
    name: "Moana",
    avatar: "🌊",
    description: "You are adventurous, determined, and guided by your heart.",
  },
  {
    name: "Genie",
    avatar: "🧞",
    description: "You are playful, creative, and know how to light up a room.",
  },
  {
    name: "Mulan",
    avatar: "⚔️",
    description: "You are courageous, resourceful, and protect what matters.",
  },
  {
    name: "Belle",
    avatar: "📚",
    description: "You are curious, kind, and value inner beauty.",
  },
  {
    name: "Stitch",
    avatar: "👽",
    description: "You are unique, energetic, and fiercely loyal to friends.",
  },
];

const matchButton = document.getElementById("matchButton");
const characterAvatar = document.getElementById("characterAvatar");
const characterName = document.getElementById("characterName");
const characterDescription = document.getElementById("characterDescription");

matchButton.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * disneyCharacters.length);
  const character = disneyCharacters[randomIndex];

  characterAvatar.textContent = character.avatar;
  characterName.textContent = `You matched with ${character.name}!`;
  characterDescription.textContent = character.description;
});
