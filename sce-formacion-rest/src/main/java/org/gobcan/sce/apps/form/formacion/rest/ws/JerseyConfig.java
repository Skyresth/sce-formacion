package org.gobcan.sce.apps.form.formacion.rest.ws;

import javax.ws.rs.ApplicationPath;

import org.gobcan.sce.apps.form.formacion.rest.ws.resources.CentrosResource;
import org.gobcan.sce.apps.form.formacion.rest.ws.resources.ClientLogger;
import org.gobcan.sce.apps.form.formacion.rest.ws.resources.Version;
import org.gobcan.sce.libs.commons.multi.jersey.model.SWSCEResourceConfig;
import org.gobcan.sce.libs.commons.multi.jersey.model.enums.SCEDomain;
import org.gobcan.sce.libs.commons.multi.jersey.services.swagger.SCESwaggerConfig;
import org.springframework.stereotype.Component;

@Component
@ApplicationPath("api/v1.0")
public class JerseyConfig extends SWSCEResourceConfig {

    @Override
    protected void registerResources() {
        register(ClientLogger.class);
        register(Version.class);
        register(CentrosResource.class);
        //register(AlumnoResource.class);
    }

    @Override
    protected SCESwaggerConfig registerSwaggerConfiguration() {
        SCESwaggerConfig config = new SCESwaggerConfig(SCEDomain.ONLY_EXTERNAL);
        config.setApiRelativeBasePath("../api/v1.0");
        config.setResourcesPackage("org.gobcan.sce.apps.form.formacion.rest.ws.resources");
        config.setTitle("swFormacion");
        config.setApiVersion("1.0");
        return config;
    }

}
