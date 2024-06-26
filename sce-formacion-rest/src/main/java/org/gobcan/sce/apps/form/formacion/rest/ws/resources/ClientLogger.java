package org.gobcan.sce.apps.form.formacion.rest.ws.resources;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.gobcan.sce.apps.form.formacion.rest.dto.ClientErrorDto;
import org.gobcan.sce.libs.commons.multi.jersey.exceptions.SWSCEApplicationException;
import org.gobcan.sce.libs.commons.multi.jersey.model.entities.responses.ResponseData;
import org.gobcan.sce.libs.commons.multi.logging.Logger;
import org.gobcan.sce.libs.commons.multi.logging.LoggerFactory;

@Path("/client-logger")
@Produces(MediaType.APPLICATION_JSON)
public class ClientLogger {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(ClientLogger.class);

    @POST
    public Response log(ClientErrorDto error) throws SWSCEApplicationException {
        LOGGER.error("ClientLog - " + error);

        ResponseData<String> responseData = new ResponseData<>("OK");
        return responseData.ok();
    }
}
