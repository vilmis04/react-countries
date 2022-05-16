import { useState, useEffect } from 'react';

function App() {

  const [countries, setCountries] = useState(undefined);

  useEffect(() => {
    fetch('https://restcountries.com/v2/all?fields=name,region,area')
      .then(res => res.json())
      .then(data => setCountries(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      {!countries && <h1>LOADING...</h1>}
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
