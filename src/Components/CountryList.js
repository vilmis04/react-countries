function CountryList (props) {


    return (
        <>
            {!props.countries && <h2>LOADING...</h2>}
            {props.countries && 
                <ul>
                {props.countries.map(country => 
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

export default CountryList;