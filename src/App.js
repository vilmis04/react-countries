import { useState, useEffect } from 'react';
import CountryList from './Components/CountryList';
import Filters from './Components/Filters';

function App() {

  const [countries, setCountries] = useState([]);
  const [orgCountryList, setOrgCountryList ] = useState([]);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v2/all?fields=name,region,area')
      .then(res => res.json())
      .then(data => {
        const regions = data.reduce((regions, country) => {
          if (!regions.includes(country.region)) regions.push(country.region);
          return regions;
        }, []);

        setCountries(data);
        setOrgCountryList(data);
        setRegions(regions);
      })
      .catch(err => console.log(err));
  }, []);

  function handleSort(countries, direction) {
    const list = [...countries];
    const multiplier = direction === 'asc' ? 1 : -1;
    list.sort((a,b)=>{
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) return (-1*multiplier);
      if (nameA > nameB) return (1*multiplier);
      return 0;
    });

    return list;
  }

  function handleFilters() {
    const direction = document.querySelector('#sort').value;
    const regionFilter = document.querySelector('#filterByRegion').value;
    const areaFilter = document.querySelector('#filterByArea').value;
    const areaOfLithuania = orgCountryList.reduce((area, country) => {
          if (country.name === 'Lithuania') area = country.area;
          return area;
        });
    let filteredView = orgCountryList;
    if (regionFilter) {
      filteredView = orgCountryList.filter(country => {
        return country.region === regionFilter;
      });
    }
    if (areaFilter === 'larger') {
          filteredView = filteredView.filter(country => country.area > areaOfLithuania);
        } else if (areaFilter === 'smaller') {
          filteredView = filteredView.filter(country => country.area < areaOfLithuania);
        }

    filteredView = handleSort(filteredView, direction);
    setCountries(filteredView);
  }

  return (
    <>
      <h1>List of countries</h1>
      <Filters regions={regions} handleFilters={handleFilters} />
      <CountryList countries={countries} />
    </>
  );
}

export default App;