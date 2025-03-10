"use server";

const CATEGORIES = ["catering.restaurant", "catering.fast_food", "catering.pub", "catering.bar"];

export const getPlaces = async (latitude: number, longitude: number) => {

  let data = await fetch(`https://api.geoapify.com/v2/places?categories=${CATEGORIES.join(",")}&filter=circle:${longitude},${latitude},10000&bias=proximity:${longitude},${latitude}&lang=en&limit=50&apiKey=${process.env.GEOAPI_KEY}`)
    .then(res => res.json())
    .then(res => res.features)
    .catch(_ => null);

  // let data = [
  //   {
  //     "type": "Feature",
  //     "properties": {
  //       "name": "Wow Bao",
  //       "country": "United States",
  //       "country_code": "us",
  //       "state": "Ohio",
  //       "county": "Portage County",
  //       "city": "Kent",
  //       "postcode": "44243",
  //       "district": "Front Campus",
  //       "street": "Lester A. Lefton Esplanade",
  //       "lon": -81.34357883014926,
  //       "lat": 41.147643349999996,
  //       "state_code": "OH",
  //       "formatted": "Wow Bao, Lester A. Lefton Esplanade, Kent, OH 44243, United States of America",
  //       "address_line1": "Wow Bao",
  //       "address_line2": "Lester A. Lefton Esplanade, Kent, OH 44243, United States of America",
  //       "categories": [
  //         "catering",
  //         "catering.fast_food",
  //         "wheelchair",
  //         "wheelchair.yes"
  //       ],
  //       "details": [
  //         "details",
  //         "details.catering",
  //         "details.facilities"
  //       ],
  //       "datasource": {
  //         "sourcename": "openstreetmap",
  //         "attribution": "© OpenStreetMap contributors",
  //         "license": "Open Database Licence",
  //         "url": "https://www.openstreetmap.org/copyright",
  //         "raw": {
  //           "area": "yes",
  //           "name": "Wow Bao",
  //           "level": 0,
  //           "indoor": "yes",
  //           "osm_id": 421060203,
  //           "amenity": "fast_food",
  //           "cuisine": "asian;chinese",
  //           "smoking": "no",
  //           "website": "https://www.kent.edu/dining/hub",
  //           "delivery": "no",
  //           "osm_type": "w",
  //           "takeaway": "yes",
  //           "addr:city": "Kent",
  //           "wheelchair": "yes",
  //           "description": "Wow Bao sells Asian food (Thai, Chinese, and Japanese)",
  //           "drive_through": "no",
  //           "official_name": "Wow Bao - Noodles, Rice & Hot Asian Buns"
  //         }
  //       },
  //       "distance": 705,
  //       "place_id": "517c5ee042fd5554c059bbecc490e5924440f00102f9016bde181900000000920307576f772042616f"
  //     },
  //     "geometry": {
  //       "type": "Point",
  //       "coordinates": [
  //         -81.34358283911746,
  //         41.14763078322854
  //       ]
  //     }
  //   }
  // ];

  if (!data) return { message: "Failed to make request" };
  
  return data
    .filter(({ properties }: any) => !properties.name || properties.name !== "")
    .map(({ properties: { datasource, ...properties } }: any) => ({
      name: properties.name,
      description: datasource.raw.description,
      tags: (datasource.raw.cuisine ?? "").replace(/\_/g, " ").split(";"),
      website: datasource.raw.website,
      amenity: datasource.raw.amenity,
      attributes: {
        delivery: decodeAttribute(datasource.raw.delivery),
        takeaway: decodeAttribute(datasource.raw.takeaway),
        driveThrough: decodeAttribute(datasource.raw.drive_through),
        smoking: decodeAttribute(datasource.raw.smoking),
        wheelchair: decodeAttribute(datasource.raw.wheelchair),
      },
      address: {
        street: properties.street,
        city: properties.city,
        state: properties.state_code,
        zip: properties.postcode,
      },
      geo: {
        distance: properties.distance,
        longitude: properties.lon,
        latitude: properties.lat
      }
    }));
}

const decodeAttribute = (attribute?: string) => attribute === "yes";
