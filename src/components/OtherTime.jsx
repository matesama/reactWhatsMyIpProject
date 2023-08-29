import {DateTime} from "luxon";
import {useState, useEffect} from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';



const OtherTime = ({countryCode}) => {
    const [localClock, setLocalClock] = useState("")
    const [colClock, setColClock] = useState("")

//LocalTime & LocalDate:
    const localTime = DateTime.local();
    const clock = localTime.toLocaleString({hour: 'numeric', minute: 'numeric', second: 'numeric'})
    
    const localDate = DateTime.now().toFormat('MM-dd-yyyy')

    //Time in an other place with another Timezone:
    let zone = "America/Bogota";
    let dateTimes = DateTime.fromObject({}, {zone});
    //console.log("Current Date", dateTimes.toISO());
    const clockOtherTimezone = dateTimes.toLocaleString({hour: 'numeric', minute: 'numeric', second: 'numeric'})
    

    const tickTock = () => {
        setLocalClock(localTime.toLocaleString({hour: 'numeric', minute: 'numeric', second: 'numeric'}));
        setColClock(clockOtherTimezone);
    }

    useEffect(() => {
        const timer = setInterval(tickTock, 1000);
        return() => clearInterval(timer)
    }, [colClock])
    
    
    /*useEffect(() => {
        console.log("colClock updated", colClock)
    }, [colClock])*/

    return( <div>
            <Card className="otherDateInformation card-bordered" style={{ width: '15rem' }}>
            <Card.Title>Date in CO:</Card.Title>
            <Card.Img variant="top" src={`https://flagsapi.com/CO/flat/64.png`} />
            <ListGroup variant="flush">
            <ListGroup.Item>Date: {localDate}</ListGroup.Item>
            <ListGroup.Item>Time: {colClock}</ListGroup.Item>
            </ListGroup>
        </Card>
        </div>
    )
}

export default OtherTime;