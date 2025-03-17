const lootboxes = document.querySelectorAll('.lootbox');
const prizeMessage = document.getElementById('prizeMessage');
const popup = document.querySelector('.popup-wrapper');

let = inventory = [];

const prizes = [
    { message: '100 pontos', color: '#4caf50' },
    { message: 'Cor nova', color: '#2196f3' },
    { message: 'Surpresa rara', color: '#9c27b0' },
    { message: 'Tente novamente!', color: '#f44336' },
    { message: '50 pontos', color: '#ff9800' }
];

// loader HTML structure
const loaderHTML = `
    <div class="spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    </div>
`;

popup.addEventListener('click', event =>{
    const classNameOfClickedElement = event.target.classList[0];
    const classNames = ['popup-close', 'popup-wrapper']
    const shouldClosePopup = classNames.some(className =>
         className === classNameOfClickedElement);

    if (shouldClosePopup) {
        popup.style.display = 'none';
        prizeMessage.textContent = ''; 
        prizeMessage.style.color = ''; 
    }
    
})

lootboxes.forEach(lootbox => {
    lootbox.addEventListener('click', () => {

        const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];

        popup.style.display = 'block';
        prizeMessage.innerHTML = loaderHTML; // Add the cube-loader
        
        setTimeout(() => {
            
            
            // Mostrar a surpresa com a cor e mensagem
            prizeMessage.innerHTML = randomPrize.message;
            prizeMessage.style.color = randomPrize.color;
        }, 2500); // Espera segundo para abrir a caixa

        // Resetar a caixa após a animação
        setTimeout(() => {
            lootbox.classList.remove('open');
        }, 1500); // Após 1,5 segundos a caixa fecha novamente*/
    });
});


