import { useEffect, useState } from "react"
import { getAllTickets } from "./services/ticketService"
import "./App.css"

export const App = () => {
  const [allTickets, setAllTickets] = useState([])
  const [showEmergencyOnly, setShowEmergency] = useState(false)
  const [filteredTickets, setFilteredTickets] = useState([])

  useEffect(() => { //this has a .then statement, meaning this is async. Other things will load before this one because of the wait
    getAllTickets().then((ticketsArray) => {
      setAllTickets(ticketsArray)
    })
  }, []) //ONLY runs on initial render of component

  useEffect(() => {
    if (showEmergencyOnly){
      const emergencyTickets = allTickets.filter(ticket => ticket.emergency === true)
      setFilteredTickets(emergencyTickets)
    } else {
      setFilteredTickets(allTickets)
    }
  }, [showEmergencyOnly, allTickets]) //runs on initial render and when showEmergencyOnly or allTickets changes

  return (
  <div className="tickets-container">
    <h2>Tickets</h2>
    <div>
      <button className="filter-btn btn-primary" onClick={() => {
        setShowEmergency(true)
      }}>Emergency</button>
      <button className="filter-btn btn-info" onClick={() => {
        setShowEmergency(false)
      }}>Show All</button>
    </div>
    <article className="tickets">
      {filteredTickets.map(ticket => {
        return (
          <section className="ticket" key={ticket.id}>
            <header className="ticket-info">#{ticket.id}</header>
            <div> {ticket.description}</div>
            <footer>
              <div>
                <div className="ticket-info">emergency</div>
                <div>{ticket.emergency ? "yes" : "no"}</div>
              </div>
            </footer>
          </section>
        )
      })}
    </article>
  </div>
  )
}

/*
export const App = () => {
  const [count, setCount] = useState(0) //[stateVariable, setterFunction]
  //useState takes one argument, setting the inital value of the statedVariale. If nothing is passed, the value is undefined

  const handleButtonClick = () => {
    setCount(count + 1)
    // this function is important because when it gets invoked, useState rerenders
  }

  return (
  <>
    <h1>Hello!</h1>
    <div>This is amazing!</div>
    <button className="btn-secondary" onClick={handleButtonClick}>Click me!</button>
    <div>Count: {count}</div>
  </>
  )
  // returns like this must have a parent. These are called react fragments
}
*/
