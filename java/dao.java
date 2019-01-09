package com.focowell.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.focowell.model.ProcessData;




@Repository
public interface ProcessDao extends CrudRepository<ProcessData, Long> {
	List<ProcessData> findByProcessName (String processName);
	
	@Query("SELECT p FROM ProcessData p left join fetch p.category ")
	Iterable<ProcessData> findAllByJPQL();
}
