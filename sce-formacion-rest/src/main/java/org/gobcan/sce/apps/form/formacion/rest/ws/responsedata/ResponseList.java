package org.gobcan.sce.apps.form.formacion.rest.ws.responsedata;

import java.util.List;

public class ResponseList<T> {
    List<T> data;
    long totalRecords;

    public ResponseList(List<T> data, long totalRecords) {
        this.data = data;
        this.totalRecords = totalRecords;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public long getTotalRecords() {
        return totalRecords;
    }

    public void setTotalRecords(long totalRecords) {
        this.totalRecords = totalRecords;
    }
}
