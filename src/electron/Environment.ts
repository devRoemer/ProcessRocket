export class Environment {
    public isNotProduction(): boolean {
        return process.env.NODE_ENV !== "production";
    }

    public isTestProduction(): boolean {
        return !!process.env.IS_TEST;
    }
}

export default new Environment();
