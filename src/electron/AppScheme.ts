import { protocol } from "electron";

export class AppScheme {
    public register(): void {
        // Scheme must be registered before the app is ready
        protocol.registerSchemesAsPrivileged([
            { scheme: "app", privileges: { secure: true, standard: true } },
        ]);
    }
}

export default new AppScheme();
