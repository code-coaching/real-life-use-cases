// IIFE (Immediately Invoked Function Expression) - to allow the use of async/await on the top level
// IIFE (Immediately Invoked Function Expression ) - om async/await te kunnen gebruiken in 'de top level'
(async () => {
  let routes = [];
  const fetchRoutes = async () => {
    routes = await fetch(
      "https://opendata.visitflanders.org/accessibility/routes/info_about_routes_v2.json"
    ).then((response) => response.json());
  };
  await fetchRoutes();

  // From this point on, routes is a populated array
  // Vanaf hier is routes een array met data

  const handleAnchor = (clone, route, selector, property) => {
    const element = clone.querySelector(selector);
    if (route[property]) {
      const anchor = element.querySelector("a");
      anchor.innerText = route[property];
      if (property === "email") {
        anchor.href = `mailto:${route[property]}`;
      } else {
        anchor.href = route[property];
      }
    } else {
      element.remove();
    }
  };

  const handleSubType = (nameElement, subType) => {
    const matchingSubType = [
      "CYCLING_LOOP",
      "HIKING_LOOP",
      "HIKING_THEMATIC_ROUTE",
    ].includes(subType);

    if (matchingSubType) {
      const imgElement = document.createElement("img");
      imgElement.classList.add("icon");

      switch (subType) {
        case "HIKING_LOOP":
        case "HIKING_THEMATIC_ROUTE":
          imgElement.src = "../img/hiking.png";
          break;
        case "CYCLING_LOOP":
          imgElement.src = "../img/cycling.png";
          break;
      }

      nameElement.appendChild(imgElement);
    }
  }

  const routesElement = document.querySelector("#routes");

  routes.forEach((route) => {
    const routeTemplateElement = document.querySelector("template");
    const clone = routeTemplateElement.content.cloneNode(true);

    const nameElement = clone.querySelector(".name");
    nameElement.innerText = route.name;

    handleSubType(nameElement, route.sub_type);

    clone.querySelector(".description span").innerText =
      route.accessibility_description;
    clone.querySelector(".location span").innerText = route.city_name;

    handleAnchor(clone, route, ".website", "website");
    handleAnchor(clone, route, ".email", "email");

    routesElement.appendChild(clone);
  });
})();
