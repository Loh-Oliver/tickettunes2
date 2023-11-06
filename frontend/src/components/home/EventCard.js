import React, { useState, useEffect, Fragment } from 'react';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import ImageDisplay from './ImageDisplay';
import '../../assets/coldplay.png';
import '../../assets/twice.png';
import '../../assets/ateez.png';
import '../../assets/lauv.png';
import '../../assets/p1harmony.png';
import '../../assets/hallyupopfest.png';
import '../../assets/roc.png';
import '../../assets/taylorswift.png';
import '../../assets/vibes.png';
import Twice from '../../assets/twice.png';
import CardMedia from '@mui/material/CardMedia';

function EventCard() {
    const dateStyle = {
        variant: "body1",
        color: "#5522cc",
        fontSize: "14px",
        fontWeight: "bold",
        textAlign: "left",
        textTransform: "none",
    };

    const eventStyle = {
        gutterBottom: true,
        variant: "h5",
        fontSize: "20px",
        component: "div",
        fontWeight: "bold",
        textAlign: "left",
        textTransform: "none",
    };

    const [eventInfoList, setEventInfoList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/home');
                setEventInfoList(response.data);
            } catch (error) {
                // Handle any errors that occurred during the request
                // navigate('/eventinfo/notfound');
            }
        };
        fetchData();
    }, []);

    let formattedData = [];

    const formatData = (eventInfoList, formattedData) => {
        for (let i = 0; i < Math.ceil(eventInfoList.length / 3); i++) {
            const startIndex = i * 3;
            let endIndex = startIndex + 3;  // Change 'const' to 'let' here

            if (endIndex > eventInfoList.length) {
                endIndex = eventInfoList.length;
            }
            formattedData.push(eventInfoList.slice(startIndex, endIndex));
        }
    }

    formatData(eventInfoList, formattedData);
    // console.log(eventInfo.imageURL);
    // console.log(eventInfo.ticketPricing);

    return (
        <Fragment>
            {formattedData.map((row, rowIndex) => (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "2rem",
                        justifyContent: "center",
                        marginTop: "2rem",
                        marginBottom: "2rem",
                    }}
                    key={rowIndex}
                    className="row"
                >
                    {row.map((eventInfo, itemIndex) => (
                        <Link to={`/eventinfo1/${eventInfo.id}`}>
                            <Button>
                                <Card sx={{ width: 400, height: 300 }}>
                                    <CardMedia
                                        component="img"
                                        height="175"
                                        image={Twice}
                                        alt="Twice"
                                    />
                                    <CardContent>
                                        <Typography sx={dateStyle}>
                                            {eventInfo.date}
                                        </Typography>
                                        <Typography sx={eventStyle}>
                                            {eventInfo.eventName}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Button>
                        </Link>
                    ))}
                </div>
            ))}
        </Fragment>
    );
}

export default EventCard;
