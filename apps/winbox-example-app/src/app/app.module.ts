import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SimpleComponentComponent } from './simple-component/simple-component.component';
import { AngularSidebarModule } from '@rbtechdev/angular-sidebar';

@NgModule({
  declarations: [AppComponent, SimpleComponentComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    AngularSidebarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
