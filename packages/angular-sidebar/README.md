# angular-sidebar

A sidebar component with dropdown menu created with angular 15 and bootstrap 5.

## Installation

```bash
nmp install @rbtechdev\angular-sidebar
```

## Configuration

Prior to use, it is necessary to add Bootstrap CSS to your application (see [Bootstrap instructions](https://getbootstrap.com/docs/5.2/getting-started/download/))

In case you're using CSS, you just need to add Bootstrap styles to your angular.json configuration:

```
  "yourApp": {
    "architect": {
      "build": {
        "options": {
          "styles": [
            "node_modules/bootstrap/dist/css/bootstrap.min.css"
          ]
        }
      }
    }
  }
```

In case you're using SCSS, please add this to your styles.scss directly:

```scss
@import 'bootstrap/scss/bootstrap';
/*
or import only the bootstrap scss files that your application actually needs,
as described in the Bootstrap customization guide:
https://getbootstrap.com/docs/5.2/customize/sass/#importing
*/
```

## Usage

```html
<rbtech-sidebar
  [menu]="menu"
  [theme]="theme"
  (navigationEmitted)="navigationEmitted($event)"
></rbtech-sidebar>
```

## Inputs and Outputs

| Input/Output                | Data Type             | Description                                                                                  |
| --------------------------- | --------------------- | -------------------------------------------------------------------------------------------- |
| @Input() menu?              | SidebarMenuModel      | The menu items to be displayed in the sidebar.                                               |
| @Input() theme              | SidebarMenuThemeModel | The theme to be applied to the sidebar.                                                      |
| @Output() navigationEmitted | EventEmitter<string>  | An event emitter that emits a string value when a navigation item is clicked in the sidebar. |

## Definition of Interfaces

Structure of SidebarMenuModel:

| Interface/Property           | Description                                                                                               |
| ---------------------------- | --------------------------------------------------------------------------------------------------------- |
| **`SidebarMenuModel`**       | Interface defining properties of the sidebar menu                                                         |
| - `sidebarTitle`             | String representing the title of the sidebar menu                                                         |
| - `sidebarTitleHref`         | String representing the URL of the sidebar menu title link                                                |
| - `sidebarUsrPicSrc`         | (optional) String representing the source of the user profile image                                       |
| - `username`                 | (optional) String representing the username                                                               |
| - `subtitle`                 | (optional) String representing the subtitle of the sidebar menu                                           |
| - `status`                   | (optional) String representing the user's status                                                          |
| - `isSearchVisible`          | Boolean indicating whether the search bar is visible or not                                               |
| - `placeholderSearch`        | (optional) String representing example text in the search bar                                             |
| - `contentMenus`             | Array of `SidebarContentMenuModel` objects representing main menu items                                   |
| - `footerMenus`              | Array of `SidebarFooterMenuModel` objects representing footer menu items                                  |
| `SidebarContentMenuModel`    | Interface defining properties of main menu items                                                          |
| - `title`                    | String representing the title of the menu item                                                            |
| - `type`                     | String indicating the type of the menu item. Possible values are `'header'`, `'dropdown'`, and `'simple'` |
| - `visible`                  | Boolean indicating whether the menu item is visible or not                                                |
| - `icon`                     | (optional) IconProp (see FontAwesome) representing the icon of the menu item                              |
| - `href`                     | (optional) String representing the URL of the menu item                                                   |
| - `active`                   | (optional) Boolean indicating whether the menu item is active or not                                      |
| - `badge`                    | (optional) `SidebarMenuBadge` object representing the badge of the menu item                              |
| - `subMenus`                 | (optional) Array of `SidebarMenuSubmenu` objects representing submenu items                               |
| **`SidebarMenuBadge`**       | Interface defining properties of menu badges                                                              |
| - `text`                     | String representing the text of the badge                                                                 |
| - `class`                    | String representing the class of the badge                                                                |
| - `visible`                  | Boolean indicating whether the badge is visible or not                                                    |
| **`SidebarMenuSubmenu`**     | Interface defining properties of submenu items                                                            |
| - `title`                    | String representing the title of the submenu item                                                         |
| - `visible`                  | Boolean indicating whether the submenu item is visible or not                                             |
| - `href`                     | (optional) String representing the URL of the submenu item                                                |
| **`SidebarFooterMenuModel`** | Interface defining properties of footer menu items                                                        |
| - `type`                     | String indicating the type of the menu item. Possible values are `'dropdown'` and `'simple'`              |
| - `href`                     | (optional) String representing the URL of the menu item                                                   |
| - `icon`                     | (optional) IconProp (see FontAwesome) representing the icon of the menu item                              |
| - `badge`                    | (optional) `SidebarMenuBadge` object representing the badge of the menu item                              |
| - `dropdownHeaderTitle`      | (optional) String representing the title of the dropdown header                                           |
| - `dropdownItems`            | (optional) Array of `DropdownItem` objects representing dropdown items                                    |
| **`DropdownItem`**           | Interface defining properties of dropdown items                                                           |
| - `icon`                     | IconProp (see FontAwesome) representing the icon of the dropdown item                                     |
| - `text`                     | String representing the text of the dropdown item                                                         |
| - `subtitle`                 | String representing the subtitle of the dropdown item                                                     |
| - `href`                     | (optional) String representing the URL of the dropdown item                                               |

Description of SidebarMenuItemModel:

| Property Name          | Description                                                              |
| ---------------------- | ------------------------------------------------------------------------ |
| `bgSidebarWrapper`     | The background color of the sidebar wrapper.                             |
| `borderColor`          | The color of the border of the sidebar.                                  |
| `footerTopBorderColor` | The color of the border at the top of the footer.                        |
| `color`                | The font color used in the sidebar.                                      |
| `headerMenuColor`      | The font color used in the header menu.                                  |
| `hoverColor`           | The color that the background changes to when hovering over a menu item. |
| `shadowColor`          | The color of the shadow that appears around the sidebar.                 |
| `bgScrollbar`          | The background color of the sidebar scrollbar.                           |

## Resources

- [Bootstrap](https://getbootstrap.com/)
- [ng-bootstrap](https://ng-bootstrap.github.io/#/home)
- [Font awsome](http://fontawesome.io/)
- [Angular Perfect Scrollbar](https://github.com/zefoy/ngx-perfect-scrollbar)
- [Angular Pro Sidebar](https://github.com/azouaoui-med/angular-pro-sidebar)
