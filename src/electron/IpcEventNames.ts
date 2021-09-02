export default abstract class IpcEventNames {
    public static readonly TERMINAL_CREATE: string = "terminal.create";
    public static readonly TERMINAL_REMOVE: string = "terminal.remove";
    public static readonly TERMINAL_INCOMING_DATA: string = "terminal.incomingData";
    public static readonly TERMINAL_OUTGOING_DATA: string = "terminal.outgoingData";
}
