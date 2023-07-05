import baseControllerInterface from "../interfaces/baseControllerInterface";
import i18n from "../types/i18n";


export default class baseController implements baseControllerInterface {
    i18n: i18n | undefined = undefined;
    constructor() {
        this.initI18N();
    }
    initI18N(): void {
        const i18nInstance = require('i18n-2')
        this.i18n = new i18nInstance({
            locales: ['en']
        })
    }
    getI18N(): i18n {
        return this.i18n;
    }
}