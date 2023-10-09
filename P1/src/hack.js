const $targetEl = document.getElementById('drawer-disabled-backdrop');

document.getElementById("showDrawer").onclick = function toggleDrawer() {
    const $targetEl = document.getElementById('drawer-disabled-backdrop');

    // options with default values
    const options = {
        placement: 'left',
        backdrop: false,
        bodyScrolling: true,
        edge: false,
        onHide: () => {
            console.log('drawer is hidden');
            $targetEl.className = $targetEl.className.replace("visible", "hidden");
        },
        onShow: () => {
            console.log('drawer is visible');
            $targetEl.className = $targetEl.className.replace("hidden", "visible");
        },
    }

    const drawer = new Drawer($targetEl, options);
    if ($targetEl.className.includes("hidden")) {
        drawer.show();
    } else {
        drawer.hide();
    }
}
