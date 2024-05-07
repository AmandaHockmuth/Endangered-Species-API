fetch(
  `https://ecos.fws.gov/ecp/pullreports/catalog/species/report/species/export?format=json&distinct=true&columns=%2Fspecies%40cn%2Cstatus%2Cmore_info_url&sort=%2Fspecies%40cn%20asc&filter=%2Fspecies%2Fcurrent_range_county%40name%20%3D%20'Rockbridge'`
)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    console.log(response.json());
  })
  .catch((err) => {
    console.error(err);
  });
