import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SimpleComponentComponent } from './simple-component/simple-component.component';
import { AngularSidebarModule } from '@rbtechdev/angular-sidebar';
import { ModalYesNoComponent } from './modal-yes-no/modal-yes-no.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent, SimpleComponentComponent, ModalYesNoComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    AngularSidebarModule,
    NgbModalModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
