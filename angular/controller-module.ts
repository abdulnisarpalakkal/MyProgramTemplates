
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule   }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { AdministrationRoutingModule } from './administration-routing.module';
import { UserComponent } from './user/user.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { AdministrationComponent } from './administration.component';
import { PageHeaderModule } from '../../shared';
import {UserModalComponent} from './user/modal/usermodal.component';
import {NgxDatatableComponent} from './user/table/ngx-datatable-demo';
import { UserRolesModalComponent } from './user-roles/user-roles-modal/user-roles-modal.component';



@NgModule({
    imports: [CommonModule, AdministrationRoutingModule, PageHeaderModule,FormsModule,NgxDatatableModule,NgbModule],
    declarations: [UserComponent,UserModalComponent,NgxDatatableComponent,AdministrationComponent,UserRolesComponent,UserRolesModalComponent ]
})
export class AdministrationModule {}
