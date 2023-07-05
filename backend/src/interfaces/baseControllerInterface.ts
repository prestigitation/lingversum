import i18n from "../types/i18n";

export default interface baseControllerInterface {
    initI18N() : void;
    getI18N(): i18n;
}