import { useState, useEffect } from 'react';

function App() {

  const [countries, setCountries] = useState(undefined);
  const [orgCountryList, setOrgCountryList ] = useState(undefined);
  const [regions, setRegions] = useState(undefined);

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
      <div className="inputs">
        <div className="filters">
          <select name='filterByRegion' id='filterByRegion' onChange={handleFilters}>
            <option value="">Filter by region</option>
            {regions && regions.map(region =>
              <option value={region} key={region}>{region}</option>
            )}
          </select>
          <select name='filterByArea' id='filterByArea' onChange={handleFilters}>
            <option value="">Filter by area</option>
            <option value="larger">Larger than Lithuania</option>
            <option value="smaller">Smaller than Lithuania</option>
          </select>
        </div>
        <select name='sort' id='sort' onChange={handleFilters}>
          <option value="asc">Ascending</option>
          <option value="dsc">Descending</option>
        </select>
      </div>


      <CountryList countries={countries} />
    </>
  );
}

export default App;