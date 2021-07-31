module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: "./src/electron/Entrypoint.ts"
    },
  },
};
