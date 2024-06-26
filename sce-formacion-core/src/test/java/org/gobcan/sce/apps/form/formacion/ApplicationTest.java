package org.gobcan.sce.apps.form.formacion;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableAutoConfiguration
@ComponentScan(basePackages = "org.gobcan.sce.apps.form.formacion")
@EnableJpaRepositories(basePackages = "org.gobcan.sce.apps.form.formacion.data.repositories")
@EntityScan(basePackages = "org.gobcan.sce.apps.form.formacion.data.entities")
public class ApplicationTest {

}