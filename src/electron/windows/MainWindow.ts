import AbstractWindow from "./AbstractWindow";

export default class MainWindow extends AbstractWindow {
    public async create(
        width: number = 800,
        height: number = 600
    ): Promise<void> {
        await this.createBrowserWindow("", width, height);
    }
}
