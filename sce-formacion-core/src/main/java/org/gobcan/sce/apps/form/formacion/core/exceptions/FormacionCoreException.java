package org.gobcan.sce.apps.form.formacion.core.exceptions;

import org.gobcan.sce.apps.form.formacion.core.enums.FormacionCoreErrorCodes;

public class FormacionCoreException extends Exception {
    private static final long serialVersionUID = 6148399297370515042L;

    private final String code;

    public FormacionCoreException(FormacionCoreErrorCodes messageEnum, final Throwable cause) {
        super(cause.getMessage(), cause);
        this.code = messageEnum.getCode();
    }

    public String getCode() {
        return code;
    }
}
