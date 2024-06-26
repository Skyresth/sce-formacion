package org.gobcan.sce.apps.form.formacion.data.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Immutable;

/**
 * The persistent class for the CENTROS database table.
 * 
 */
@Entity
@Immutable
@Table(name = "VICFEMCENTROS", schema = "CURSOS_ICFEM")
@NamedQuery(name = "Centros.findAll", query = "SELECT s FROM Centros s")
public class Centros implements Serializable {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @Column(name = "CENTRO")
    private String centro;

    @Column(name = "NIF")
    private String nif;

    @Column(name = "DENOMINACION")
    private String denominacion;

    @Column(name = "DOMICILIO")
    private String domicilio;

    @Column(name = "LOCALIDAD")
    private String localidad;

    @Column(name = "CODPOSTAL")
    private String codpostal;

    @Column(name = "TELEFONO")
    private String telefono;

    @Column(name = "FAX")
    private String fax;

    @Column(name = "DOMICILIO_NOT")
    private String domicilioNot;

    @Column(name = "LOCALIDAD_NOT")
    private String localidadNot;

    @Column(name = "CODPOSTAL_NOT")
    private String codpostalNot;

    @Column(name = "CORREO")
    private String correo;

    @Column(name = "NOMBRE_COMERCIAL")
    private String nombreComercial;

    @Column(name = "CODMUNI")
    private String codmuni;

    @Column(name = "TIPO")
    private String tipo;

    public String getCentro() {
        return centro;
    }

    public void setCentro(String centro) {
        this.centro = centro;
    }

    public String getNif() {
        return nif;
    }

    public void setNif(String nif) {
        this.nif = nif;
    }

    public String getDenominacion() {
        return denominacion;
    }

    public void setDenominacion(String denominacion) {
        this.denominacion = denominacion;
    }

    public String getDomicilio() {
        return domicilio;
    }

    public void setDomicilio(String domicilio) {
        this.domicilio = domicilio;
    }

    public String getLocalidad() {
        return localidad;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }

    public String getCodpostal() {
        return codpostal;
    }

    public void setCodpostal(String codpostal) {
        this.codpostal = codpostal;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getDomicilioNot() {
        return domicilioNot;
    }

    public void setDomicilioNot(String domicilioNot) {
        this.domicilioNot = domicilioNot;
    }

    public String getLocalidadNot() {
        return localidadNot;
    }

    public void setLocalidadNot(String localidadNot) {
        this.localidadNot = localidadNot;
    }

    public String getCodpostalNot() {
        return codpostalNot;
    }

    public void setCodpostalNot(String codpostalNot) {
        this.codpostalNot = codpostalNot;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getNombreComercial() {
        return nombreComercial;
    }

    public void setNombreComercial(String nombreComercial) {
        this.nombreComercial = nombreComercial;
    }

    public String getCodmuni() {
        return codmuni;
    }

    public void setCodmuni(String codmuni) {
        this.codmuni = codmuni;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
