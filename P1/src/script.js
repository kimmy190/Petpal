

function toggleDropdown(dropdownId) {
    var dropdownMenu = document.getElementById(dropdownId);
    if (dropdownMenu) {
        dropdownMenu.classList.toggle("hidden");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // 
    var dropdownButtonS = document.getElementById("dropdown-signup");
    if (dropdownButtonS) {
        dropdownButtonS.addEventListener("click", function() {
            toggleDropdown("dropdown-signup-menu");
        });
    }

    var dropdownButtonSearch = document.getElementById("dropdown-search");
    if (dropdownButtonSearch) {
        dropdownButtonSearch.addEventListener("click", function() {
            toggleDropdown("dropdown-menu-search");
        });
    }

    var dropdownButtonBell = document.getElementById("dropdown-bell");
    if (dropdownButtonBell) {
        dropdownButtonBell.addEventListener("click", function() {
            toggleDropdown("dropdown-bell-menu");
        });
    }

    var dropdownButtonP = document.getElementById("dropdown-profile");
    if (dropdownButtonP) {
        dropdownButtonP.addEventListener("click", function() {
            toggleDropdown("dropdwon-profile-menu");
        });
    }
});

