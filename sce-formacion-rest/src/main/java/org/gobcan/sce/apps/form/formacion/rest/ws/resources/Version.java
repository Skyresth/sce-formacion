package org.gobcan.sce.apps.form.formacion.rest.ws.resources;

import java.util.ResourceBundle;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.gobcan.sce.libs.commons.multi.jersey.exceptions.SWSCEApplicationException;
import org.gobcan.sce.libs.commons.multi.jersey.model.entities.responses.ResponseData;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Path("/version")
@Produces(MediaType.APPLICATION_JSON)
@Api(value = "/version")
public class Version {

    @GET
    @ApiOperation(value = "Obtiene el número de versión de la aplicación")
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Respuesta correcta", response = ResponseData.class) })
    public Response version() throws SWSCEApplicationException {

        ResponseData<String> responseData = new ResponseData<>(getVersion());

        return responseData.ok();
    }

    public static String getVersion() {

        ResourceBundle rb = ResourceBundle.getBundle("mavenproject");

        return rb.getString("versionCliente");
    }

}
