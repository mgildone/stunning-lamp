const _pipe = (f, g) => (...args) => g(f(...args));
const pipe = (...fns) => fns.reduce(_pipe);
const compose = (...fns) => fns.reduceRight(_pipe);

module.exports = {
  pipe,
  compose
};
