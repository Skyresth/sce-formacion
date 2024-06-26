package org.gobcan.sce.apps.form.formacion.rest.exceptions;

import javax.ws.rs.core.Response;

import org.gobcan.sce.apps.form.formacion.rest.enums.FormacionRestErrorCodes;
import org.gobcan.sce.libs.commons.multi.jersey.exceptions.SWSCEApplicationException;

public class FormacionRestException extends SWSCEApplicationException {
    private static final long serialVersionUID = 2575697947399392804L;

    public FormacionRestException(FormacionRestErrorCodes messageEnum, final Throwable cause) {
        super(messageEnum.getHttpStatusCode(), messageEnum.getInternalCode(), cause.getMessage());
    }

    public FormacionRestException(FormacionRestErrorCodes messageEnum) {
        super(messageEnum.getHttpStatusCode(), messageEnum.getInternalCode(), messageEnum.getMessage());
    }

    public FormacionRestException(Response.Status status, String code, String message) {
        super(status, code, message);
    }
}
