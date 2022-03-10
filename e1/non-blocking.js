var fs = require("fs");

fs.readFile("test.txt", function (err, data) {
  if (err) {
  }
  setTimeout(() => {
    console.log("Display after 2 sec");
  }, 2000);
});

console.log("Start here.");