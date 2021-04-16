import { Permission } from '../scheme/api/auth'

interface Config {
    file?: string
    path?: string
    target?: Permission[]
    icon: string
    name: string
    showOnDrawer?: boolean
    child?: Config[]
}

const Permission_all = [
    Permission.admin,
    Permission.teacher,
    Permission.student,
]

export default [
    {
        file: 'student/main.tsx',
        path: '/',
        target: [Permission.student],
        icon: 'home',
        name: '메인',
        showOnDrawer: true,
    },
    {
        file: 'teacher/main.tsx',
        path: '/',
        target: [Permission.teacher],
        icon: 'home',
        name: '메인',
        showOnDrawer: true,
    },
    {
        file: 'admin/main.tsx',
        path: '/',
        target: [Permission.admin],
        icon: 'home',
        name: '메인',
        showOnDrawer: true,
    },
    {
        file: 'common/share.tsx',
        path: '/share',
        target: Permission_all,
        icon: 'share',
        name: '빠른 공유',
        showOnDrawer: true,
    },
    {
        file: 'common/mail.tsx',
        path: '/mail',
        target: Permission_all,
        icon: 'mail',
        name: '메일',
        showOnDrawer: true,
    },
    {
        target: [Permission.admin],
        icon: 'settings',
        name: '사이트 관리',
        child: [
            {
                file: 'admin/update.tsx',
                path: '/update',
                icon: 'system_update',
                name: '업데이트',
            },
            {
                file: 'admin/external.tsx',
                path: '/external',
                icon: 'cloud',
                name: '서비스 관리',
            },
            {
                file: 'admin/server.tsx',
                path: '/server',
                icon: 'dns',
                name: '인스턴스 관리',
            },
        ],
    },
    {
        target: [Permission.teacher],
        icon: 'auto_fix_normal',
        name: '학생 지도',
        child: [
            {
                file: 'teacher/myeonbul.tsx',
                path: '/myeonbul',
                icon: 'pan_tool',
                name: '면불',
            },
            {
                file: 'teacher/penalty.tsx',
                path: '/penalty',
                icon: 'assignment_late',
                name: '상벌점',
            },
        ],
    },
    {
        target: [Permission.admin],
        icon: 'account_circle',
        name: '사용자 관리',
        child: [
            {
                file: 'admin/createcode.tsx',
                path: '/user/code',
                icon: 'system_update',
                name: '가입 코드 발급',
            },
            {
                file: 'admin/api.tsx',
                path: '/createapi',
                icon: 'api',
                name: 'API 계정 관리',
            },
            {
                file: 'admin/assign.tsx',
                path: '/assign',
                icon: 'school',
                name: '반 배정',
            },
        ],
    },
    {
        target: [Permission.student],
        file: 'student/music.tsx',
        path: '/music',
        icon: 'music_note',
        name: '기상곡',
    },
    {
        target: [Permission.student],
        icon: 'playlist_add_check',
        name: '신청',
        child: [
            {
                file: 'student/myeonbul.tsx',
                path: '/myeonbul',
                icon: 'pan_tool',
                name: '면불',
            },
            {
                file: 'student/music.tsx',
                path: '/music',
                icon: 'music_note',
                name: '기상곡',
            },
        ],
    },
    {
        target: [Permission.student],
        icon: 'night_shelter',
        name: '생활',
        child: [
            {
                file: 'student/penalty.tsx',
                path: '/penalty',
                icon: 'assignment_late',
                name: '상벌점',
            },
        ],
    },
    {
        target: [Permission.teacher],
        file: 'teacher/print.tsx',
        path: '/print',
        icon: 'music_note',
        name: '프린터 명부',
    },
    {
        target: Permission_all,
        file: 'common/meal.tsx',
        path: '/meal',
        icon: 'fastfood',
        name: '급식',
    },
    {
        target: Permission_all,
        icon: 'folder',
        name: '프로그램',
        child: [
            {
                file: 'common/network.tsx',
                path: '/program/network',
                icon: 'wysiwyg',
                name: '인터넷 연결 도구',
            },
            {
                file: 'student/program/ip',
                path: '/program/ip',
                icon: 'wysiwyg',
                name: 'IP',
            },
            {
                file: 'common/404.tsx',
                path: '/program/client',
                icon: 'wysiwyg',
                name: 'IASA CLIENT',
            },
        ],
    },
] as Array<Config>
