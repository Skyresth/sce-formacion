Proyecto form-formacion generado con angular-sce-archetype-tomcat8
===

Prerequisitos:
---

+ Maven 3.5.0
+ JDK 1.8
+ Tomcat 8.x

El proyecto se puede compilar de dos formas:
---

**Todo el proyecto**

Compilará todo el proyecto incluyendo la capa de Angular (submódulo js):

`mvn clean install`

**Sin la capa web**

Evita la compilación incluyendo la capa de Angular (submódulo js) que hay instalada ya en el repositorio (.m2 local y/o Nexus):

`mvn clean install -Pnojs`
	
Configuración de servidor Tomcat:
---

**Data sources**

Fichero `<tomcat\_dir>/conf/server.xml`:

```xml
  <GlobalNamingResources>
    ...

    <Resource auth="Container"
        driverClassName="oracle.jdbc.OracleDriver"
        type="javax.sql.DataSource"
        name="jdbc/Sampleapp"
        url="jdbc:oracle:thin:@10.140.66.244:1521:TABAIBA"
        username="SCE"
        password="<password>"
        validationQuery="select 1 from dual"
    />
  </GlobalNamingResources>
```

Fichero `<tomcat_dir>/conf/context.xml`:

```xml
<Context>
    ...

  <ResourceLink name="jdbc/Sampleapp"
    global="jdbc/Sampleapp"
    auth="Container"
    type="javax.sql.DataSource"
  />
</Context>
```

**NOTA:** El DataSource `jdbc/Sampleapp` es el de la aplicación de prueba. Sustituir por el de la aplicación final.


**Otras configuraciones de Tomcat**

Añadir el fichero `empleo#formacion.xml` al directorio `<tomcat_dir>/conf/Catalina/localhost/` para configurar el logback:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration>

<Context>
	<Environment name="appName" value="Formacion" type="java.lang.String" override="true"/>
</Context>

```

Limpieza de ficheros de la aplicación de ejemplo
---

Una vez que la aplicación esté en desarrollo, se debe proceder a eliminar los ficheros relacionados con el modelo de la aplicación sampleapp, es decir, los que no sean necesarios para la estructura del proyecto.

**Ficheros a eliminar**

_core_

Eliminar las clases contenidas en los paquetes services, dto, entities y repositories.

*pom*
Eliminar/limpiar dependencias que no se usan.

_rest_

Eliminar las clases AlumnoCursoResource, AlumnoResource, CursoResource y TipoDocumentoResource. Limpiar el método registerRosources de la clase JerseyConfig.

_js_

En la carpeta angular-app/src/app/ eliminar los módulos alumno, alumnocurso, curso y tipo de documento. Limpiar en la clase AppModule las referencias a estos módulos. En AppRoutingModule redefinir la redirección de la ruta por defecto.


Docker:
---

**Configurar Proyecto con Docker**
1. Modificar xml de localhost por el context del proyecto. Ruta <ModuleWar>/src/main/docker/image/resources/conf/Catalina/localhost

> empleo#formacion.xml` al directorio `<ModuleWar>/src/main/docker/image/resources/conf/Catalina/localhost

2. Modificar docker-compose.yml de <ModuleWar>/src/main/docker

> - "../../../target/empleo#formacion.war:/opt/tomcat/webapps/empleo#formacion.war"

**Crear imagen**
Ir a la carpeta <ModuleWar>/src/main/docker/image y ejecutar el siguiente comando para crear la imagen.

> docker build -t <Nombre de la imagen>

*Ejemplo*:
> docker build -t local-tomcat-debug:SNAPSHOT

Nota: Por defecto esta la maquina en modo debug. Puerto 8000.

**Lanzar docker**
Compilar la aplicacion y ejecutar el siguiente comando para lanzar el tomcat en docker
La ruta para ejecutar el comando es <ModuleWar>/src/main/docker

> docker-compose up

El fichero docker-compose.yml el atributo image tiene que coincidir con el nombre del paso 1.

*Ejemplo*
> image: local-tomcat-debug:SNAPSHOT


Despliegue aplicaciones:
---
*Subida a repositorio de PRE*
**prepare-release**
> https://www3.gobiernodecanarias.org/empleo/intranet/confluence/pages/viewpage.action?pageId=25827156

*Autodespliegue*
> https://www3.gobiernodecanarias.org/empleo/intranet/confluence/display/SPC/GUIA+-+Despliegue+en+entornos+de+Desarrollo

**NOTA**: Arrancar el tomcat. Ejecutar comando mvn por consola cmd.

