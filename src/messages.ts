
export type Language = string;

/** A message in multiple languages */
export type MultiLingualMessage<L extends Language> = Record<Language, string>;

/** Collection of messages in multiple languages. */
export type MultiLingualMessages<L extends Language> = Record<string, MultiLingualMessage<L>>;

/** Collection of messages in a specific language */
export type LanguageSpecificMessages<L extends Language, M extends MultiLingualMessages<L>> = {
    [K in keyof M]: string;
}

/**
 * Holds messages in different languages and provides accessors to them.
 */
export class Messages<L extends Language, M extends MultiLingualMessages<L>> {

    private readonly map: Map<L, LanguageSpecificMessages<L, M>>;
    private readonly internal: Language[];

    constructor(private readonly defaultLanguage: L, internal: M, external?: MultiLingualMessages<Language>) {
        this.map = new Map();
        this.load(internal);
        this.internal = [...this.map.keys()];
        if (external) {
            this.load(external);
        }
    }

    private load(definition: M | MultiLingualMessages<Language>) {
        for (const key of Object.keys(definition)) {
            const mlMessage = definition[key] as MultiLingualMessage<L>;

            const languages = Object.keys(mlMessage)
                .map(lang => this.sanitizeLanguage(lang));

            for (const language of languages) {
                const value = mlMessage[language];
                if (value) {
                    let languageSpecificMessages = this.map.get(language);
                    if (!languageSpecificMessages) {
                        languageSpecificMessages = {} as LanguageSpecificMessages<L, M>;
                        this.map.set(language, languageSpecificMessages);
                    }
                    languageSpecificMessages[key as keyof M] = value;
                }
            }
        }
    }

    isInternalLanguage(language: Language) {
        return this.internal.includes(language);
    }

    /**
     * Returns whether the specified language is supported.
     * @param language
     */
    isSupportedLanguage(language: Language) {
        const l = this.sanitizeLanguage(language);
        return Boolean(this.map.get(l) || this.map.get(this.getLanguageOfLocale(l)));
    }

    /**
     * Returns the messages for the specified language.
     * @param language
     */
    getMessages(language: Language) {
        return this.resolve(language);
    }

    /**
     * Returns the messages for the specified language without fallback.
     * @param language
     */
    getMessagesWithoutFallback(language: Language) {
        return this.map.get(this.sanitizeLanguage(language));
    }

    getMessage(language: Language, key: keyof M) {
        return this.resolve(language)[key] || this.map.get(this.defaultLanguage)?.[key] || "Message not available.";
    }

    private resolve(language: Language) {
        const l = this.sanitizeLanguage(language);
        return this.map.get(l)
            || this.map.get(this.getLanguageOfLocale(l))
            || this.map.get(this.defaultLanguage)!;
    }

    private sanitizeLanguage(language: Language) {
        return language.toLowerCase().replace("_", "-") as L;
    }

    private getLanguageOfLocale(languageSpecifier: Language) {
        return languageSpecifier.split("-").shift() as L;
    }}

