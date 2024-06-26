package org.gobcan.sce.apps.form.formacion.core.utils;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

public class ScePageUtils {
    private static final int DEFAULT_PAGE_SIZE = 50;

    private ScePageUtils() {}

    public static Pageable createPageable(int pageIndex, int pageSize, String sortField, int sortOrder) {
        int newPageSize = pageSize == 0 ? DEFAULT_PAGE_SIZE : pageSize;
        Direction sortDirection = sortOrder == -1 ? Direction.DESC : Direction.ASC;
        Sort sort = sortField == null ? null : new Sort(sortDirection, sortField);
        return new PageRequest(pageIndex, newPageSize, sort);
    }
}
