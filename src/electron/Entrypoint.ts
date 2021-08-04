import { app, BrowserWindow } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";

import AppScheme from "./AppScheme";
import DevTools from "./DevTools";
import ExitHandler from "./ExitHandler";
import TerminalManager from "./terminals/TerminalManager";
import TrayIcon from "./TrayIcon";
import MainWindow from "./windows/MainWindow";
import WindowManager from "./windows/WindowManager";
import WindowNames from "./windows/WindowNames";

AppScheme.register();

app.on("activate", async () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        await createMainWindow();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on("ready", async () => {
    createProtocol("app");
    await DevTools.install();
    await createMainWindow();
    TrayIcon.create();
});

ExitHandler.register();
TerminalManager.register();

async function createMainWindow(): Promise<void> {
    const mainWindow = new MainWindow();
    await mainWindow.create();
    WindowManager.addWindow(WindowNames.MAIN_WINDOW, mainWindow);
}
