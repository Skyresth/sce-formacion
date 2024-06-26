package org.gobcan.sce.apps.form.formacion.core.utils;

import java.util.ArrayList;
import java.util.List;

import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public class SceBeanUtils {
    private Mapper mapper;

    public SceBeanUtils() {
        mapper = new DozerBeanMapper();
    }

    public <S, T> Page<T> copyPageProperties(Page<S> page, Class<T> targetClass, Pageable pageable) {
        List<T> content = copyListProperties(page, targetClass);
        return new PageImpl<>(content, pageable, page.getTotalElements());
    }

    public <S, T> List<T> copyListProperties(Iterable<S> source, Class<T> targetClass) {
        List<T> target = new ArrayList<>();

        for (S sourceObject : source) {
            target.add(copyProperties(sourceObject, targetClass));
        }

        return target;
    }

    public <S, T> T copyProperties(S source, Class<T> targetClass) {
        if (source == null) {
            return null;
        }
        return mapper.map(source, targetClass);
    }

    public <S, T> void copyProperties(S source, T target) {
        mapper.map(source, target);
    }

    public <T, S> T dtoToEntity(CrudRepository<T, Long> repository, S dto, Long id, Class<T> targetClass) {
        if (id == null) {
            return copyProperties(dto, targetClass);
        }

        T entity = repository.findOne(id);
        copyProperties(dto, entity);
        return entity;
    }
}
