if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line global-require,import/no-extraneous-dependencies
  require("dotenv").config();
}

const express = require("express");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const hotReload = require("webpack-hot-middleware");
const formatMessages = require("webpack-format-messages");
const chalk = require("chalk");
const webpackConfig = require("../webpack.config");

const app = express();
const port = process.env.PORT || 3001;
const compiler = webpack(webpackConfig);

app.use(hotReload(compiler));

app.use(
  webpackMiddleware(compiler, {
    publicPath: "/",
  })
);
compiler.hooks.invalid.tap("invalid", function () {
  console.log(chalk.bgBlue("Compiling..."));
});

compiler.hooks.done.tap("done", (stats) => {
  const messages = formatMessages(stats);

  if (!messages.errors.length && !messages.warnings.length) {
    console.log(chalk.bgGreen("Compiled successfully!"));
  }

  if (messages.errors.length) {
    console.log(chalk.bgRed("Failed to compile."));
    messages.errors.forEach((e) => console.log(e));
    return;
  }

  if (messages.warnings.length) {
    console.log(chalk.bgYellow("Compiled with warnings."));
    messages.warnings.forEach((w) => console.log(w));
  }
});
app.listen(port, () => {
  console.log(`listening port ${port} go to http://localhost:${port}`);
});
