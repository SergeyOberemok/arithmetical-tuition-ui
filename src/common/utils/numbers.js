export function generateRandomNear(number, range = 4, allowNegative = false) {
  number = number ? number : 0
  let arr = Array.from(Array(range + 1), (v, i) => number + i + 1)
  let middle = Math.round((range + 1) / 2)

  if (number - middle < 0 && !allowNegative) {
    const difference = Math.abs(number - middle) - 1
    middle -= difference
  }

  return arr.map((i) => i - middle)
}

export function pickRandom(numbers) {
  const randomIndex = Math.floor(Math.random() * numbers.length)

  return numbers[randomIndex]
}
