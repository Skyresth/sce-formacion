package org.gobcan.sce.apps.form.formacion.rest.dto;

public class ClientErrorDto {
    private String message;
    private String url;
    private String stack;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getStack() {
        return stack;
    }

    public void setStack(String stack) {
        this.stack = stack;
    }
    
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("\n");
        sb.append("  Message: " + message);
        sb.append("\n");
        sb.append("  URL: " + url);
        sb.append("\n");
        sb.append("  StackTrace: " + stack);
        return sb.toString();
    }
}
