package org.gobcan.sce.apps.form.formacion.rest.enums;

import javax.ws.rs.core.Response;

public enum FormacionRestErrorCodes {
    OPTIMISTIC_LOCKING_FAILURE("No se pudieron guardar los cambios ya que la entidad fue actualizada por otro usuario", "FORMACION-REST-E1001", Response.Status.CONFLICT),
    INVALID_HEADER("Cabeceras de validación no válidas", "FORMACION-REST-E1002", Response.Status.UNAUTHORIZED),
    UNPROCESSABLE_ENTITY("No se pudo guardar la entidad indicada", "FORMACION-REST-E1003", Response.Status.BAD_REQUEST);

    private final String message;
    private final String internalCode;
    private final Response.Status httpCode;

    FormacionRestErrorCodes(String mensaje, String internalCode, Response.Status httpCode) {
        this.message = mensaje;
        this.internalCode = internalCode;
        this.httpCode = httpCode;
    }

    public Response.Status getHttpStatusCode() {
        return httpCode;
    }

    public String getInternalCode() {
        return internalCode;
    }

    public String getMessage() {
        return message;
    }
}
