import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method !== 'POST' || !req.body) return res.status(404).json({ message: "Bad Request" });

  let { latitude, longitude } = req.body;
  if (!longitude || !latitude) return res.status(400).json({ message: "Bad Request" });

  let data = await fetch(`https://api.geoapify.com/v2/places?categories=catering&filter=circle:${longitude},${latitude},10000&bias=proximity:${longitude},${latitude}&lang=en&limit=50&apiKey=${process.env.GEOAPI_KEY}`)
    .then(response => response.json())
    .catch(_ => null);
  
  if (!data) return res.status(404).json({ message: "Failed to make request" });
  return res.status(200).json(data);
}

export default handler;
