package com.focowell.model;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity  
@Table(name="PROCESS")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ProcessData implements Serializable {
	@Id  
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "process_seq")
    @SequenceGenerator(name = "process_seq", sequenceName = "DB_PROCESS_SEQ")
    private long id;
	
	@NotEmpty
	@Column(name="PROCESS_NAME", nullable=false)
	@Size(min=2, message="{process.firstName.size}")
    private String processName;
	
	
	@Column(name="PROCESS_DESC")
    private String processDesc;
	
	@ManyToOne(fetch=FetchType.LAZY)    
	private Category category;
	
	@ManyToOne(fetch=FetchType.LAZY)    
	private User createdUser;
	
	@Column(name="CREATED_DATE", columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
	private Date createdDate=new Date();
	
	@JsonIgnore
    @OneToMany( mappedBy="process")
    public Set<VirtualTableMaster> VirtualTableMasterList;
	

}
