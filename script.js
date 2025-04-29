// List of artworks

const artworks = [
    {
        title: "The Starry Night",
        artist: "Vincent van Gogh",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        link: "https://en.wikipedia.org/wiki/The_Starry_Night"
    },
    {
        title: "The Persistence of Memory",
        artist: "Salvador Dalí",
        img: "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
        link: "https://en.wikipedia.org/wiki/The_Persistence_of_Memory"
    },
    {
        title: "The Great Wave off Kanagawa",
        artist: "Hokusai",
        img: "https://upload.wikimedia.org/wikipedia/commons/0/0a/The_Great_Wave_off_Kanagawa.jpg",
        link: "https://en.wikipedia.org/wiki/The_Great_Wave_off_Kanagawa"
    },
    {
        title: "Mona Lisa",
        artist: "Leonardo da Vinci",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
        link: "https://en.wikipedia.org/wiki/Mona_Lisa"
    }
];

// Pick random artwork
const randomArt = artworks[Math.floor(Math.random() * artworks.length)];

// Update the page with selected artwork
document.querySelector('.artwork img').src = randomArt.img;
document.querySelector('.artwork img').alt = randomArt.title + " by " + randomArt.artist;
document.querySelector('.info h2').textContent = randomArt.title;
document.querySelector('.info p').textContent = "by " + randomArt.artist;
document.querySelector('.info a').href = randomArt.link;

// Timer
let timeLeft = 60;
const timerElement = document.getElementById('timer');

const countdown = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(countdown);
        document.querySelector('artwork').style.opacity = 0;
        document.querySelector('info').innerHTML = "<h2>See you tomorrow!<h2>";
    }
}, 1000);