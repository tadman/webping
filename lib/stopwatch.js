// == Exported Class ========================================================

class Stopwatch {
  constructor() {
    this.start();
  }

  start() {
    this.initial = process.hrtime();
  }

  elapsed() {
    var elapsed = process.hrtime(this.initial);

    return (elapsed[0] * 1e9 + elapsed[1]) / 1e6;
  }
}

// == Exports ===============================================================

module.exports = Stopwatch;
