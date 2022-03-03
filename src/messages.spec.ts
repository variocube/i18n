import {Messages} from "./messages";

describe("message", () => {

    test("can get message", () => {
        const m = new Messages("en", {
            msg1: {
                en: "english",
                de: "deutsch"
            }
        });
        expect(m.getMessage("de", "msg1")).toBe("deutsch");
    });

    test("can load external", () => {
        const m = new Messages("en", {
            msg1: {
                en: "english",
            }
        }, {
            msg1: {
                ee: "estonian"
            }
        });
        expect(m.getMessage("ee", "msg1")).toBe("estonian");
    });

    test("can get messages", () => {
        const m = new Messages("en", {
            msg1: {
                en: "english 1",
            },
            msg2: {
                en: "english 2",
            }
        });
        expect(m.getMessages("en")).toEqual(expect.objectContaining({
            msg1: "english 1",
            msg2: "english 2"
        }));
    });

    test("can fallback to less specific lang", () => {
        const m = new Messages("en", {
            msg1: {
                en: "english",
            },
        });
        expect(m.getMessage("en-US", "msg1")).toBe("english");
        expect(m.getMessages("en-US").msg1).toBe("english");
    });

    test("can fallback to english", () => {
        const m = new Messages("en", {
            msg1: {
                en: "english",
            },
        });
        expect(m.getMessage("de", "msg1")).toBe("english");
        expect(m.getMessages("de").msg1).toBe("english");
    });

    test("can fallback on missing translation", () => {
        const m = new Messages("en", {
            msg1: {
                en: "english 1",
                de: "deutsch 1"
            },
            msg2: {
                en: "english 2"
            }
        });
        expect(m.getMessage("de", "msg2")).toBe("english 2");
    });

    test("resolves language case insensitive", () => {
        const m = new Messages("en", {
            msg1: {
                en: "english",
                "en-uk": "english uk"
            },
        });
        expect(m.getMessage("en-UK", "msg1")).toBe("english uk");
    })
});