import {DateTime} from "luxon";
import {useState, useEffect} from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


const Time = ({countryCode}) => {
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
    }, [localClock])
    
    /*useEffect(() => {
        console.log("localClock updated", localClock)
    }, [localClock])*/
    
    return( <div>
        <Card className="localDateInformation" style={{ width: '18rem' }}>
            <Card.Title>Local Date in {countryCode.countryCode}:</Card.Title>
            <ListGroup variant="flush">
            <ListGroup.Item>Date: {localDate}</ListGroup.Item>
            <ListGroup.Item>Time: {localClock}</ListGroup.Item>
            </ListGroup>
        </Card>
        </div>
    )
}


export default Time;