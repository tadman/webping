// == Imports ===============================================================

// == Exported Functions ====================================================

function urlify(url) {
  if (url.match(/^https?:\/\//)) {
    return url;
  }

  if (!url.match(/\//)) {
    url += '/';
  }

  return 'http://' + url;
}

// == Exports ===============================================================

module.exports = urlify;
