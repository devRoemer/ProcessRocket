module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: "./src/electron/Entrypoint.ts",
      nodeIntegration: true,
      externals: ["node-pty"],
      builderOptions: {
        // Recommendation to be set for nsis according to documentation
        appId: "de.devroemer.processrocket",
        extraMetadata: {
          // Used for directory names in AppData\local and AppData\local\Programs
          name: "ProcessRocket",
          // Used for directory names in AppData\Roaming
          productName: "ProcessRocket",
        },
        // Used as a display name
        productName: "ProcessRocket",
        directories: {
          output: "./setup",
        },
        extraResources: ["./src/assets/**"],
        win: {
          icon: "./public/favicon.ico",
          target: [
            {
              target: "nsis",

              arch: ["x64"],
            },
          ],
        },
      },
    },
  },
};
