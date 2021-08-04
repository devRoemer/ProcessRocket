import { Menu, Tray } from "electron";
import Environment from "./Environment";

import WindowManager from "./windows/WindowManager";
import WindowNames from "./windows/WindowNames";

export class TrayIcon {
    private tray: Tray | undefined;

    private trayClickListener = () => {
        const mainWindow = WindowManager.getWindow(WindowNames.MAIN_WINDOW);
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    };

    public create(): void {
        if (this.tray) {
            this.tray.destroy();
        }

        const assetPath = Environment.getAssetPath();
        this.tray = new Tray(`${assetPath}/logo-light.png`);
        this.tray.setToolTip("ProcessRocket");
        this.createContextMenu();
        this.addClickHandler();
    }

    private addClickHandler(): void {
        if (!this.tray) {
            return;
        }
        this.tray.on("click", this.trayClickListener);
    }

    private createContextMenu(): void {
        if (!this.tray) {
            return;
        }
        const contextMenu = Menu.buildFromTemplate([
            { role: "quit", label: "Exit" },
        ]);
        this.tray.setContextMenu(contextMenu);
    }
}

export default new TrayIcon();
