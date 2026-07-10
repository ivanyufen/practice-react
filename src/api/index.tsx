export const getCountries = async () => {
  const response = await fetch(
    'https://openholidaysapi.org/Countries?languageIsoCode=EN',
  )
  if (!response.ok) return null
  const cleanResponse = await response.json()
  return cleanResponse
}

export const getHolidaysByCountry = async (countryIsoCode: string) => {
  const date = new Date()
  const validFrom = new Date(date.getFullYear(), 0, 1).toLocaleDateString(
    'en-CA',
  )
  const validTo = new Date(date.getFullYear(), 11, 31).toLocaleDateString(
    'en-CA',
  )
  const response = await fetch(
    `https://openholidaysapi.org/PublicHolidays?countryIsoCode=${countryIsoCode}&validFrom=${validFrom}&validTo=${validTo}`,
  )
  if (!response.ok) return null

  const cleanResponse = await response.json()

  return cleanResponse
}

export const getArticles = async () => {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/topstories.json`,
  )
  if (!response.ok) return null

  const cleanResponse = await response.json()

  const awaitPromises = []
  cleanResponse.slice(0, 10).forEach(async (item) => {
    awaitPromises.push(
      new Promise(async (resolve) => {
        const res = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${item}.json`,
        )
        const finalRes = await res.json()
        resolve(finalRes)
      }),
    )
  })
  const finalData = await Promise.all(awaitPromises)
  return finalData
}
