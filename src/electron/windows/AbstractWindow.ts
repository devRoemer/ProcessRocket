import { BrowserWindow } from "electron";

export default abstract class AbstractWindow {
    public windowName: string;
    public windowId: number;
    public browserWindow: BrowserWindow;

    protected async createBrowserWindow(options: Electron.BrowserWindowConstructorOptions, path: string): Promise<void> {
        options.webPreferences = {
            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION as unknown as boolean,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
        };

        this.browserWindow = new BrowserWindow(options);
        this.windowId = this.browserWindow.webContents.id;

        this.fixCloseIssues();
        this.loadUrl(path);
    }

    protected async loadUrl(path: string): Promise<void> {
        if (!this.browserWindow) {
            return;
        }

        const vuePath = path ? `/#/${path}` : "";

        if (process.env.WEBPACK_DEV_SERVER_URL) {
            // Load the url of the dev server if in development mode
            await this.browserWindow.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}${vuePath}`);
        } else {
            // Load the index.html when not in development
            this.browserWindow.loadURL(`app://./index.html${vuePath}`);
        }
    }

    private fixCloseIssues() {
        // Fixes delay on closing window and the issue
        // that the window does not close if the dev tools are open
        this.browserWindow.on("close", () => {
            this.browserWindow.destroy();
        });
    }
}
