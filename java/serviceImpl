package com.focowell.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.focowell.config.error.AlreadyExistsException;
import com.focowell.dao.CategoryDao;
import com.focowell.dao.UserDao;
import com.focowell.model.Category;
import com.focowell.model.User;
import com.focowell.service.CategoryService;

@Service(value = "categoryService")
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryDao categoryDao;
	
	@Override
	public List<Category> findAll() {
		List<Category> list = new ArrayList<>();
		categoryDao.findAll().iterator().forEachRemaining(list::add);
		return list;
	}

	@Override
	public void delete(long id) {
		categoryDao.deleteById(id);
		
	}

	@Override
	public Category findOne(String categoryName) {
		return categoryDao.findByCategoryName(categoryName).get(0);
	}

	@Override
	public Category findById(Long id) {
		return categoryDao.findById(id).get();
	}

	@Override
	public Category save(Category category) throws AlreadyExistsException {
		if(categoryExist(category.getCategoryName()))
		{
			throw new AlreadyExistsException(
		              "There is an Category with the same name "
		              +  category.getCategoryName() );
		}
		return categoryDao.save(category);
	}

	@Override
	public Category update(Category category) {
		Category updateCategory =categoryDao.findById(category.getId()).get();
				
		updateCategory.setCategoryName(category.getCategoryName());
		updateCategory.setCategoryDesc(category.getCategoryDesc());
					
        return categoryDao.save(updateCategory);
	}
	
	private boolean categoryExist(String categoryName) {
        List<Category> categories = categoryDao.findByCategoryName(categoryName);
        if (categories != null && categories.size()!=0 ) {
            return true;
        }
        return false;
    }

}
