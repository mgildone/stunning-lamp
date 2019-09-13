const tasksList = [
  "purifyCSS",
  "minifyJavaScript",
  "clean",
  "monitor",
  "generateSourceMaps",
  "lintSass",
  "lintJavaScript",
  "loadJavaScript",
  "extractCSS",
  "loadImages",
  "loadFonts",
  "minifyCSS"
];

const isValidTask = tasksList => task => {
  if (tasksList.indexOf(task) === -1) {
    throw new Error(`Task "${task}" doesn't exists!`);
  }
};

const validateTask = isValidTask(tasksList);

const tasksConfig = tasks => {
  return tasks.reduce((acc, next) => {
    const task = next.split("no-");
    const taskName = task.length > 1 ? task[1] : task[0];
    validateTask(taskName);
    if (acc[taskName] && task[0] == "") {
      acc[taskName] = false;
    } else {
      acc[taskName] = true;
    }

    return acc;
  }, {});
};

const myFunc = (isEnvDevelopment, tasks) => config => {
  return Object.keys(config).reduce((acc, task) => {
    return config[task] ? acc.concat(tasks[task](isEnvDevelopment)) : acc;
  }, []);
};

module.exports = {
  tasksConfig,
  myFunc
};
