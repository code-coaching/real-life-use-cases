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
})();
