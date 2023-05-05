import { Component, Input } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { SidebarContentMenuModel, SidebarMenuModel } from '../models';
import { faAnglesRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'rbtech-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200)),
    ]),
    trigger('slideAnimation', [
      state(
        'show',
        style({
          transform: 'translateX(0%)',
        })
      ),
      state(
        'hide',
        style({
          transform: 'translateX(-80%)',
        })
      ),
      transition('show <=> hide', animate('0.5s ease-in-out')),
    ]),
  ],
})
export class SidebarComponent {
  @Input() menu?: SidebarMenuModel;
  protected faAnglesRight = faAnglesRight;
  protected faSearch = faSearch;

  constructor(protected sidebarService: SidebarService) {}
  toggle(currentMenu: SidebarContentMenuModel) {
    if (this.menu && currentMenu.type === 'dropdown') {
      this.menu.contentMenus.forEach((element) => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu: SidebarContentMenuModel) {
    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }
}
