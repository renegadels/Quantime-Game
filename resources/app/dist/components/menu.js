"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMenu = void 0;
const electron_1 = require("electron");
function createMenu({ nativefierVersion, appQuit, zoomIn, zoomOut, zoomReset, zoomBuildTimeValue, goBack, goForward, getCurrentUrl, clearAppData, disableDevTools, whiteLabelEnabled, }) {
    const zoomResetLabel = zoomBuildTimeValue === 1.0
        ? 'Reset Zoom'
        : `Reset Zoom (to ${zoomBuildTimeValue * 100}%, set at build time)`;
    const editMenu = {
        label: '&Edit',
        submenu: [
            {
                label: 'Undo',
                accelerator: 'CmdOrCtrl+Z',
                role: 'undo',
            },
            {
                label: 'Redo',
                accelerator: 'Shift+CmdOrCtrl+Z',
                role: 'redo',
            },
            {
                type: 'separator',
            },
            {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                role: 'cut',
            },
            {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy',
            },
            {
                label: 'Copy Current URL',
                accelerator: 'CmdOrCtrl+L',
                click: () => {
                    const currentURL = getCurrentUrl();
                    electron_1.clipboard.writeText(currentURL);
                },
            },
            {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                role: 'paste',
            },
            {
                label: 'Paste and Match Style',
                accelerator: 'CmdOrCtrl+Shift+V',
                role: 'pasteAndMatchStyle',
            },
            {
                label: 'Select All',
                accelerator: 'CmdOrCtrl+A',
                role: 'selectAll',
            },
            {
                label: 'Clear App Data',
                click: clearAppData,
            },
        ],
    };
    const viewMenu = {
        label: '&View',
        submenu: [
            {
                label: 'Back',
                accelerator: (() => {
                    const backKbShortcut = process.platform === 'darwin' ? 'Cmd+Left' : 'Alt+Left';
                    return backKbShortcut;
                })(),
                click: goBack,
            },
            {
                label: 'BackAdditionalShortcut',
                visible: false,
                acceleratorWorksWhenHidden: true,
                accelerator: 'CmdOrCtrl+[',
                click: goBack,
            },
            {
                label: 'Forward',
                accelerator: (() => {
                    const forwardKbShortcut = process.platform === 'darwin' ? 'Cmd+Right' : 'Alt+Right';
                    return forwardKbShortcut;
                })(),
                click: goForward,
            },
            {
                label: 'ForwardAdditionalShortcut',
                visible: false,
                acceleratorWorksWhenHidden: true,
                accelerator: 'CmdOrCtrl+]',
                click: goForward,
            },
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click: (item, focusedWindow) => {
                    if (focusedWindow) {
                        focusedWindow.reload();
                    }
                },
            },
            {
                type: 'separator',
            },
            {
                label: 'Toggle Full Screen',
                accelerator: (() => {
                    if (process.platform === 'darwin') {
                        return 'Ctrl+Cmd+F';
                    }
                    return 'F11';
                })(),
                click: (item, focusedWindow) => {
                    if (focusedWindow) {
                        focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                    }
                },
            },
            {
                label: 'Zoom In',
                accelerator: 'CmdOrCtrl+=',
                click: zoomIn,
            },
            {
                label: 'ZoomInAdditionalShortcut',
                visible: false,
                acceleratorWorksWhenHidden: true,
                accelerator: 'CmdOrCtrl+numadd',
                click: zoomIn,
            },
            {
                label: 'Zoom Out',
                accelerator: 'CmdOrCtrl+-',
                click: zoomOut,
            },
            {
                label: 'ZoomOutAdditionalShortcut',
                visible: false,
                acceleratorWorksWhenHidden: true,
                accelerator: 'CmdOrCtrl+numsub',
                click: zoomOut,
            },
            {
                label: zoomResetLabel,
                accelerator: 'CmdOrCtrl+0',
                click: zoomReset,
            },
            {
                label: 'ZoomResetAdditionalShortcut',
                visible: false,
                acceleratorWorksWhenHidden: true,
                accelerator: 'CmdOrCtrl+num0',
                click: zoomReset,
            },
        ],
    };
    if (!disableDevTools) {
        viewMenu.submenu.push({
            type: 'separator',
        }, {
            label: 'Toggle Developer Tools',
            accelerator: (() => {
                if (process.platform === 'darwin') {
                    return 'Alt+Cmd+I';
                }
                return 'Ctrl+Shift+I';
            })(),
            click: (item, focusedWindow) => {
                if (focusedWindow) {
                    focusedWindow.webContents.toggleDevTools();
                }
            },
        });
    }
    const windowMenu = {
        label: '&Window',
        role: 'window',
        submenu: [
            {
                label: 'Minimize',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize',
            },
            {
                label: 'Close',
                accelerator: 'CmdOrCtrl+W',
                role: 'close',
            },
        ],
    };
    const helpMenu = {
        label: '&Help',
        role: 'help',
        submenu: [],
    };
    if (!whiteLabelEnabled) {
        helpMenu.submenu = [
            {
                label: `Built by appmaker.xyz`,
                click: () => {
                    electron_1.shell.openExternal('https://appmaker.xyz');
                },
            },
        ];
    }
    let menuTemplate;
    if (process.platform === 'darwin') {
        const electronMenu = {
            label: 'E&lectron',
            submenu: [
                {
                    label: 'Services',
                    role: 'services',
                    submenu: [],
                },
                {
                    type: 'separator',
                },
                {
                    label: 'Hide App',
                    accelerator: 'Cmd+H',
                    role: 'hide',
                },
                {
                    label: 'Hide Others',
                    accelerator: 'Cmd+Shift+H',
                    role: 'hideOthers',
                },
                {
                    label: 'Show All',
                    role: 'unhide',
                },
                {
                    type: 'separator',
                },
                {
                    label: 'Quit',
                    accelerator: 'Cmd+Q',
                    click: appQuit,
                },
            ],
        };
        windowMenu.submenu.push({
            type: 'separator',
        }, {
            label: 'Bring All to Front',
            role: 'front',
        });
        menuTemplate = [electronMenu, editMenu, viewMenu, windowMenu, helpMenu];
    }
    else {
        menuTemplate = [editMenu, viewMenu, windowMenu, helpMenu];
    }
    const menu = electron_1.Menu.buildFromTemplate(menuTemplate);
    electron_1.Menu.setApplicationMenu(menu);
}
exports.createMenu = createMenu;
//# sourceMappingURL=menu.js.map