package com.focowell.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.focowell.config.error.AlreadyExistsException;
import com.focowell.dao.ProcessDao;
import com.focowell.dao.ProcessDao;
import com.focowell.model.ProcessData;

import com.focowell.service.ProcessService;
import com.focowell.service.ProcessService;

@Service(value = "processService")
public class ProcessServiceImpl implements ProcessService {

	@Autowired
	private ProcessDao processDao;
	
	@Override
	public List<ProcessData> findAll() {
		List<ProcessData> list = new ArrayList<>();
		processDao.findAllByJPQL().iterator().forEachRemaining(list::add);
		return list;
	}

	@Override
	public void delete(long id) {
		processDao.deleteById(id);
		
	}

	@Override
	public ProcessData findOne(String processName) {
		return processDao.findByProcessName(processName).get(0);
	}

	@Override
	public ProcessData findById(Long id) {
		return processDao.findById(id).get();
	}

	@Override
	public ProcessData save(ProcessData process) throws AlreadyExistsException {
		if(processExist(process.getProcessName(),0))
		{
			throw new AlreadyExistsException(
		              "There is an process with the same name "
		              +  process.getProcessName() );
		}
		return processDao.save(process);
	}

	@Override
	public ProcessData update(ProcessData process) throws AlreadyExistsException {
		ProcessData updateProcess =processDao.findById(process.getId()).get();
		if(processExist(process.getProcessName(),updateProcess.getId()))
		{
			throw new AlreadyExistsException(
		              "There is an process with the same name "
		              +  process.getProcessName() );
		}		
		updateProcess.setProcessName(process.getProcessName());
		updateProcess.setProcessDesc(process.getProcessDesc());
		updateProcess.setCategory(process.getCategory());
					
        return processDao.save(updateProcess);
	}
	
	private boolean processExist(String processName,long id) {
        List<ProcessData> processes = processDao.findByProcessName(processName);
        if (processes != null && processes.size()!=0 ) {
        	if(id==0)
        		return true;
        	for(ProcessData process : processes)
        	{
        		if(id!=process.getId())
        			return true;
        	}
        	
            
        }
        return false;
    }

}
