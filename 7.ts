function median(numbers: number[]) {
  const sorted = numbers.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
}


const input = await Deno.readTextFile('input/7');
const nums = input.trim().split(',').map((el) => parseInt(el));
const med = median(nums);

const diff = nums.reduce((acc, val) => acc + Math.abs(val - med), 0);
console.log(diff);
