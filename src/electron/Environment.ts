import os from "os";

export class Environment {
    public isNotProduction(): boolean {
        return process.env.NODE_ENV !== "production";
    }

    public isTestProduction(): boolean {
        return !!process.env.IS_TEST;
    }

    public getOsShellName(): string {
        return os.platform() === "win32" ? "powershell.exe" : "bash";
    }
}

export default new Environment();
