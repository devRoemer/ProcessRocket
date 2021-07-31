import AbstractWindow from "./AbstractWindow";

export default class MainWindow extends AbstractWindow {
    public async create(
        width: number = 800,
        height: number = 600
    ): Promise<void> {
        await this.createBrowserWindow("", width, height);
        this.addHideOnMimimizeBehaviour();
    }

    // Hide on minimize and show on clicking the tray icon
    private addHideOnMimimizeBehaviour() {
        if (!this.browserWindow) {
            return;
        }

        this.browserWindow.on("minimize", (event: Event) => {
            event.preventDefault();
            this.hide();
        });
    }
}
