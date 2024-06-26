package org.gobcan.sce.apps.form.formacion.rest.utils;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.UriInfo;

public class SceResourceUtils {

    private SceResourceUtils() {}

    public static Map<String, List<String>> addQueryParameter(Map<String, List<String>> queryParameters, String key, String value) {
        queryParameters.put(key, Arrays.asList(value));
        return queryParameters;
    }

    public static Map<String, List<String>> addQueryParameter(UriInfo ui, String key, String value) {
        Map<String, List<String>> targetQueryParameters = new HashMap<>(ui.getQueryParameters());
        return addQueryParameter(targetQueryParameters, key, value);
    }

    public static Map<String, List<String>> createQueryParameters(String key, String value) {
        Map<String, List<String>> targetQueryParameters = new HashMap<>();
        return addQueryParameter(targetQueryParameters, key, value);
    }
}
