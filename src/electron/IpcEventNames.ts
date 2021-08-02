export default abstract class IpcEventNames {
    static readonly TERMINAL_CREATE: string = "terminal.create";
    static readonly TERMINAL_REMOVE: string = "terminal.remove";
    static readonly TERMINAL_INCOMING_DATA: string = "terminal.incomingData";
    static readonly TERMINAL_OUTGOING_DATA: string = "terminal.outgoingData";
}
