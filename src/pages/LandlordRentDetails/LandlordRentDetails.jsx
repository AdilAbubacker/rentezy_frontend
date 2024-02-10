import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function LandlordRentDetails() {
    const [myApartment, setMyApartment] = useState([])
    const [monthlyPayments, setMonthlyPayments] = useState([])    
    const { rentId } = useParams();

    useEffect(() => {
      const fetchRentPayments = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8008/api/rented_properties/${rentId}`)
          setMyApartment(response.data.rental_agreement)
          setMonthlyPayments(response.data.monthly_payments)
          console.log(response.data.monthly_payments[0].amount)
          console.log(response.data)
        } catch (error) {
          console.error('error while fetching bookings:', error)
        }
      }
      fetchRentPayments();
    }, [])

    const getMonthName = (dateString) => {
        const date = new Date(dateString);
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[date.getMonth()];
    };

  return (
    <div className='p-11'>
       <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              Month
            </th>
            <th scope="col" className="px-4 py-3">
              Due date
            </th>
            <th scope="col" className="px-4 py-3">
              Amount
            </th>
            <th scope="col" className="px-4 py-3">
              Fine
            </th>

            <th scope="col" className="px-4 py-3">
              Payment Date
            </th>
            <th scope="col" className="px-4 py-3">
              Payment
            </th>
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
            {monthlyPayments.map((monthlyPayment, index) => (
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {getMonthName(monthlyPayment.due_date)} {new Date(monthlyPayment.due_date).getFullYear()}
            </th>
            <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {monthlyPayment.due_date}
            </th>
            <td className="px-4 py-4">
            {monthlyPayment.amount}
            </td>
            <td className="px-4 py-4 text-red-400">
            {monthlyPayment.fine}
            </td>

            <td className="px-4 py-4">
            {monthlyPayment.paid_on}
            </td>
            <td className="px-4 py-4 text-right">
                {monthlyPayment.is_paid ? (
                    <a href="#" className="font-medium text-green-600 dark:text-green-500 hover:underline">Paid</a>
                ) : (
                    <a className="font-medium bg-blue-100 text-red-600 py-2 px-5 dark:text-red-500 hover:underline">
                    Unpaid
                    </a>
                )}           
             </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LandlordRentDetails
