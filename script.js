const searchButton = document.getElementById('search-button');
const nameContainer = document.getElementById('name-container');
const colorSelector = document.getElementById('color-selector');
const typeSelector = document.getElementById('type-selector');
const cardDescription = document.getElementById('card-description');
const cardImage = document.getElementById('card-picture');
const cardName = document.getElementById('card-name');

searchButton.addEventListener('click', async () => {
    const name = nameContainer.value.trim(); 
    const color = colorSelector.value;
    const type = typeSelector.value;

    const apiUrl = `https://digimoncard.io/api-public/search.php?n=${encodeURIComponent(name)}&color=${encodeURIComponent(color)}&type=${encodeURIComponent(type)}`;

    try {
        const response = await fetch(apiUrl, { method: 'GET' });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.length === 0) {
            cardName.textContent = "No cards found.";
            cardImage.src = "";
            cardDescription.textContent = "";
            return;
        }

        displayData(data[0]);

    } catch (error) {
        console.error('Error:', error);
        cardName.textContent = "An error occurred. Try again.";
    }
});

function displayData(card) {
    console.log(card); 

    cardName.textContent = card.name || "Unknown Name";
    cardImage.src = card.pretty_url || "";
    cardImage.alt = card.name || "Card Image";
    cardDescription.textContent = card.main_effect || "No description available.";
}