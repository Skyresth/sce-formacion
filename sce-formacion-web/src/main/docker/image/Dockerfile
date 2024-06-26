FROM centos:7.6.1810

MAINTAINER Sistemas SCE "sistemas.sce@gobierondecanarias.org"

ENV LANG=es_ES.utf8
ENV TZ=Atlantic/Canary
RUN localedef -c -i es_ES -f UTF-8 es_ES.UTF-8

# InstalaciÃƒÆ’Ã‚Â³n de dependencias
RUN yum -y install wget which

# Variables de entorno
ENV CATALINA_HOME=/opt/tomcat
ENV JAVA_HOME=/opt/java
ENV PATH=${PATH}:${JAVA_HOME}/bin:${CATALINA_HOME}/bin
ENV JPDA_ADDRESS="8000"
ENV JPDA_TRANSPORT="dt_socket"


# Instalar JDK
RUN wget http://10.140.66.64/publico/software/java/1.8.0_20/server-jre-8u20-linux-x64.tar.gz -O /tmp/server-jre-8u20-linux-x64.tar.gz && \
tar xzf /tmp/server-jre-8u20-linux-x64.tar.gz -C /opt && \
ln -s /opt/jdk1.8.0_20 /opt/java && \
rm -f /tmp/server-jre-8u20-linux-x64.tar.gz

# Instalar Tomcat
RUN wget http://10.140.66.64/publico/software/tomcat/apache-tomcat-8.0.39.tar.gz && \
tar -xvf apache-tomcat-8.0.39.tar.gz -C /opt && \
ln -s /opt/apache-tomcat-8.0.39 /opt/tomcat && \
rm -f /tmp/apache-tomcat*.tar.gz

# Crear usuario tomcat y asignar permisos
RUN groupadd -r tomcat && \
useradd -g tomcat -d ${CATALINA_HOME} -s /sbin/nologin -c "Tomcat user" tomcat && \
chown -R tomcat:tomcat /opt/jdk1.8.0_20 && \
chown -R tomcat:tomcat /opt/apache-tomcat-8.0.39 && \
chown -h tomcat:tomcat /opt/java && \
chown -h tomcat:tomcat /opt/tomcat && \
chmod +x ${CATALINA_HOME}/bin/*sh

# Directorio de trabajo
WORKDIR /opt/tomcat

# AÃ±adimos librerias
ADD /resources/lib/mail-1.4.1.jar /opt/tomcat/lib/mail-1.4.1.jar
ADD /resources/lib/ojdbc6-11.1.0.7.0.jar /opt/tomcat/lib/ojdbc6-11.1.0.7.0.jar
ADD /resources/lib/postgresql-9.4.1212.jre7.jar /opt/tomcat/lib/postgresql-9.4.1212.jre7.jar



# Puertos expuestos
EXPOSE 8080
EXPOSE 8009
EXPOSE 8000


# Arranque del servicio
USER tomcat
CMD ["catalina.sh", "jpda", "run"]
