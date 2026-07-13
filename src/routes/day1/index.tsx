import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getCountries, getHolidaysByCountry } from '#/api'
import { useCallback, useState } from 'react'

export const Route = createFileRoute('/day1/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [selectedCountry, setSelectedCountry] = useState('NL')
  const query = useQuery({ queryKey: ['countries'], queryFn: getCountries })
  const { data: countries, isLoading } = query

  const { data: holidays, isLoading: isLoadingHolidays } = useQuery({
    queryKey: ['holidays', selectedCountry],
    queryFn: () => getHolidaysByCountry(selectedCountry),
    enabled: !!selectedCountry, // Only fetch if selectedValue is not empty
  })

  const handleCountrySelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>): void => {
      console.log(e.target.value)
      setSelectedCountry(e.target.value)
    },
    [],
  )

  if (isLoading) return <p>Loading countries.. </p>

  return (
    <div style={{ padding: 15 }}>
      <select
        defaultValue={selectedCountry}
        value={selectedCountry}
        onChange={handleCountrySelect}
      >
        {countries.map((country: any) => {
          return <option value={country.isoCode}>{country.name[0].text}</option>
        })}
      </select>

      {isLoadingHolidays ? (
        <p>Loading public holidays..</p>
      ) : (
        <ul>
          {holidays.map((holiday: any) => {
            const formatter = new Intl.DateTimeFormat('en-GB', {
              day: '2-digit',
              month: 'long',
            })

            const date = formatter.format(new Date(holiday.startDate))

            return (
              <li>
                {date} - {holiday.name[0].text}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
