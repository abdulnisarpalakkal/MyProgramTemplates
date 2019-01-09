package com.focowell.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.focowell.model.Category;

@Repository
public interface CategoryDao extends CrudRepository<Category, Long> {
	List<Category> findByCategoryName(String categoryName);
}
