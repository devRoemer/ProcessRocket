import { BrowserWindow } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";

export default abstract class AbstractWindow {
    public browserWindow: BrowserWindow | undefined;

    public abstract create(width: number, height: number): void;

    public isVisible(): boolean | undefined {
        if (!this.browserWindow) {
            return undefined;
        }

        return this.browserWindow.isVisible();
    }

    public show(): void {
        if (!this.browserWindow) {
            return;
        }

        return this.browserWindow.show();
    }

    public hide(): void {
        if (!this.browserWindow) {
            return;
        }

        return this.browserWindow.hide();
    }

    protected async createBrowserWindow(
        path: string,
        width: number,
        height: number
    ): Promise<void> {
        this.browserWindow = new BrowserWindow({
            width: width,
            height: height,
            webPreferences: {
                // Use pluginOptions.nodeIntegration, leave this alone
                // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
                nodeIntegration: process.env
                    .ELECTRON_NODE_INTEGRATION as unknown as boolean,
                contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
                devTools: false,
            },
        });

        this.loadUrl(path);
    }

    protected async loadUrl(path: string): Promise<void> {
        if (!this.browserWindow) {
            return;
        }

        const vuePath = path ? `/#/${path}` : "";

        if (process.env.WEBPACK_DEV_SERVER_URL) {
            // Load the url of the dev server if in development mode
            await this.browserWindow.loadURL(
                `${process.env.WEBPACK_DEV_SERVER_URL}${vuePath}`
            );
            if (!process.env.IS_TEST)
                this.browserWindow.webContents.openDevTools();
        } else {
            createProtocol("app");
            // Load the index.html when not in development
            this.browserWindow.loadURL(`app://./index.html${vuePath}`);
        }
    }
}
