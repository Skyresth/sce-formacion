package org.gobcan.sce.apps.form.formacion.rest.ws.resources;

import java.util.List;

import javax.ws.rs.BadRequestException;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.gobcan.sce.apps.form.formacion.core.services.CentrosService;
import org.gobcan.sce.apps.form.formacion.data.dto.BusquedaCentrosDto;
import org.gobcan.sce.apps.form.formacion.data.dto.DetalleCentrosDto;
import org.gobcan.sce.apps.form.formacion.rest.utils.SceResourceUtils;
import org.gobcan.sce.apps.form.formacion.rest.ws.FormConstants;
import org.gobcan.sce.apps.form.formacion.rest.ws.responsedata.ResponseList;
import org.gobcan.sce.libs.commons.multi.jersey.exceptions.SWSCEApplicationException;
import org.gobcan.sce.libs.commons.multi.jersey.model.annotations.SecureByToken;
import org.gobcan.sce.libs.commons.multi.jersey.model.entities.responses.ResponseData;
import org.gobcan.sce.libs.commons.multi.jersey.model.enums.TrustOption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.util.StringUtils;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;


@Path("/centro")
@Produces(MediaType.APPLICATION_JSON)
@Api(value = "/centro")
//@SecureByToken(applicationId = FormConstants.APP_NAME, trustedApplications = TrustOption.NONE, executionProfiles = {FormConstants.PERFIL_TECNICO, FormConstants.PERFIL_CENTRO})
public class CentrosResource {
    
    @Autowired
    private CentrosService centroService;

    @Context
    HttpHeaders headers;

    @GET
    @ApiOperation(value = "Devuelve elementos filtrados por nif o nombre")
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Respuesta correcta", response = BusquedaCentrosDto.class, responseContainer = "List") 
    })
    public Response searchCentros(@QueryParam("nif") String nif, @QueryParam("nombre") String nombre) {
    	if (StringUtils.isEmpty(nif) && StringUtils.isEmpty(nombre)) {
            throw new BadRequestException("Al menos uno de los parámetros 'nif' o 'nombre' es requerido");
        }
        try {
            List<BusquedaCentrosDto> results = centroService.searchCentros(nif, nombre);
            return Response.ok(results).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error al buscar centros").build();
        }
    }

    @GET
    @Path("/all")
    @ApiOperation(value = "Devuelve todos los elementos filtrados")
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Respuesta correcta", response = BusquedaCentrosDto.class, responseContainer = "List") 
    })
    public Response getAllCentros(@QueryParam("q") String query) {
        try {
            List<BusquedaCentrosDto> results = centroService.searchCentros(query, null);
            return Response.ok(results).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error al obtener todos los centros").build();
        }
    }

    @GET
    @Path("/{centro}")
    @ApiOperation(value = "Devuelve un elemento centro")
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Respuesta correcta", response = DetalleCentrosDto.class), 
        @ApiResponse(code = 404, message = "Centro no encontrado") 
    })
    public Response getCentroDetail(@ApiParam(value = "ID del centro", required = true) @PathParam("centro") String centro) {
        try {
            DetalleCentrosDto centroDetail = centroService.getCentroDetailByNif(centro);
            if (centroDetail != null) {
                return Response.ok(centroDetail).build();
            } else {
                return Response.status(Response.Status.NOT_FOUND).entity("Centro no encontrado").build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error al obtener detalles del centro").build();
        }
    }
    
    @GET
    @Path("/hello")
    @ApiOperation(value = "Prueba")
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Respuesta de prueba") 
    })
    public Response hello() {
        return Response.ok("Hello").build();
    }
}