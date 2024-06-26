package org.gobcan.sce.apps.form.formacion.core.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;

import org.springframework.data.jpa.domain.Specification;

public class SceFilterSpecification {
    private static final List<String> EXCLUSSIONS = Arrays.asList("pageIndex", "pageSize", "sortField", "sortOrder");
    private static final String NOT_FILTER_SUFFIX = "!";

    private SceFilterSpecification() {}

    // tClass es necesario para devolver Specification<T> en lugar de Specification<Object>
    @SuppressWarnings("squid:S1172")
    public static <T> Specification<T> byProperties(final Class<T> tClass, final Map<String, List<String>> filters) {
        return (Root<T> candidateRoot, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            processFilters(tClass, filters, candidateRoot, criteriaQuery, criteriaBuilder, predicates);

            return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        };
    }

    private static <T> void processFilters(final Class<T> tClass, final Map<String, List<String>> filters, Root<T> candidateRoot, CriteriaQuery<?> criteriaQuery,
            CriteriaBuilder criteriaBuilder, List<Predicate> predicates) {
        for (Map.Entry<String, List<String>> filter : filters.entrySet()) {
            if (!EXCLUSSIONS.contains(filter.getKey())) {
                processFilter(tClass, candidateRoot, criteriaQuery, criteriaBuilder, predicates, filter);
            }
        }
    }

    private static <T> void processFilter(final Class<T> tClass, Root<T> candidateRoot, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder, List<Predicate> predicates,
            Map.Entry<String, List<String>> filter) {
        for (String value : filter.getValue()) {
            if (value != null && !"".equals(value)) {
                String key = filter.getKey();
                if (key.endsWith(NOT_FILTER_SUFFIX)) {
                    processNotFilter(tClass, predicates, candidateRoot, criteriaQuery, criteriaBuilder, key, value);
                } else {
                    processAffirmativeFilter(predicates, candidateRoot, criteriaBuilder, key, value);
                }
            }
        }
    }

    private static <T> void processAffirmativeFilter(List<Predicate> predicates, Root<T> candidateRoot, CriteriaBuilder criteriaBuilder, String key, String value) {
        String[] keyParts = key.split(Pattern.quote("."));
        if (keyParts.length == 2) {
            Expression<Object> expression = candidateRoot.join(keyParts[0]).get(keyParts[1]);
            predicates.add(criteriaBuilder.equal(expression, processValue(expression, value)));
        } else {
            predicates.add(createAffirmativePredicate(criteriaBuilder, candidateRoot, key, value));
        }
    }

    private static <T> Predicate createAffirmativePredicate(CriteriaBuilder criteriaBuilder, Root<T> candidateRoot, String key, String value) {
        if (candidateRoot.get(key).getJavaType().equals(String.class)) {
            Expression<String> expression = candidateRoot.<String> get(key);
            return criteriaBuilder.like(criteriaBuilder.lower(expression), "%" + value.toLowerCase() + "%");
        }
        Expression<Object> expression = candidateRoot.get(key);
        return criteriaBuilder.equal(expression, processValue(expression, value));
    }

    private static <T> void processNotFilter(Class<T> tClass, List<Predicate> predicates, Root<T> candidateRoot, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder,
            String key, String value) {

        String procesedKey = key.replace(NOT_FILTER_SUFFIX, "");
        String[] keyParts = procesedKey.split(Pattern.quote("."));

        if (keyParts.length == 2) {
            // Subconsulta para obtener los valores que cumplen el criterio, ignorando el "not"
            Subquery<T> subquery = criteriaQuery.subquery(tClass);
            Root<T> subqueryCandidateRoot = subquery.from(tClass);
            subquery.select(subqueryCandidateRoot);

            Expression<Object> expression = subqueryCandidateRoot.join(keyParts[0]).get(keyParts[1]);
            Predicate[] subqueryPredicates = new Predicate[] { criteriaBuilder.equal(expression, value), criteriaBuilder.equal(subqueryCandidateRoot, candidateRoot) };
            subquery.where(subqueryPredicates);

            // Finalmente aplicamos el "not" y nos quedamos con los que NO cumplen el criterio
            predicates.add(criteriaBuilder.not(criteriaBuilder.exists(subquery)));
        } else {
            Path<Object> path = candidateRoot.get(procesedKey);

            predicates.add(criteriaBuilder.or(criteriaBuilder.isNull(path), criteriaBuilder.notEqual(path, processValue(path, value))));
        }
    }

    private static Object processValue(Expression<Object> expression, String value) {
        if (expression.getJavaType().equals(java.util.Date.class)) {
            long longDate = Long.parseLong(value);
            return new Date(longDate);
        }
        return value;
    }
}
