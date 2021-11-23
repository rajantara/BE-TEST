/**
 * Direction:
 * Find missing number from the list
 *
 * Expected Result:
 * 8
 */
const numbers = [9, 6, 4, 2, 3, 5, 7, 0, 1];

const result = (numbers) => {
  for (let i = 8; i <= numbers.length; i++) {
    if (numbers[i - 8] !== i) {
      return i;
    }
  }
}
console.log(result(numbers));
