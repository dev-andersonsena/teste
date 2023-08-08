function getRandomNumber(min, max, excludeNumbers) {
  let num;
  do {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (excludeNumbers.includes(num));
  return num;
}

function generateRandomNumbers(totalNumbers, oddCount, evenCount, excludeNumbers) {
  const numbers = [];

  // Gerar números ímpares aleatórios
  while (numbers.filter(num => num % 2 !== 0).length < oddCount) {
    const num = getRandomNumber(1, totalNumbers, excludeNumbers);
    if (num % 2 !== 0 && !numbers.includes(num)) {
      numbers.push(num);
    }
  }

  // Gerar números pares aleatórios
  while (numbers.filter(num => num % 2 === 0).length < evenCount) {
    const num = getRandomNumber(1, totalNumbers, excludeNumbers);
    if (num % 2 === 0 && !numbers.includes(num)) {
      numbers.push(num);
    }
  }

  return numbers.sort((a, b) => a - b);
}

const totalNumbers = 25;
const oddCount = 8;
const evenCount = 7;

const sortButton = document.getElementById("sortButton");

sortButton.addEventListener("click", () => {
  const userNumbersInput = document.getElementById("userNumbers");
  const userNumbersArray = userNumbersInput.value
    .split(",")
    .map(num => parseInt(num.trim()))
    .filter(num => !isNaN(num) && num >= 1 && num <= totalNumbers);

  if (userNumbersArray.length > 10) {
    alert("Você pode inserir no máximo 10 números.");
    return;
  }

  const remainingCount = totalNumbers - userNumbersArray.length;
  if (remainingCount < oddCount + evenCount) {
    alert("Você deve inserir no máximo " + (oddCount + evenCount) + " números.");
    return;
  }

  const randomNumbers = [
    ...userNumbersArray,
    ...generateRandomNumbers(
      remainingCount,
      oddCount - userNumbersArray.filter(num => num % 2 !== 0).length,
      evenCount - userNumbersArray.filter(num => num % 2 === 0).length,
      userNumbersArray
    ),
  ];
  const oddNumbers = randomNumbers.filter(num => num % 2 !== 0);
  const evenNumbers = randomNumbers.filter(num => num % 2 === 0);

  localStorage.setItem("oddNumbers", JSON.stringify(oddNumbers));
  localStorage.setItem("evenNumbers", JSON.stringify(evenNumbers));

  window.open("result.html", "_blank");
});
