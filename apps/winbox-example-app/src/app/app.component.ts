import { Component, OnInit } from '@angular/core';
import { WinboxService } from '@rbtech/angular-winbox';
import { SimpleComponentComponent } from './simple-component/simple-component.component';
import { SidebarMenuModel } from '@rbtechdev/angular-sidebar';
import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion';

@Component({
  selector: 'rbtech-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'winbox-example-app';
  faIcon = faQuestion;
  menu: SidebarMenuModel = {
    sidebarTitle: 'SIDEBAR',
    status: 'Online',
    username: 'USER',
    subtitle: 'Admin',
    sidebarTitleHref: '/home',
    sidebarUsrPicSrc: 'assets/user.png',
    placeholderSearch: 'Cerca...',
    isSearchVisible: true,
    contentMenus: [
      {
        title: 'HEADER',
        type: 'header',
        visible: true,
      },
      {
        title: 'MENU 1',
        type: 'simple',
        visible: true,
        icon: this.faIcon,
        href: '/s',
      },
      {
        title: 'HEADER',
        type: 'header',
        visible: true,
      },
      {
        title: 'MENU 1',
        type: 'dropdown',
        visible: true,
        icon: this.faIcon,
        href: '#',
        subMenus: [
          {
            title: 'SUBMENU 1',
            visible: true,
            href: '/g',
          },
        ],
      },
    ],
    footerMenus: [],
  };

  constructor(private winboxService: WinboxService) {}

  ngOnInit(): void {
    this.winboxService.openWinBox<SimpleComponentComponent>(
      {
        title: 'Test',
        height: '90%',
        width: '40%',
        x: 'center',
        y: 'center',
        index: 1057,
        onclose: (): boolean => {
          return true;
        },
      },
      SimpleComponentComponent
    );
    this.winboxService.showLastWinbox();
  }
}
