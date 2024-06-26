package org.gobcan.sce.apps.form.formacion.core.enums;

public enum FormacionCoreErrorCodes {
    CLASS_INIT_ERROR("Class couldn't be initialized", "FORMACION-CORE-E1001"),
    OPTIMISTIC_LOCKING_FAILURE("Entity couldn't be saved, it was updated by another user", "FORMACION-CORE-E1002");

    private final String message;
    private final String code;

    FormacionCoreErrorCodes(String message, String code) {
        this.message = message;
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public String getCode() {
        return code;
    }
}
