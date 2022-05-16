import { useState, useEffect } from 'react';

function App() {

  const [countries, setCountries] = useState(undefined);
  // const [regions, setRegions] = useState(undefined);
  const [sortDirection, setSortDirection] = useState('asc');
  let regions = [];

  if (countries) {
    regions = countries.reduce((regions, country) => {
      if (!regions.includes(country.region)) regions.push(country.region);
      return regions;
    }, []);
  }

  useEffect(() => {
    fetch('https://restcountries.com/v2/all?fields=name,region,area')
      .then(res => res.json())
      .then(data => setCountries(data))
      .catch(err => console.log(err));
  }, []);

  function changeSortDirection() {
    const newDirection = sortDirection === 'asc' ? 'dsc' : 'asc';
    const toSort = countries;
    toSort.sort((a,b)=>{
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

      if (nameA < nameB) return -1;
      if (nameA > nameB) return +1;
      return 0;
    });

    setCountries(toSort);
  }

  console.log('executed');

  return (
    <>
      <h1>List of countries</h1>
      <div className="inputs">
        <div className="filters">
          <select name='filterByRegion' id='filterByRegion'>
            <option value="">Filter by region</option>
            {regions && regions.map(region =>
              <option value={region} key={region}>{region}</option>
            )}
          </select>
          <select name='filterByArea' id='filterByArea'>
            <option value="">Filter by area</option>
            <option value="larger">Larger than Lithuania</option>
            <option value="smaller">Smaller than Lithuania</option>
          </select>
        </div>
        <select name='sort' id='sort'>
          <option value="asc">Ascending</option>
          <option value="dsc">Descending</option>
        </select>
      </div>


      {!countries && <h2>LOADING...</h2>}
      {countries && 
        <ul>
          {countries.map(country => 
            <li className='list-item' key={country.name}>
              <p>Country: <strong>{country.name}</strong></p>
              <p>Region: <strong>{country.region}</strong></p>
              <p>Area: <strong>{country.area} km&#178;</strong></p>
            </li>
          )}
        </ul>
      }
    </>
  );
}

export default App;