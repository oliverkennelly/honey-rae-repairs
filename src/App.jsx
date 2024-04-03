import "./App.css"
import { CustomerList } from "./components/customers/CustomerList"
import { EmployeeList } from "./components/employees/EmployeeList"
import { NavBar } from "./components/nav/NavBar"
import { TicketList } from "./components/tickets/TicketList"
import { Routes, Route, Outlet } from "react-router-dom"
import { Welcome } from "./components/welcome/Welcome"
import { CustomerDetails } from "./components/customers/CustomerDetails"

export const App = () => {
  return (
  <Routes>
    <Route 
      path="/" 
      element={
      <>
        <NavBar/>
        <Outlet/>
      </>
      }
    >
      <Route index element={<Welcome />} />
      <Route path="tickets" element={<TicketList/>}/>
      <Route path="customers">
        <Route index element={<CustomerList/>} />
        <Route path=":customerId" element={<CustomerDetails/>}/>
      </Route>
      <Route path="employees" element={<EmployeeList/>}/>
    </Route>
  </Routes>
  )
}

/*
export const App = () => {
  const [count, setCount] = useState(0) //[stateVariable, setterFunction]
  //the purpose of the setter function is that it informs state of changes to rerender
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
