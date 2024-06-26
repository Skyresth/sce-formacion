import java.io.File;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.net.URLClassLoader;

import java.lang.reflect.Method;
import java.io.FileReader;
import java.util.Map;
import java.io.Reader;
import java.io.FileNotFoundException;
import java.lang.reflect.InvocationTargetException;

public class SceVelocityTools {
    private static class MyClassLoader extends URLClassLoader
    {
        public MyClassLoader (URL[] urls, java.lang.ClassLoader parentLoader )
        {
            //--- Call the URLClassLoader constructor
            super(urls, parentLoader);
        }
    }

    private static Class getClass(String className, String rootFolder, String jarFile) {
        if (className == null) {
            throw new RuntimeException("Cannot get class: className is null");
        }
        if (rootFolder == null) {
            throw new RuntimeException("Cannot get rootFolder: rootFolder is null");
        }
        if (jarFile == null) {
            throw new RuntimeException("Cannot get JAR: jarFile is null");
        }

        jarFile = rootFolder + "/TelosysTools/lib/" + jarFile; 

        URL[] urls = new URL[1];
        try
        {
            URI uri = new File(jarFile).toURI();
            urls[0] = uri.toURL();
        } 
        catch (MalformedURLException e)
        {
            throw new RuntimeException("Cannot convert '" + jarFile + "' to URL (MalformedURLException)", e);
        }

        ClassLoader parentLoader = ClassLoader.getSystemClassLoader();

        MyClassLoader loader = new MyClassLoader(urls, parentLoader);

        Class c = null;
        try {
            c = loader.loadClass(className);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("Class not found '" + className + "' ", e);
        }

        return c;
    }

    // Ejemplo de llamada: #set($display = $sceVelocityTools.getDisplay($project.locationFullPath))
    public static Object getDisplay(String rootFolder) throws InstantiationException, IllegalAccessException {
        return getClass("org.apache.velocity.tools.generic.DisplayTool", rootFolder, "velocity-tools-2.0.jar").newInstance();
    }

    // Ejemplo de llamada: $sceVelocityTools.getEntityVariable($project.locationFullPath, 'alumno', 'menuClass')
    public static String getEntityVariable(String rootFolder, String entityName, String variableName) throws InstantiationException, 
        IllegalAccessException, NoSuchMethodException, FileNotFoundException, InvocationTargetException {

        Class jsonParserClass = getClass("org.json.simple.parser.JSONParser", rootFolder, "json-simple-1.1.1.jar");
        Object parserInstance = jsonParserClass.newInstance();

        Method parseMethod = jsonParserClass.getDeclaredMethod("parse", Reader.class);
        Object parsedObject;
        try {
            parsedObject = parseMethod.invoke(parserInstance, new FileReader(rootFolder + "/TelosysTools/entities.json"));
        } catch (InvocationTargetException | FileNotFoundException e) {
            return "";
        }

        Map<String, Map<String, Object>> entities = (Map<String, Map<String, Object>>)parsedObject;

        if (entities.get(entityName) == null) {
            return "";
        }

        String value = (String)entities.get(entityName).get(variableName);
        return value == null ? "" : value;
    }

    public static String pascalCaseToHyphenated(String pascalCaseString) {
        return camelCaseToHyphenated(pascalCaseString);
    }

    public static String camelCaseToHyphenated(String camelCaseString) {
        return camelCaseString.replaceAll("(.)([A-Z0-9])", "$1-$2").toLowerCase();
    }

    public static String getLabelFromName(String name) {
        return capitalize(name.replaceAll("(.)([A-Z0-9])", "$1 $2").toLowerCase());
    }

    public static String capitalize(String name) {
        return name.substring(0, 1).toUpperCase() + name.substring(1);
    }

}