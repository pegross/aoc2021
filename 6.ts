class LanternSchool {

  private fish: number[] = [];

  constructor(initial: number[]) {
    for (let i = 0; i <= 8; i++) {
      this.fish[i] = 0;
    }

    for (const number of initial) {
      this.fish[number]++;
    }
  }

  simulateDay() {
    const newFish = this.fish[0];
    this.fish[0] = 0;

    for (let i = 1; i < this.fish.length; i++) {
      this.fish[i - 1] = this.fish[i];
    }

    this.fish[8] = newFish;
    this.fish[6] += newFish;
  }

  getFishCount() {
    return this.fish.reduce((sum, val): number => {
      return sum += val;
    });
  }
}


const input = await Deno.readTextFile('input/6');
const initial = input.split(',').map((el) => parseInt(el));
const school = new LanternSchool(initial);

for (let day = 0; day < 256; day++) {
  school.simulateDay();
}

console.log(school.getFishCount());
