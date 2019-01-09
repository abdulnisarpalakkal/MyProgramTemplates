package com.focowell.service;

import java.util.List;

import com.focowell.config.error.AlreadyExistsException;
import com.focowell.model.ProcessData;


public interface ProcessService {
	    List<ProcessData> findAll();
	    void delete(long id);
	    ProcessData findOne(String categoryName);

	    ProcessData findById(Long id);
	    ProcessData save(ProcessData category) throws AlreadyExistsException;
	    ProcessData update(ProcessData category) throws AlreadyExistsException;
}
