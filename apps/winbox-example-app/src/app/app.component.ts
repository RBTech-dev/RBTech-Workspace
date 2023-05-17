import { Component, OnInit } from '@angular/core';
import { WinboxService } from '@rbtech/angular-winbox';
import { SimpleComponentComponent } from './simple-component/simple-component.component';
import { SidebarMenuModel } from '@rbtechdev/angular-sidebar';
import { ModalYesNoComponent } from './modal-yes-no/modal-yes-no.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    status: '',
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
        badge: {
          visible: true,
          class: 'badge bg-secondary',
          text: '4',
        },
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
        badge: {
          visible: true,
          class: 'badge bg-secondary',
          text: '4',
        },
        subMenus: [
          {
            title: 'SUBMENU 1',
            visible: true,
            href: '/g',
            badge: {
              visible: true,
              class: 'badge bg-secondary',
              text: 'New',
            },
          },
        ],
      },
    ],
    footerMenus: [
      {
        type: 'simple',
        icon: this.faIcon,
      },
      {
        type: 'dropdown',
        icon: this.faIcon,
        dropdownHeaderTitle: 'Hello',
        href: '#',
        dropdownItems: [
          {
            text: 'HELLO',
            icon: this.faIcon,
            subtitle: 'HELLO S',
          },
        ],
      },
    ],
  };

  constructor(
    private winboxService: WinboxService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    const winboxInstance =
      this.winboxService.openWinBox<SimpleComponentComponent>(
        {
          title: 'Test',
          height: '90%',
          width: '40%',
          x: 'center',
          y: 'center',
          index: 1057,
          onclose: (): boolean => {
            const modal = this.modalService.open(ModalYesNoComponent);
            modal.componentInstance.title = 'Titolo';
            modal.componentInstance.message = 'Vuoi chiudere winbox?';
            winboxInstance.winBox.minimize(true);

            modal.result
              .then(() => {
                winboxInstance.winBox.close(true);
              })
              .catch(() => winboxInstance.winBox.maximize(false));
            return false;
          },
        },
        SimpleComponentComponent
      );
    this.winboxService.showLastWinbox();
  }
}
