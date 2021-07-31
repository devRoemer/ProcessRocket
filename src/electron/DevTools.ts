import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";

import Environment from "./Environment";

export class DevTools {
    public async install(): Promise<void> {
        if (Environment.isNotProduction() && !Environment.isTestProduction()) {
            // Install Vue Devtools
            try {
                await installExtension(VUEJS_DEVTOOLS);
            } catch (e) {
                console.error("Vue Devtools failed to install:", e.toString());
            }
        }
    }
}

export default new DevTools();
