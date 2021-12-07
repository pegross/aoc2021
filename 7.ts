function median(numbers: number[]) {
  const sorted = numbers.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted[middle];
}

const input = await Deno.readTextFile('input/7');
const nums = input.trim().split(',').map((el) => parseInt(el));
const med = median(nums);
const avg = Math.round(nums.reduce((a, b) => a + b, 0) / nums.length - 1);

const aDiff = nums.reduce((acc, val) => acc + Math.abs(val - med), 0);
const bDiff = nums.reduce((acc, val) => {
  const diff = Math.abs(val - avg);
  return acc + (diff + 1) * diff / 2;
}, 0);

console.log('a', aDiff);
console.log('b', bDiff);
