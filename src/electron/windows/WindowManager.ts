import AbstractWindow from "./AbstractWindow";

export class WindowManager {
    private windows: { [windowName: string]: AbstractWindow } = {};

    public addWindow(windowName: string, window: AbstractWindow): void {
        this.windows[windowName] = window;
    }

    public getWindow(windowName: string): AbstractWindow {
        return this.windows[windowName];
    }

    public removeWindow(windowName: string): void {
        delete this.windows[windowName];
    }
}

export default new WindowManager();
