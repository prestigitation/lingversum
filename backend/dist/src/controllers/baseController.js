"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class baseController {
    constructor() {
        this.i18n = undefined;
        this.initI18N();
    }
    initI18N() {
        const i18nInstance = require('i18n-2');
        this.i18n = new i18nInstance({
            locales: ['en']
        });
    }
    getI18N() {
        return this.i18n;
    }
}
exports.default = baseController;
