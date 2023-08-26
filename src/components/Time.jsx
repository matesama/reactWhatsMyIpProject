import {DateTime} from "luxon";
import {useState, useEffect} from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


const Time = (countryCode) => {
    const [localClock, setLocalClock] = useState("")
    const [colClock, setColClock] = useState("")

//LocalTime & LocalDate:
    const localTime = DateTime.local();
    const clock = localTime.toLocaleString({hour: 'numeric', minute: 'numeric', second: 'numeric'})
    
    const localDate = DateTime.now().toFormat('MM-dd-yyyy')
    console.log(localDate)
    console.log(clock);

    //Time in an other place with another Timezone:
    let zone = "America/Bogota";
    let dateTimes = DateTime.fromObject({}, {zone});
    //console.log("Current Date", dateTimes.toISO());
    const clockOtherTimezone = dateTimes.toLocaleString({hour: 'numeric', minute: 'numeric', second: 'numeric'})
    console.log(clockOtherTimezone);

    const tickTock = () => {
        setLocalClock(localTime.toLocaleString({hour: 'numeric', minute: 'numeric', second: 'numeric'}));
        setColClock(clockOtherTimezone);
    }

    useEffect(() => {
        const timer = setInterval(tickTock, 1000);
        return() => clearInterval(timer)
    }, [localClock, colClock])
    
    useEffect(() => {
        console.log("localClock updated", localClock)
    }, [localClock])
    
    useEffect(() => {
        const timer = setInterval(tickTock, 1000);
        return() => clearInterval(timer)
    }, [])
    
    useEffect(() => {
        console.log("localClock updated", localClock)
        console.log("colClock updated", colClock)
    }, [localClock, colClock])
    







    return( <div>
        <Card className="localDateInformation" style={{ width: '18rem' }}>
            <Card.Title>Local Date in {countryCode.countryCode}:</Card.Title>
            <ListGroup variant="flush">
            <ListGroup.Item>Date: {localDate}</ListGroup.Item>
            <ListGroup.Item>Time: {localClock}</ListGroup.Item>
            </ListGroup>
        </Card>

        <Card className="otherDateInformation" style={{ width: '18rem' }}>
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


export default Time;