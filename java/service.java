package com.focowell.service;

import java.util.List;

import com.focowell.config.error.AlreadyExistsException;
import com.focowell.model.Category;

public interface CategoryService {
	    List<Category> findAll();
	    void delete(long id);
	    Category findOne(String categoryName);

	    Category findById(Long id);
	    Category save(Category category) throws AlreadyExistsException;
	    Category update(Category category);
}
