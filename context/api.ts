async function publicHolidays(year: number) {
  const url = `/api/publicHolidays/${year}`;

  const response = await fetch(url, {
    method: "GET",
  });

  const data = await response.json();

  return data;
}

export { publicHolidays };
