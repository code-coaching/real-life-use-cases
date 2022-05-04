// IIFE (Immediately Invoked Function Expression) - to allow the use of async/await on the top level
// IIFE ( Immediately Invoked Function Expression ) - om async/await te kunnen gebruiken in 'de top level'
(async () => {
  let routes = [];
  const fetchRoutes = async () => {
    routes = await fetch(
      "https://opendata.visitflanders.org/accessibility/routes/info_about_routes_v2.json"
    ).then((res) => res.json());
  };
  await fetchRoutes();

  // From this point on, routes is a populated array
  // Vanaf hier is routes een array met data
  const routesEl = document.querySelector("#routes");

  routes.forEach((route) => {
    const template = document.querySelector("#route");
    const newRouteElement = template.content.cloneNode(true);

    const name = newRouteElement.querySelector(".name");
    name.innerText = route.name;

    const showIcon = [
      "HIKING_LOOP",
      "HIKING_THEMATIC_ROUTE",
      "CYCLING_LOOP",
    ].includes(route.sub_type);
    if (showIcon) {
      const subTypeImg = document.createElement("img");
      subTypeImg.classList.add("icon");
      switch (route.sub_type) {
        case "HIKING_THEMATIC_ROUTE":
        case "HIKING_LOOP":
          subTypeImg.src = "../img/hiking.png";
          break;
        case "CYCLING_LOOP":
          subTypeImg.src = "../img/cycling.png";
          break;
      }

      name.appendChild(subTypeImg);
    }

    const description = newRouteElement
      .querySelector(".description-paragraph")
      .querySelector("span");
    description.innerHTML = route.accessibility_description;

    const location = newRouteElement
      .querySelector(".location-paragraph")
      .querySelector("span");
    location.innerText = route.city_name;

    if (route.website) {
      const website = newRouteElement
        .querySelector(".website-paragraph")
        .querySelector("a");
      website.href = route.website;
      website.innerText = route.website;
    } else {
      const website = newRouteElement.querySelector(".website-paragraph");
      website.innerHTML = "";
    }

    if (route.email) {
      const email = newRouteElement
        .querySelector(".email-paragraph")
        .querySelector("a");
      email.href = `mailto:${route.email}`;
      email.innerText = route.email;
    } else {
      const email = newRouteElement.querySelector(".email-paragraph");
      email.innerHTML = "";
    }

    routesEl.appendChild(newRouteElement);
  });
})();
