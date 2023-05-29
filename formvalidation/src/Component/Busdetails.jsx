import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useState } from "react";
import Modal from 'react-modal';
import ToasterUi from 'toaster-ui';
import GridLoader from "react-spinners/GridLoader";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const Busdetails = () => {

    let [bus, setBus] = useState(null);
    let [seats, setSeats] = useState(1);
    let [userdetail, setUserdetail] = useState({});
    let [bookingdate, setBookingdate] = useState("");
    let { busid } = useParams();
    let navigate = useNavigate(); 

    const toaster = new ToasterUi();

    let [loading, setLoading] = useState(true);
     let [color, setColor] = useState("red");

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
            setTimeout(() => {
                fetch("http://localhost:5000/bus/" + busid)
            .then((res) => { return res.json() })
            .then((bus) => {
                setBus(bus);
                setLoading(false);
            }, 3000);
            
            })

            let data =JSON.parse(localStorage.getItem("userdetails"));
            setUserdetail(data);

            let date = JSON.parse(localStorage.getItem("bookingDate"));
            setBookingdate(date);

    }, [])


    let handleBookticket = ()=>{
        //1) add ticket obj to active booking key in user obj [put]

        let ticket = {
                            busname : bus.busname, 
                            busnumber : bus.busnumber,
                            seats : seats,
                            boarding : bus.from,
                            departure : bus.to,
                            boarding_time : bus.start,
                            departure_time : bus.end,
                            journey_time : bus.journey_time,
                            price : seats * bus.price,
                            date : bookingdate
                        }

        
                        let UpdatedData = {
                            ...userdetail ,
                            active_bookings : [ ...userdetail.active_bookings ,ticket]
                            }

    let config = {
        method : "PUT",
        headers : {"Content-Type":"application/json"},
        body : JSON.stringify( UpdatedData )
    }

    fetch("http://localhost:4000/users/"+userdetail.id , config)
    

    // 2) increament the booked_seats value to prv + booked seats of current user [PUT]

    let updatedBusdata = {...bus , booked_seats : Number(bus.booked_seats) + Number(seats) }

    let busConfig = {
        method : "PUT",
        headers : {"Content-Type":"application/json"},
        body : JSON.stringify( updatedBusdata )
    }

    fetch("http://localhost:5000/bus/"+busid , busConfig)
    .then(()=>{
        // toaster.addToast("Ticket Confirmed, verify once in profile");
        const toastId = toaster.addToast("Ticket Confirmed, verify once in profile");

// To update the toast
toaster.updateToast(toastId, "New toast content", "success", { duration: 5000 });
        closeModal();
        navigate("/profile")
    })

        
    }


    return (
        <div className="bus-details">
            <Navbar />
            {loading && <GridLoader color={color} />}
            {bus &&
                <div>
                    <div>
                        <h3>Journey from <span>{bus.from}</span> to <span>{bus.to}</span> </h3>
                        <h2>{bus.busname}- {bus.type}</h2>
                        <p>{bus.busnumber}</p>
                        <p>Total capacity : {bus.seats} </p>
                        <p>Available Seats: {bus.seats - bus.booked_seats} </p>
                        <p>Boarding : <span>{bus.from} - {bus.start}</span></p>
                        <p>Destination : <span>{bus.to} - {bus.end}</span></p>
                        <p className="price">{bus.price} Rupees  / ticket  </p>
                        <input type="number" min="1" max={bus.seats - bus.booked_seats}
                            value={seats} onChange={(e) => { setSeats(e.target.value) }} />
                        <h2>Total Price - <span>{seats * bus.price}</span>  </h2>
                        <button className="ticket-btn" onClick={openModal}>Book ticket</button>

                    </div>
                </div>
            }

            {bus && <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                //onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Passanger : {userdetail.username}</h2>
                <p>{userdetail.phone}</p>
                <p>{bus.busname} - {bus.busnumber}</p>
                <p>Date: {bookingdate}</p>
                <p>{bus.from} - {bus.start} to {bus.to} - {bus.end}</p>
                <p>Seat Selected : {seats} - Total Amount {seats*bus.price}</p>
                <input type="number" placeholder="Enter Amount In Rupee" />
                <button onClick={handleBookticket}>pay</button>
            </Modal>}

        </div>
    );
}
export default Busdetails;