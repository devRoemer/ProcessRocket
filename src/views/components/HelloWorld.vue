<template>
    <v-container>
        <div ref="terminal"></div>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

import { ipcRenderer, IpcRendererEvent } from "electron";
import IpcEventNames from "@/electron/IpcEventNames";
import ICreateTerminalEventData from "@/electron/terminals/ICreateTerminalEventData";
import ITerminalEventData from "@/electron/terminals/ITerminalEventData";

@Component({})
export default class HelloWorld extends Vue {
    mounted(): void {
        const terminalIdentifier = "test";

        const terminalCreateEventData: ICreateTerminalEventData = {
            identifier: terminalIdentifier,
            windowName: "main",
            workingDirectory: "C:\\"
        };

        ipcRenderer.send(IpcEventNames.TERMINAL_CREATE, terminalCreateEventData);

        var terminalUi = new Terminal({
            fontFamily: "Fira Code, Iosevka, monospace",
            fontSize: 12
        });

        terminalUi.open(this.$refs["terminal"] as unknown as HTMLElement);

        ipcRenderer.on(IpcEventNames.TERMINAL_INCOMING_DATA, (_: IpcRendererEvent, eventData: ITerminalEventData) => {
            if (eventData.identifier === terminalIdentifier) terminalUi.write(eventData.payload);
        });

        terminalUi.onData((payload: string) => {
            const eventData: ITerminalEventData = {
                identifier: terminalIdentifier,
                payload: payload
            };
            ipcRenderer.send(IpcEventNames.TERMINAL_OUTGOING_DATA, eventData);
        });
    }
}
</script>
