import {
    FileTextOutlined,
    PieChartOutlined,
    ProjectOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";

const menu = [
    {
        id: 1,
        label: "Dashboard",
        icon: PieChartOutlined,
        url: "/admin/dashboard",
        subs: [
            {
                id: 11,
                label: "Dashboard",
                url: "/admin/dashboard",
            },
        ],
    },
    {
        id: 2,
        label: "Quản lý bài viết",
        icon: FileTextOutlined,
        url: "/admin/blogs",
        subs: [
            {
                id: 21,
                label: "Tất cả bài viết",
                url: "/admin/blogs",
            },
            {
                id: 22,
                label: "Bài viết của tôi",
                url: "/admin/blogs/own-blogs",
            },
            {
                id: 23,
                label: "Tạo bài viết",
                url: "/admin/blogs/create",
            },
        ],
    },
    {
        id: 3,
        label: "Quản lý user",
        icon: UserOutlined,
        url: "/admin/users",
        subs: [
            {
                id: 31,
                label: "Danh sách user",
                url: "/admin/users",
            },
            {
                id: 32,
                label: "Tạo user",
                url: "/admin/users/create",
            },
        ],
    },
    {
        id: 4,
        label: "Quản lý danh mục",
        icon: TeamOutlined,
        url: "/admin/categories",
        subs: [
            {
                id: 41,
                label: "Danh sách danh mục",
                url: "/admin/categories",
            },
        ],
    },
    {
        id: 5,
        label: "Quản lý project",
        icon: ProjectOutlined,
        url: "/admin/projects",
        subs: [
            {
                id: 51,
                label: "Danh sách project",
                url: "/admin/projects",
            },
            {
                id: 52,
                label: "Tạo project",
                url: "/admin/projects/create",
            },
        ],
    },
];

export default menu;
