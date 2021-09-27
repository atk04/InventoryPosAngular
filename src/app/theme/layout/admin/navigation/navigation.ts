import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-sidebar',
      },
      {
        id: 'company-page',
        title: 'Company',
        type: 'item',
        url: '/company-page',
        classes: 'nav-item',
        icon: 'feather icon-home',
      },
      {
        id: 'category-page',
        title: 'Category',
        type: 'item',
        url: '/category-page',
        classes: 'nav-item',
        icon: 'feather icon-list',
      },
      {
        id: 'product',
        title: 'Product',
        type: 'collapse',
        icon: 'feather icon-package',
        children: [
          {
            id: 'add-product-page',
            title: 'Add Product',
            type: 'item',
            url: '/add-product-page',
            external: false,
          },
          {
            id: 'product-list-page',
            title: 'Product List',
            type: 'item',
            url: '/product-list-page',
            external: false,
          },
        ],
      },
      {
        id: 'order',
        title: 'Order',
        type: 'collapse',
        icon: 'feather icon-shopping-cart',
        children: [
          {
            id: 'create-order-page',
            title: 'Create Order',
            type: 'item',
            url: '/create-order-page',
            external: false,
          },
          {
            id: 'create-order-list-page',
            title: 'Order List',
            type: 'item',
            url: '/order-list-page',
            external: false,
          }
        ],
      },

    ],
  },
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
