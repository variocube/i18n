import {Messages} from "@variocube/i18n";
import external from "./i18n/import.js";

export const messages = new Messages("en", {
    hello: {
        en: "Hello world!",
    },
}, external);
