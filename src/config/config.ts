import * as Nconf from "nconf";

// Prioritize in order:
// 1. Command line args
// 2. Env vars
// 3. Env specific file
// 4. Default file
const env = process.env.NODE_ENV || "development";

Nconf
    .argv()
    .env()
    .file("environmentConfig", `${__dirname}/${env.toLowerCase()}.json`)
    .file("defaultConfig", `${__dirname}/default.json`)
    .required(["PORT", "BASE_PATH", "LOG_FILE_PATH"]);
