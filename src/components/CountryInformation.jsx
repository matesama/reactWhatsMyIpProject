import {useState, useEffect} from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const CountryInformation =  ({countryCode}) => {
    const [countryData, setCountryData] = useState([]);
    
    
    const fetchCountryData = async () => {
        try {
            const key = import.meta.env.VITE_COUNTRYLAYER_KEY;
            const getCountryInfos = await axios.get(`http://api.countrylayer.com/v2/all?access_key=${key}`);
            console.log(getCountryInfos);

            //if(!getCountryInfos) throw new Error(`Fetching data failed, due to ${getCountryInfos.status}`);
            const response = getCountryInfos.data;
            setCountryData(response);
            console.log(response);

        } catch(error) {
            console.log(error.message);
        }
    }
    useEffect(()=> {
        fetchCountryData();
      }, [])


        //use filter to search for alpha2Code the two letter country code passed as prop {country}
      const countryInformation = countryData.filter((country)=> {
        return country.alpha2Code === countryCode;
        } 
        );
        const specificCountryInformation = countryInformation[0]; 
       console.log(specificCountryInformation);
    

   //Ask: Why does it break it down so often?

    return(
        <div>
        {Object.keys(countryInformation).length > 0
        ?
        <Card className="countryInformation" style={{ width: '18rem' }}>
            <Card.Title>Country Information:</Card.Title>
            <Card.Img variant="top" src={`https://flagsapi.com/${countryCode}/flat/64.png`} />
            <ListGroup variant="flush">
            <ListGroup.Item>Name: {specificCountryInformation.name}</ListGroup.Item>
            <ListGroup.Item>Region: {specificCountryInformation.region}</ListGroup.Item>
            <ListGroup.Item>Capital: {specificCountryInformation.capital}</ListGroup.Item>
            </ListGroup>
        </Card>
        : null}
        </div>
        );

}

export default CountryInformation;