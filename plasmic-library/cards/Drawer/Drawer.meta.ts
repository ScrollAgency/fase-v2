const DrawerMeta = {
    section: "Popup",
    displayName: "Drawer mobile",
    description: "Drawer rétractable",
    thumbnailUrl: "",
    type: "component",
    name: "DragCloseDrawer",
    props: {
        open: {
            type: "string"
        },
        children: 'slot',
        barColor: 'color',
        backgroundColor: 'color'
    },
    importPath: "./components/cards/Drawer/Drawer",
}
export default DrawerMeta;