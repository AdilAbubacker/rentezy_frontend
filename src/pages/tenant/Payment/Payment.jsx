import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import QueryString from 'query-string';
import axios from 'axios';

function Payment() {
    const location = useLocation();

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        // const query = new URLSearchParams(window.location.search);
        const values = QueryString.parse(location.search);
        console.log(values)


        if (values.success) {
          console.log("Order placed! You will receive an email confirmation.");
        }
    
        if (values.canceled) {
          console.log(
            "Order canceled -- continue to shop around and checkout when you're ready."
          );
        }
      }, []);

      const handleBookNow = async () => {
        try {
          const roomDetails = {
            room_id: 68,
            tenant_id: 2,
            no_of_rooms: 1
          }
          const response = await axios.post('http://127.0.0.1:8005/api/book/', roomDetails)
          console.log(response.data.checkout_url,'uhugug')
          sessionId = response.data.checkout_url;
        } catch (error) {
          
        }
      }
  return (
    <div>
        <section>
            <div className="product">
            <img
                src="https://i.imgur.com/EHyR2nP.png"
                alt="The cover of Stubborn Attachments"
            />
            <div className="description">
            <h3>Stubborn Attachments</h3>
            <h5>$20.00</h5>
            </div>
            </div>
            <form>
            <button type="submit" onClick={handleBookNow}>
                Checkout
            </button>
            </form>
        </section>
    </div>
  )
}

export default Payment