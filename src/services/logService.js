import * as Sentry from "@sentry/browser";

export function init() {
  Sentry.init({
    dsn: "https://d504d3ac5fc24f14a9c64225398c9c37@sentry.io/5106433"
  });
}

export function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
};

//named logger
