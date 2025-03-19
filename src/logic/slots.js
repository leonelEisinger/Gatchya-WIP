// Função para girar os slots
document.getElementById('spinButton').addEventListener('click', function() {
    const symbols = ["🍒", "🍋", "🍊", "🍉", "🍇"];
    const slotElements = document.querySelectorAll('.slot');
    
    // Desabilitar o botão durante o giro
    document.getElementById('spinButton').disabled = true;
    
    // Aplicar a animação de girar
    document.getElementById('slot-machine').style.animation = 'spin 1s ease-in-out infinite';

    // Função para gerar um novo símbolo para cada slot
    function generateRandomSymbols() {
        return symbols[Math.floor(Math.random() * symbols.length)];
    }

    // Girar os slots
    setTimeout(function() {
        slotElements[0].textContent = generateRandomSymbols();
        slotElements[1].textContent = generateRandomSymbols();
        slotElements[2].textContent = generateRandomSymbols();

        // Parar a animação de girar
        document.getElementById('slot-machine').style.animation = 'none';
        
        // Verificar se venceu
        checkWin();
    }, 1000);
});

// Função para verificar se a combinação é vencedora
function checkWin() {
    const slotElements = document.querySelectorAll('.slot');
    const symbols = [slotElements[0].textContent, slotElements[1].textContent, slotElements[2].textContent];

    // Se todos os símbolos forem iguais, o jogador venceu
    if (symbols[0] === symbols[1] && symbols[1] === symbols[2]) {
        displayWinMessage();
    } else {
        document.getElementById('congratulations').style.display = 'none'; // Esconde a mensagem de vitória, caso não ganhe
    }

    // Habilitar o botão novamente
    document.getElementById('spinButton').disabled = false;
}

// Função para exibir a mensagem de vitória
function displayWinMessage() {
    const message = document.getElementById('congratulations');
    message.style.display = 'block';
    message.classList.add('animate__animated', 'animate__flash');
}
