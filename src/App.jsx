import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";
import Map from "./components/Map";
import CountryInformation from './components/CountryInformation';
import CountryFlag from './components/countryFlag';
import Time from "./components/Time";
import OtherTime from './components/OtherTime';
import LoadingButton from './components/LoadingButton';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function App() {
  const [address, setAddress] = useState(""); 
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [countryCode, setCountryCode] = useState("");
  const [ipButton, setIpButton] = useState(false);


  const fetchIp = async () => {
    try {
      const key = import.meta.env.VITE_KEY;
      
      const getIp = await axios.get(`https://geo.ipify.org/api/v1?apiKey=${key}`);
     

      if(!getIp) throw new Error(`Fetching data failed, due to ${getIp.status}`);
      const response = getIp.data.ip;
      setAddress(response);
      setLat(getIp.data.location.lat);
      setLng(getIp.data.location.lng);
      setCountryCode(getIp.data.location.country);

    } catch(error) {
      console.log(error.message);
    }
    
  }
  useEffect(()=> {
    fetchIp();
  }, [])
  

  return (
    <>
      <div >
      <Container className="full">
      <Row> 
      <Col><h1>What´s my IP</h1></Col>  
      </Row>
      <Row>
        <Col><LoadingButton setIpButton={setIpButton}/>
        {ipButton ? 
        <h3 className="ipDisplayed">My Ip address is: {address}</h3> : null
        }
        </Col>
      </Row>
      <Row>
        <Col>
        {lat !== 0 && lng !== 0 ?  
        <Map lat={lat} lng={lng}  />
        : null}
        </Col>
      </Row>
      <Row>
        <Col><CountryInformation countryCode={countryCode}/></Col>
        <Col><Time countryCode={countryCode}/></Col>
        <Col><OtherTime countryCode={countryCode} /></Col>
      </Row>
    </Container>
        
        
        
        
       {/* <CountryFlag countryCode={countryCode}/>*/}
        
      </div>
  
    </>
  )
}

export default App
