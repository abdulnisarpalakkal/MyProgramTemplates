package com.focowell.controller;

import com.focowell.config.error.AlreadyExistsException;
import com.focowell.model.Category;
import com.focowell.model.User;
import com.focowell.model.UserDto;
import com.focowell.service.CategoryService;
import com.focowell.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;
    
    @Autowired
    private UserService userService;

    @RequestMapping(value="/categories", method = RequestMethod.POST)
    public Category create(@RequestBody Category category) throws AlreadyExistsException{
    	Authentication auth=SecurityContextHolder.getContext().getAuthentication();
    	
    	category.setCreatedUser(userService.findOne(auth.getName()));
    	return categoryService.save(category);
    }
    @RequestMapping(value="/categories", method = RequestMethod.GET)
    public List<Category> list(){
        return categoryService.findAll();
    }

    @RequestMapping(value = "/categories/{id}", method = RequestMethod.GET)
    public Category getOne(@PathVariable(value = "id") Long id){
        return categoryService.findById(id);
    }
    @RequestMapping(value = "/categories/{id}", method = RequestMethod.DELETE)
    public void deleteOne(@PathVariable(value = "id") Long id){
    	categoryService.delete(id);
        
        
    }
    @RequestMapping(value="/categories", method = RequestMethod.PUT)
    public Category update(@RequestBody Category category) {
    	return categoryService.update(category);
    }
    
}
