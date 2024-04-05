import { useState, useEffect } from "react"
import { getAllTickets } from "../../services/ticketService"
import "./Ticket.css"
import { Ticket } from "./Ticket"
import { TicketFilterBar } from "./TicketFilterBar"

export const TicketList = ({ currentUser }) => {
    const [allTickets, setAllTickets] = useState([])
    const [showEmergencyOnly, setShowEmergency] = useState(false)
    const [filteredTickets, setFilteredTickets] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const getAndSetTickets = () => {
      getAllTickets().then((ticketsArray) => {
        setAllTickets(ticketsArray)
      })
    }

  useEffect(() => { //this has a .then statement, meaning this is async. Other things will load before this one because of the wait
    getAndSetTickets()
  }, []) //ONLY runs on initial render of component
  //useEffect is for preventing loops, as useState without a button or event to trigger setting it sends an infite loop

  useEffect(() => {
    if (showEmergencyOnly){
      const emergencyTickets = allTickets.filter(ticket => ticket.emergency === true)
      setFilteredTickets(emergencyTickets)
    } else {
      setFilteredTickets(allTickets)
    }
  }, [showEmergencyOnly, allTickets]) //runs on initial render and when showEmergencyOnly or allTickets changes

  useEffect(() => {
    const foundTickets = allTickets.filter(ticket => ticket.description.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredTickets(foundTickets)
  }, [searchTerm, allTickets])

  return (
  <div className="tickets-container">
    <h2>Tickets</h2>
    <TicketFilterBar setShowEmergency={setShowEmergency} 
    setSearchTerm={setSearchTerm}/>
    <article className="tickets">
      {filteredTickets.map(ticketObj => {
        return <Ticket ticket={ticketObj} currentUser={currentUser} getAndSetTickets={getAndSetTickets} key={ticketObj.id}/>
      })}
    </article>
  </div>
  )
}