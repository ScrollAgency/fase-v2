const DrawerMeta = {
    section: "Popup",
    displayName: "Drawer mobile",
    description: "Drawer rétractable",
    thumbnailUrl: "",
    type: "component",
    name: "DragCloseDrawer",
    props: {
        open: {
            type: "boolean",
            description: "si le drawer est ouvert ou fermé"
        },
        setOpen: {
            type: "eventHandler",
            displayName: "On close drawer",
            description: "changer le state qui définit si le drawer est ouvert ou fermé"
        },
        children: 'slot',
        barColor: 'color',
        backgroundColor: 'color'
    },
    importPath: "./components/cards/Drawer/Drawer",
}
export default DrawerMeta;