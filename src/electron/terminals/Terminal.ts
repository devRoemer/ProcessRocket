import { ipcMain } from "electron";
import { IPty, IPtyForkOptions } from "node-pty";

import Environment from "../Environment";
import IpcEventNames from "../IpcEventNames";
import AbstractWindow from "../windows/AbstractWindow";
import ITerminalEventData from "./ITerminalEventData";

export default class Terminal {
    public readonly identifier: string;

    private readonly startupWorkingDirectory: string | undefined;
    private readonly attachedWindow: AbstractWindow;
    private ptyProcess: IPty | undefined;

    private outgoingMessageListener = (_: Electron.IpcMainEvent, eventData: ITerminalEventData) => {
        if (!this.ptyProcess || this.identifier !== eventData.identifier) {
            return;
        }

        this.ptyProcess.write(eventData.payload);
    };

    public constructor(identifier: string, attachedWindow: AbstractWindow, startupWorkingDirectory: string) {
        this.identifier = identifier;
        this.startupWorkingDirectory = startupWorkingDirectory ? startupWorkingDirectory : process.env.HOME;
        this.attachedWindow = attachedWindow;
    }

    public async spawn(): Promise<void> {
        const shell = Environment.getOsShellName();
        const options: IPtyForkOptions = this.createPtyOptions();

        const pty = await import("node-pty");
        this.ptyProcess = pty.spawn(shell, [], options);

        this.registerIncomingDataEvent();
        this.registerOutgoingDataEvent();
    }

    public kill(): void {
        if (!this.ptyProcess) {
            return;
        }

        if (this.outgoingMessageListener) {
            ipcMain.off(IpcEventNames.TERMINAL_OUTGOING_DATA, this.outgoingMessageListener);
        }

        this.ptyProcess.kill();
    }

    private createPtyOptions(): IPtyForkOptions {
        return {
            name: this.identifier,
            cols: 80,
            rows: 30,
            cwd: this.startupWorkingDirectory
        };
    }

    // Incoming: terminal process > presentation
    private registerIncomingDataEvent(): void {
        if (!this.ptyProcess) {
            return;
        }

        this.ptyProcess.onData((payload: string) => {
            const browserWindow = this.attachedWindow.browserWindow;

            if (!browserWindow) {
                return;
            }

            const eventData: ITerminalEventData = {
                identifier: this.identifier,
                payload: payload
            };

            browserWindow.webContents.send(IpcEventNames.TERMINAL_INCOMING_DATA, eventData);
        });
    }

    // Outgoing: user input > terminal process
    private registerOutgoingDataEvent(): void {
        ipcMain.on(IpcEventNames.TERMINAL_OUTGOING_DATA, this.outgoingMessageListener);
    }
}
