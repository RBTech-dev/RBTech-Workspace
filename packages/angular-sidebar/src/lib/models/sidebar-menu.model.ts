import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type SidebarMenuType = 'header' | 'dropdown' | 'simple';
export type SidebarMenuFooterType = Omit<SidebarMenuType, 'header'>;

export interface SidebarMenuBadge {
  text: string;
  class: string;
  visible: boolean;
}

export interface SidebarMenuSubmenu {
  title: string;
  visible: boolean;
  href?: string;
  badge?: SidebarMenuBadge;
}

export interface DropdownItem {
  icon: IconProp;
  text: string;
  subtitle: string;
  href?: string;
}

export interface SidebarFooterMenuModel {
  type: SidebarMenuFooterType;
  href?: string;
  icon?: IconProp;
  badge?: SidebarMenuBadge;
  dropdownHeaderTitle?: string;
  dropdownItems: DropdownItem[];
}

export interface SidebarContentMenuModel {
  title: string;
  type: SidebarMenuType;
  visible: boolean;
  icon?: IconProp;
  href?: string;
  active?: boolean;
  badge?: SidebarMenuBadge;
  subMenus?: SidebarMenuSubmenu[];
}

export interface SidebarMenuModel {
  sidebarTitle: string;
  sidebarTitleHref: string;
  sidebarUsrPicSrc?: string;
  username?: string;
  subtitle?: string;
  status?: string;
  isSearchVisible: boolean;
  placeholderSearch?: string;
  contentMenus: SidebarContentMenuModel[];
  footerMenus: SidebarFooterMenuModel[];
}
