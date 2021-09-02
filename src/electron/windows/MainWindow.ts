import AbstractWindow from "./AbstractWindow";
import WindowNames from "./WindowNames";

export default class MainWindow extends AbstractWindow {
    public async create(): Promise<void> {
        this.windowName = WindowNames.MAIN_WINDOW;

        const options: Electron.BrowserWindowConstructorOptions = {
            width: 800,
            minWidth: 800,
            height: 600,
            minHeight: 600,
            useContentSize: true,
            autoHideMenuBar: true
        };

        await this.createBrowserWindow(options, "");
        this.addHideOnMimimizeBehaviour();
    }

    // Hide on minimize and show on clicking the tray icon
    private addHideOnMimimizeBehaviour() {
        if (!this.browserWindow) {
            return;
        }

        this.browserWindow.on("minimize", (event: Event) => {
            event.preventDefault();
            this.browserWindow.hide();
        });
    }
}
