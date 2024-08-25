const game = document.getElementById("game")

function startGame(game, cardsCount) {
  const cardsNumberArray = []
  let firstCard = null
  let secondCard = null


  // Создание массива чисел
  for (let i = 1; i <= cardsCount; i++) {
    cardsNumberArray.push(i, i)
  }

  // Перемешивание массива чисел
  for (let i = 0; i < cardsNumberArray.length; i++) {
    let randomIndex = Math.floor(Math.random() * cardsNumberArray.length)

    let temp = cardsNumberArray[i]
    cardsNumberArray[i] = cardsNumberArray[randomIndex]
    cardsNumberArray[randomIndex] = temp
  }

  // Настройка сетки
  let columns = 2

  switch (cardsCount) {
    case 3 :
       columns = 3;
       break;
    case 4 :
       columns = 4;
       break;
    case 5 :
       columns = 5;
       break;
    case 6 :
       columns = 4;
       break;
  }

  /* if (cardsCount === 3) {
    columns = 3
  }

  if (cardsCount === 4) {
    columns = 4
  }

  if (cardsCount === 5) {
    columns = 5
  }

  if (cardsCount === 6) {
    columns = 4
  }
 */
  game.style = `grid-template-columns: repeat(${columns}, 1fr);`

  // Создание карточек
  for (const cardNumber of cardsNumberArray) {
    let card = document.createElement("div")
    card.textContent = cardNumber
    card.classList.add("card")

    // Клик по карточке
    card.addEventListener("click", () => {
      if (card.classList.contains("open") || card.classList.contains("success")) {
        return
      }

      if (firstCard !== null && secondCard !== null) {
        firstCard.classList.remove("open")
        secondCard.classList.remove("open")
        firstCard = null
        secondCard = null
      }

      card.classList.add("open")

      if (firstCard === null) {
        firstCard = card
      } else {
        secondCard = card
      }

      if (firstCard !== null && secondCard !== null) {
        let firstCardNumber = firstCard.textContent
        let secondCardNumber = secondCard.textContent

        if (firstCardNumber === secondCardNumber) {
          firstCard.classList.add("success")
          secondCard.classList.add("success")
        }
      }

      // Проверка финала игры
      if (cardsNumberArray.length === document.querySelectorAll(".success").length) {
        setTimeout(() => {
          game.innerHTML = ""
          alert("ПОБЕДА!")
          let cardsCount = Number(prompt("Введите кол-во пар", 4));
          //Проверка введенных данных
          if ((cardsCount < 2) || (cardsCount > 10)) {
            alert("Число пар привелено к значению 4");
            cardsCount = 4;
            startGame(game, cardsCount);
          }

          else if (isNaN(cardsCount % 2)) {
            alert('Вы ввели не число! Число пар приведено к значению 4');
            cardsCount = 4;
            startGame(game, cardsCount);
          }


            else {startGame(game, cardsCount)};
          //startGame(game, cardsCount)
        }, 400)
      }

    })

    game.append(card)
  }
}

// Старт игры
let cardsCount = Number(prompt("Введите кол-во пар", 4));
//Проверка введенных данных
if ((cardsCount < 2) || (cardsCount > 10)) {
  alert("Число пар приведено к значению 4");
  cardsCount = 4;
  startGame(game, cardsCount);
}

else if (isNaN(cardsCount % 2)) {
  alert('Вы ввели не число! Число пар приведено к значению 4');
  cardsCount = 4;
  startGame(game, cardsCount);
}

  else {startGame(game, cardsCount)};
//startGame(game, cardsCount)
