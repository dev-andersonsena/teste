function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomNumbers(totalNumbers, oddCount, evenCount) {
  const numbers = [];
  
  // Gerar números ímpares
  while (numbers.length < oddCount) {
    const num = getRandomNumber(1, totalNumbers);
    if (num % 2 !== 0 && numbers.indexOf(num) === -1) {
      numbers.push(num);
    }
  }
  
  // Gerar números pares
  while (numbers.length < oddCount + evenCount) {
    const num = getRandomNumber(1, totalNumbers);
    if (num % 2 === 0 && numbers.indexOf(num) === -1) {
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
  const randomNumbers = generateRandomNumbers(totalNumbers, oddCount, evenCount);
  const oddNumbers = randomNumbers.filter(num => num % 2 !== 0);
  const evenNumbers = randomNumbers.filter(num => num % 2 === 0);

  localStorage.setItem("oddNumbers", JSON.stringify(oddNumbers));
  localStorage.setItem("evenNumbers", JSON.stringify(evenNumbers));

  window.open("result.html", "_blank");
});
