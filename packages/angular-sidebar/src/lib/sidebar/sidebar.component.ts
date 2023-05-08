import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  SidebarContentMenuModel,
  SidebarMenuModel,
  SidebarMenuThemeModel,
} from '../models';
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
  @Input() theme: SidebarMenuThemeModel = {
    bgSidebarWrapper: '#1d1d1d',
    borderColor: '#2b2b2b',
    footerTopBorderColor: '#3a3a3a',
    color: '#bdbdbd',
    headerMenuColor: '#6c7b88',
    hoverColor: '#ffffff',
    shadowColor: '#131212',
    bgScrollbar: '#636363',
  };
  @Output() navigationEmitted = new EventEmitter<string>();

  protected faAnglesRight = faAnglesRight;
  protected faSearch = faSearch;

  constructor(protected sidebarService: SidebarService) {}

  get style(): string {
    return `
        --theme-bg-sidebar-wrapper: ${this.theme.bgSidebarWrapper};
        --theme-border-color: ${this.theme.borderColor};
        --theme-footer-top-border-color: ${this.theme.footerTopBorderColor};
        --theme-color: ${this.theme.color};
        --theme-header-menu-color: ${this.theme.headerMenuColor};
        --theme-hover-color: ${this.theme.hoverColor};
        --theme-shadow-color: ${this.theme.shadowColor};
        --theme-bg-scrollbar: ${this.theme.bgScrollbar};`;
  }

  toggle(currentMenu: SidebarContentMenuModel) {
    if (this.menu) {
      switch (currentMenu.type) {
        case 'dropdown':
          this.menu.contentMenus.forEach((element) => {
            if (element === currentMenu) {
              currentMenu.active = !currentMenu.active;
            } else {
              element.active = false;
            }
          });
          break;
        case 'simple':
          this.navigationEmitted.emit(currentMenu.href);
      }
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
