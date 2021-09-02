import { ipcMain } from "electron";
import IpcEventNames from "../IpcEventNames";
import AbstractWindow from "../windows/AbstractWindow";
import WindowManager from "../windows/WindowManager";
import ICreateTerminalEventData from "./ICreateTerminalEventData";
import Terminal from "./Terminal";

export class TerminalManager {
    private terminals: { [identifier: string]: Terminal } = {};

    private createListener = async (_: Electron.IpcMainEvent, eventData: ICreateTerminalEventData) => {
        const window = WindowManager.getWindow(eventData.windowName);
        await this.createTerminal(eventData.identifier, window, eventData.workingDirectory);
    };

    private removeListener = (_: Electron.IpcMainEvent, identifier: string) => {
        this.removeTerminal(identifier);
    };

    public register(): void {
        ipcMain.on(IpcEventNames.TERMINAL_CREATE, this.createListener);
        ipcMain.on(IpcEventNames.TERMINAL_REMOVE, this.removeListener);
    }

    public unregister(): void {
        ipcMain.off(IpcEventNames.TERMINAL_CREATE, this.createListener);
        ipcMain.off(IpcEventNames.TERMINAL_REMOVE, this.removeListener);
    }

    private async createTerminal(identifier: string, attachedWindow: AbstractWindow, startupWorkingDirectory: string): Promise<void> {
        const terminal = new Terminal(identifier, attachedWindow, startupWorkingDirectory);

        await terminal.spawn();

        this.terminals[identifier] = terminal;
    }

    private removeTerminal(identifier: string): void {
        const terminal = this.terminals[identifier];

        if (terminal) {
            terminal.kill();
            delete this.terminals[identifier];
        }
    }
}

export default new TerminalManager();
