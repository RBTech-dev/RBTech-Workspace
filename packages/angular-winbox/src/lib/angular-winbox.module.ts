import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { WinboxService } from './winbox.service';

@NgModule({
  imports: [CommonModule, OverlayModule],
  providers: [WinboxService],
})
export class AngularWinBoxModule {}
