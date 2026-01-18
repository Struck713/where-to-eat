"use server";

const CATEGORIES = ["catering", "commercial.food_and_drink"];

export const getPlaces = async (latitude: number, longitude: number) => {

  const params = new URLSearchParams({
    categories: CATEGORIES.join(","),
    filter: `circle:${longitude},${latitude},10000`,
    bias: `proximity:${longitude},${latitude}`,
    lang: "en",
    limit: "20",
    apiKey: process.env.GEOAPI_KEY!
  });

  const data = await fetch(`https://api.geoapify.com/v2/places?${params.toString()}`)
    .then(res => res.json())
    .then(res => res.features)
    .catch(_ => null);

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
