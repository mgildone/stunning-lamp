const uniqueArray = array => {
  return array.reduce((unique, item) => {
    return unique.indexOf(item) >= 0 ? unique : [...unique, item];
  }, []);
};

module.exports = {
  uniqueArray
};
