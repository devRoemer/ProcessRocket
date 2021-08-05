import { Translation } from "@/Translation";

describe("I18n", () => {
    let i18n: Translation;

    beforeEach(() => {
        i18n = new Translation();
    });

    describe("localeToLanguageCode", () => {
        it("returns empty string", () => {
            const result = i18n.localeToLanguageCode("");
            expect(result).toBe("");
        });

        it("returns passed locale", () => {
            const result = i18n.localeToLanguageCode("en");
            expect(result).toBe("en");
        });

        it("returns first locale part", () => {
            const result = i18n.localeToLanguageCode("en-US");
            expect(result).toBe("en");
        });

        it("returns first locale part with multiple dashes", () => {
            const result = i18n.localeToLanguageCode("en-US-xx");
            expect(result).toBe("en");
        });
    });
});
