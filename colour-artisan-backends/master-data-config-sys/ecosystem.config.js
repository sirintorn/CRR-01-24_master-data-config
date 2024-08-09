module.exports = {
    apps: [
      {
        name: "master-data-config",
        script: "./src/index.ts",
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: "1G",
        out_file: "./out.log",
        error_file: "./error.log",
        merge_logs: true,
        log_date_format: "DD-MM HH:mm:ss Z",
        log_type: "json",
        env: {
          NODE_ENV: "development",
          PORT: 4000,
         },
      },
    ],
  }