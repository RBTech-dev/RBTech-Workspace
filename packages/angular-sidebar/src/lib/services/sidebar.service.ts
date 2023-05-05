import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SidebarMenuModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private _isToggle$ = new BehaviorSubject<boolean>(false);
  private _sidebarMenu$ = new Subject<SidebarMenuModel>();

  getIsToggle(): Observable<boolean> {
    return this._isToggle$.asObservable();
  }

  setIsToggle(isToggle: boolean) {
    this._isToggle$.next(isToggle);
  }

  toggle() {
    this.setIsToggle(!this._isToggle$.value);
  }

  getSidebarMenu(): Observable<SidebarMenuModel> {
    return this._sidebarMenu$.asObservable();
  }

  setSidebarMenu(sidebarMenu: SidebarMenuModel) {
    this._sidebarMenu$.next(sidebarMenu);
  }
}
