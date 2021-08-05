import { app } from "electron";
import { autoUpdater } from "electron-updater";

import Environment from "./Environment";
import Translation from "@/Translation";

export class Updater {
    public register(): void {
        app.on("ready", this.checkForUpdates);
    }

    private async checkForUpdates(): Promise<void> {
        if (!Environment.isPackaged()) {
            return;
        }

        const notification = {
            title: Translation.t("updatenotification.title").toString(),
            body: Translation.t("updatenotification.body").toString(),
        };

        await autoUpdater.checkForUpdatesAndNotify(notification);
    }
}

export default new Updater();
