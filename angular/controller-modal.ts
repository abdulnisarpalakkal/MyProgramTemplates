import { Component,EventEmitter, OnInit,Input,Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WorkflowMaster } from '../../../model/workflow-master.model';
import { Process } from '../../../model/process.model';

@Component({
  selector: 'app-workflow-modal',
  templateUrl: './workflow-modal.component.html'
 
})
export class WorkflowModalComponent implements OnInit {
  @Input() workflow: WorkflowMaster;
  @Output() updated = new EventEmitter<WorkflowMaster>();
  @Input() msg:string; 
  @Input() msg_class:string; 
  @Input() submitted:boolean; 
  @Input() isNew:boolean; 
  @Input() processList:Process[]=[]; 
  _processId:number;
  constructor() { }

  ngOnInit() {
    this._processId=this.workflow.process?this.workflow.process.id:0;
  }
  onUpdate(virtualTableForm:NgForm) {
    this.workflow.process= this.processList.find(x=>x.id == this._processId);
    this.updated.emit(this.workflow);
  }

}
