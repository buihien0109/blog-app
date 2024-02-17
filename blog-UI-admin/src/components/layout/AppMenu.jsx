import { Menu } from 'antd';
import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import menu from "../../data/routes";

const { SubMenu, Item } = Menu;
function AppMenu() {
    // Lấy pathname từ useLocation
    const { pathname } = useLocation();

    // Tìm kiếm menu con của menu cha có id trùng với pathname => id của menu con đó
    const defaultSelectedKeys = menu.map((item) => {
        return item.subs.find((sub) => sub.url === pathname) ? item.subs.find((sub) => sub.url === pathname).id : null;
    }).find((item) => item !== null);

    // Tìm kiếm menu cha của menu con có id trùng với defaultSelectedKeys hoặc menu cha có url là prefix của pathname => return menu cha đó
    const defaultOpenKeys = menu.find((item) => item.subs.find((sub) => sub.id === defaultSelectedKeys) || pathname.includes(item.url));

    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[defaultSelectedKeys ? defaultSelectedKeys.toString() : undefined]}
            defaultOpenKeys={[defaultOpenKeys ? defaultOpenKeys.id.toString() : undefined]}
        >
            {
                menu.map((item) => {
                    return (
                        <SubMenu key={item.id} icon={<item.icon />} title={item.label}>
                            {
                                item.subs.map((sub) => {
                                    return (
                                        <Item key={sub.id}>
                                            <RouterLink to={sub.url}>{sub.label}</RouterLink>
                                        </Item>
                                    )
                                })
                            }
                        </SubMenu>
                    )
                })
            }
        </Menu>
    )
}

export default AppMenu