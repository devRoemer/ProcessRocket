import { app } from "electron";
import Vue from "vue";
import VueI18n, { LocaleMessages } from "vue-i18n";

Vue.use(VueI18n);

export class Translation {
    private loadLocaleMessages(): LocaleMessages {
        const locales = require.context(
            "./translations",
            true,
            /[A-Za-z0-9-_,\s]+\.json$/i
        );
        const messages: LocaleMessages = {};
        locales.keys().forEach((key) => {
            const matched = key.match(/([A-Za-z0-9-_]+)\./i);
            if (matched && matched.length > 1) {
                const locale = matched[1];
                messages[locale] = locales(key);
            }
        });
        return messages;
    }

    private getOsLocale(): string {
        if (app) {
            return app.getLocale();
        }

        return navigator.language;
    }

    private getOsLanguage(): string | undefined {
        const locale = this.getOsLocale();
        return this.localeToLanguageCode(locale);
    }

    public localeToLanguageCode(locale: string): string {
        const localeParts = locale.split("-");
        return localeParts[0];
    }

    public getVueI18n(): VueI18n {
        return new VueI18n({
            locale: this.getOsLanguage(),
            fallbackLocale: "en",
            messages: this.loadLocaleMessages(),
        });
    }
}

export default new Translation().getVueI18n();
