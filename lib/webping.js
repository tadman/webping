// == Imports ===============================================================

const request = require('request');
const Promise = require('bluebird').Promise;
const Readable = require('stream').Readable;

const Stopwatch = require('./stopwatch');

// == Constants =============================================================

const defaults = {
  timeout: 10,
  repeat: 1
};

const version = require('../package.json').version;

// == Exported Class ========================================================

class WebPing extends Readable {
  static version() {
    return version;
  }

  constructor(target, options) {
    super({ objectMode: true });

    this.target = target;
    this.timeout = options && options.timeout || defaults.timeout;
    this.repeat = options && options.repeat || defaults.repeat;

    this.sequence = 0;
  }

  _read(size) {
    if (this.active) {
      return;
    }

    this.active = true;

    if (this.repeat) {
      setInterval(() => {
        this.ping();
      }, this.repeat * 1000)
    }
    else {
      this.ping();
    }
  }

  ping() {
    var sequence = this.sequence++;
    var meta = {
      sequence: sequence,
      target: this.target
    };
    var time = new Stopwatch();
    var response;

    return request.get(
      this.target,
      {
        timeout: this.timeout * 1000,
        time: true,
        headers: {
          'User-Agent': 'WebPing/' + version
        }
      }
    ).on('response', (_response) => {
      response = _response;
      response.wp = meta;
    }).on('end', () => {
      response.wp.timings = response.timings;
      response.wp.code = response.statusCode;

      this.push(response);
    })
    .on('error', (err) => {
      var elapsed = time.elapsed();

      err.wp = meta;
      err.wp.timings = {
        dns: elapsed,
        tcp: 0.0,
        firstByte: 0.0,
        download: 0.0,
        total: elapsed
      };
      err.wp.code = err.code;

      this.push(err);
    });
  }
}

// == Exports ===============================================================

module.exports = WebPing;
