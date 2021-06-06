const quotes = [
    {
        quote: "This may not be a random quote.",
        author: "unknown",
    }
];

exports.getRandomQuote = () => {
    const min = 0;
    const max = quotes.length - 1;
    const number = Math.floor((Math.random() * (max - min + 1)) + min);

    return quotes[number];
};