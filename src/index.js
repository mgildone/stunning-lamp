const map = new Map();
map.set("name", "Dave");
map.set("greetings", "Dear");
console.log(
  `${map.get("greetings")} ${map.get(
    "name"
  )} hope you like this example better!`
);
