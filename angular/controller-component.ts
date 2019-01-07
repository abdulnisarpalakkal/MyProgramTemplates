import { Component, OnInit,ViewChild,ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';

import { routerTransition } from './../../router.animations';
import {VirtualTableService,FormService,Handler} from '../../shared';
import {FormMaster} from '../../model/form-master.model';
import {VirtualTable} from '../../model/virtual-table.model';
import {VirtualTableFields} from '../../model/virtual-table-fields.model';
import {FormDesign} from '../../model/form-design.model';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [routerTransition()]
})
export class FormComponent implements OnInit {
//#region  Variables

formList:FormMaster[]=[];

temp = [];
modalform: FormMaster;
public filter_Form: FormMaster;

success=false;
msg="";
msg_class="";

submitted = false;
closeResult: string;
modalReference: any;

isNew :boolean=false;

@ViewChild(DatatableComponent) table: DatatableComponent;

//#endregion
  constructor(private formService: FormService,private modalService: NgbModal, private handler:Handler) { }

  ngOnInit() {
    
    this.getFormsList();
    this.filter_Form=new FormMaster();
  }
//#region Filters 
updateFilterEvent(event) {
  this.updateFilter();
}
updateFilter(){
  const formName =  this.filter_Form.formName?this.filter_Form.formName.toLowerCase():null;
 
  var valid=false;
  // filter our data
  const temp = this.temp.filter(function(d) {
      valid=  (!formName || (d.formName && (d.formName.toLowerCase()).indexOf(formName) !== -1))  ;
      return valid;
  });
  // update the rows
  this.formList = temp;
  // Whenever the filter changes, always go back to the first page
  this.table.offset = 0;
}
//#endregion

//#region handlers
successHandler(form: FormMaster,op)
{
  this.msg=this.handler.getSuccessMsg("VirtualTable  ",form.formName,op);
  this.submitted=true;
  this.success=true;
  this.msg_class="success";
}
errorHandler(error)
{
  this.msg=this.handler.getErrorMsg(error);
  this.success=false;
  this.msg_class="danger";
  this.submitted=true;
}

//#endregion


//#region Modal window
//#region Modal 1
open(content,form:FormMaster,isNew) {
  this.isNew=isNew;
  if(!isNew)
  {
    this.modalform=form;
  }
  else
    this.modalform=new FormMaster();
  this.submitted=false;
  this.modalReference=this.modalService.open(content,{ size: 'lg', backdrop:"static" });
  
  this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
closeModal() {
  this.modalReference.close();

}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
  } else {
      return  `with: ${reason}`;
  }
}
//#endregion Modal1


//#endregion


//#region Service calls
public getFormsList() {
  this.formService.get()
  .subscribe(
        data => {
          this.success=true;
          this.temp = [...data];
          this.formList=data;   
          this.updateFilter(); 
        },
        error=>{
         
          this.errorHandler(error);
        }
  );
}

delete(form:FormMaster){
  if(!confirm("Are you sure to delete "+form.formName)) {
      return;
  }
  this.submitted=true;
  this.formService.delete(form)
  .subscribe(
      data => {
        this.successHandler(form,"deleted");
        this.getFormsList();
      
      },
      error=>{
          this.errorHandler(error);
          this.getFormsList();
      }
  );
}

updateForm(form: FormMaster) {
      
  if(this.isNew)
  {
    
    
    this.formService.create(form)
    .subscribe(
        data => {
          this.successHandler(form,"Save");
          this.closeModal();
          this.getFormsList();
        },
        error=>{
            this.errorHandler(error);
        }
    );
  }
  else
  {
    this.formService.update(form)
    .subscribe(
        data => {
          this.successHandler(form,"Update");
          this.closeModal();
          this.getFormsList();
        },
        error=>{
            this.errorHandler(error);
        }
    );
  }


}

//#endregion
//#region event listeners
onDeleteClick(form: FormMaster){
  this.delete(form);
}
onUpdated(form: FormMaster) {
  this.updateForm(form);
}
public designClick(content,form:FormMaster){
  this.getVirtualTableFieldList(form.virtualTableMaster);
  this.getFormDesignList(form.id);
  this.openDesignModal(content,form);
}

//#endregion event listeners

}
