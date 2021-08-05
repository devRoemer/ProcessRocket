import { app } from "electron";
import os from "os";
import path from "path";

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

    public getAssetPath(): string {
        return this.isPackaged()
            ? path.join(process.resourcesPath, "src", "assets")
            : path.join(".", "src", "assets");
    }

    public isPackaged(): boolean {
        return app.isPackaged;
    }
}

export default new Environment();
