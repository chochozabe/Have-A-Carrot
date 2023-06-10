import { NextApiRequest, NextApiResponse } from "next";

export default async function publicHolidays(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { year } = req.query;
  const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/KR`;

  const response = await fetch(url, {
    method: "GET",
  });

  const data = await response.json();

  res.status(200).json(data);
}
