import Navbar from "./Navbar";

const BookFlight = () => {
    return ( 
        <div className="book-flight">
            <Navbar/>
            <div className="inputs">
                <h1>Search for the destination</h1>
                <form action="">
                    <input type="text" placeholder="from" required/>
                    <input type="text" placeholder="to" required/>
                    <input type="date" />
                    <input type="submit" value={"search flight"}/>
                </form>
            </div>
        </div>
     );
}
 
export default BookFlight;