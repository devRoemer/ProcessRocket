import AbstractWindow from "./AbstractWindow";

export class WindowManager {
    private windows: AbstractWindow[] = [];

    public addWindow(window: AbstractWindow): void {
        this.windows.push(window);
    }

    public getById(windowId: number): AbstractWindow {
        return this.windows.find((w) => w.windowId === windowId);
    }

    public getFirstByName(windowName: string): AbstractWindow {
        return this.windows.find((w) => w.windowName === windowName);
    }

    public remove(windowToRemove: AbstractWindow): void {
        this.windows = this.windows.filter(function (window: AbstractWindow) {
            return !(window.windowName === windowToRemove.windowName && window.windowId === windowToRemove.windowId);
        });
    }

    public async showOrCreateWindow(windowName: string, createCallback: () => Promise<AbstractWindow>): Promise<void> {
        const existingWindow = this.getFirstByName(windowName);

        if (existingWindow) {
            // Bring to front if already open
            existingWindow.browserWindow.show();
        } else {
            const newWindow = await createCallback();
            this.addWindow(newWindow);
        }
    }
}

export default new WindowManager();
