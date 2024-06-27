document.addEventListener("DOMContentLoaded", function() {
    const gifButton = document.getElementById('gifButton');
    const closeButton = document.getElementById('closeButton');
    const gifContainer = document.getElementById('gifContainer');

    gifButton.addEventListener('click', function() {
        
        gifContainer.innerHTML = '';

        const numGifs = 3;

        for (let i = 0; i < numGifs; i++) {
            fetch('https://yesno.wtf/api')
                .then(response => response.json())
                .then(data => {
                    const card = document.createElement('div');
                    card.classList.add('card-custom');
                    
                    const gifItem = document.createElement('div');
                    gifItem.classList.add('gifItem');
                    gifItem.style.backgroundImage = `url(${data.image})`;

                    card.appendChild(gifItem);
                    gifContainer.appendChild(card);
                })
                .catch(error => console.error('Error de GIF:', error));
        }
    });

    closeButton.addEventListener('click', function() {
        gifContainer.innerHTML = '';
    });
});
