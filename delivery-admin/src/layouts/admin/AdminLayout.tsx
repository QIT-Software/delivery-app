import React from 'react';
import {createStyles, Drawer, makeStyles, MenuItem, MenuList} from '@material-ui/core';
import styles from './AdminLayout.module.scss';
import {Link, useLocation} from 'react-router-dom';
import {
  CourierIcon,
  CourierIconActive,
  CustomerIcon,
  CustomerIconActive,
  DishesIcon,
  DishesIconActive,
  LogoutIcon,
  OrderIcon,
  OrderIconActive,
  PaymentsIcon,
  PaymentsIconActive,
  RestaurantIcon,
  RestaurantIconActive,
  SettingsIcon,
  SettingsIconActive,
  SidebarLogo,
  CuisinesIcon,
  CuisinesIconActive,
  MenuIcon,
  MenuIconActive,
  SetsIcon,
  SetsIconActive,
  SetStatuses,
  SetStatusesActive,
} from '../../assets';
import classNames from 'classnames';
import {useTranslation} from 'react-i18next';
import CustomSnackBar from '../../components/SnackBar/SnackBar';

const drawerWidth = 190;

interface MenuLink {
  label: string;
  path: string;
  icon: string;
  activeIcon?: string; // TODO: WAIT for all icons
}
const useStyles = makeStyles(() =>
  createStyles({
    drawerPaper: {
      width: drawerWidth,
      position: 'relative',
      background: 'linear-gradient(10.35deg, #FFBC83 0%, #FF5273 100%)',
      border: 'none',
    },
    selected: {
      backgroundColor: '#ffffff !important',
      '&:hover': {
        backgroundColor: '#ffffff !important',
      },
    },
  }),
);

const AdminLayout: React.FC = ({children}) => {
  const {t} = useTranslation('adminLayout');
  const classes = useStyles();
  const {pathname} = useLocation();

  const links: MenuLink[] = [
    {
      label: t('orders'),
      path: 'orders',
      icon: OrderIcon,
      activeIcon: OrderIconActive,
    },
    {
      label: t('customers'),
      path: 'customers',
      icon: CustomerIcon,
      activeIcon: CustomerIconActive,
    },
    {
      label: t('couriers'),
      path: 'couriers',
      icon: CourierIcon,
      activeIcon: CourierIconActive,
    },
    {
      label: t('restaurants'),
      path: 'restaurants',
      icon: RestaurantIcon,
      activeIcon: RestaurantIconActive,
    },
    {
      label: t('payments'),
      path: 'payments/couriers',
      icon: PaymentsIcon,
      activeIcon: PaymentsIconActive,
    },
    {
      label: t('cuisines'),
      path: 'cuisines',
      icon: CuisinesIcon,
      activeIcon: CuisinesIconActive,
    },
    {
      label: t('sets'),
      path: 'sets',
      icon: SetsIcon,
      activeIcon: SetsIconActive,
    },
    {
      label: t('statuses'),
      path: 'statuses',
      icon: SetStatuses,
      activeIcon: SetStatusesActive,
    },
    {
      label: t('dishes'),
      path: 'dishes',
      icon: DishesIcon,
      activeIcon: DishesIconActive,
    },
    {
      label: t('weekMenu'),
      path: 'weekMenu',
      icon: MenuIcon,
      activeIcon: MenuIconActive,
    },
    {
      label: t('settings'),
      path: 'settings',
      icon: SettingsIcon,
      activeIcon: SettingsIconActive,
    },
    {label: t('logout'), path: 'logout', icon: LogoutIcon},
  ];

  const renderMenuLink = (link: MenuLink, path: string) => {
    const isSelected = `/${link.path}` === path;
    return (
      <MenuItem
        className={styles.adminContainer__aside__drawer__list__item}
        classes={{selected: classes.selected}}
        selected={isSelected}
        component={Link}
        to={`/${link.path}`}
        key={Math.random()}
      >
        <img
          src={isSelected && link.activeIcon ? link.activeIcon : link.icon}
          alt={link.path}
          className={styles.menuItemIcon}
        />
        <span
          className={classNames(styles.adminContainer__aside__drawer__list__item__text, {
            [styles.activeLink]: isSelected,
          })}
        >
          {link.label}
        </span>
      </MenuItem>
    );
  };

  return (
    <div className={styles.adminContainer}>
      <CustomSnackBar />
      <aside className={styles.adminContainer__aside}>
        <Drawer
          className={styles.adminContainer__aside__drawer}
          classes={{paper: classes.drawerPaper}}
          variant="permanent"
        >
          <div className={styles.adminContainer__aside__drawer__logo}>
            <img src={SidebarLogo} alt="logo" />
          </div>
          <MenuList className={styles.adminContainer__aside__drawer__list}>
            {links.map((link) => renderMenuLink(link, pathname))}
          </MenuList>
        </Drawer>
      </aside>
      {children}
    </div>
  );
};

export default AdminLayout;
