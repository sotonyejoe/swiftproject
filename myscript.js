
      var burgerBtn = document.getElementById("burger");
      var sideNav = document.getElementById("nav");

      sideNav.style.right = "-250px";
      menuBtn.onclick = function() {
        if (sideNav.style.right == "-250px") {
          sideNav.style.right = "0";
        } else {
          sideNav.style.right = "-250px";
        }
      };
   