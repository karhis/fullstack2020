import React from 'react'

const Countries = ({ countries }) => {

    return (
        <div>
            {countries.map((country) => (
                <div className="card" key={country.name}>
                    <h4>{country.name}</h4>
                    <h6>capital {country.capital}</h6>
                    <h6>population {country.population}</h6>
                    <h5>languages</h5>
                    {country.languages.map((language) => (
                        <li key={language.iso639_1}>{language.name}</li>
                    )
                    )}
                    <img src={country.flag} className="flag" alt={country.name} />
                </div>
            ))}
        </div>
    )
}

export default Countries