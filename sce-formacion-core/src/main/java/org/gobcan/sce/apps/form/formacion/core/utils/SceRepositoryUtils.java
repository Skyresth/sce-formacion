package org.gobcan.sce.apps.form.formacion.core.utils;

import org.gobcan.sce.apps.form.formacion.core.enums.FormacionCoreErrorCodes;
import org.gobcan.sce.apps.form.formacion.core.exceptions.FormacionCoreException;
import org.springframework.data.repository.CrudRepository;
import org.springframework.orm.ObjectOptimisticLockingFailureException;

public class SceRepositoryUtils {
    private SceRepositoryUtils() {
    }

    public static <T> T save(CrudRepository<T, Long> repository, T entity) throws FormacionCoreException {
        try {
            return repository.save(entity);
        } catch (ObjectOptimisticLockingFailureException ex) {
            throw new FormacionCoreException(FormacionCoreErrorCodes.OPTIMISTIC_LOCKING_FAILURE, ex);
        }
    }
}
