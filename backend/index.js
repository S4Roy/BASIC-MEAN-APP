const app = require("./express");

const localPort = 3000;
const deployPort = 5000;

let port = process.env.NODE_ENV == 'local' ? localPort : deployPort
app.listen(port, () => {
  console.log("server started at", port);
});
