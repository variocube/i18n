/**
 * Returns the users preferred languages selected in the browser, or `undefined` if not called within a browser context.
 * @see navigator.languages
 */
export function getNavigatorLanguages() {
    if (typeof navigator != "undefined") {
        return navigator.languages || [navigator.language || (navigator as any).userLanguage];
    }
}