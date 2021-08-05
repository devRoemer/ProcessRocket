import { autoUpdater } from "electron-updater";

import Environment from "./Environment";
import Translation from "@/Translation";

export class Updater {
    public async checkForUpdates(): Promise<void> {
        if (!Environment.isPackaged()) {
            return;
        }

        const notification = {
            title: Translation.t("updatenotification.title").toString(),
            body: Translation.t("updatenotification.body").toString(),
        };

        try {
            await autoUpdater.checkForUpdatesAndNotify(notification);
        } catch (_) {
            console.error("Error while checking for updates");
        }
    }
}

export default new Updater();
