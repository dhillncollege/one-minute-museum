const quotes = [
    "I'm not lazy, I'm just on energy-saving mode.",
    "Why don't scientists trust atoms? Because they make up everything.",
    "I told my computer I needed a break, and it said 'No problem, I'll update.'",
    "I used to play piano by ear, but now I use my hands.",
    "404 joke not found.",
    "Why do they allow silent letters in words? Just stop inviting them.",
    "If life gives you lemons, make sure they're not expired."
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
document.getElementById("quote-text").textContent = `"${randomQuote}"`;