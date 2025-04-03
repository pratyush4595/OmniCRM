import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainHeader from "../MainHeader/MainHeader";
import CustomerList from "../Customer/CustomerLIst/CustomerList";
import CustomerForm from "../Customer/CustomerForm/CustomerForm";
import Login from "../Login/Login";
import SecureRoute from "../../Utils/SecureRoute";
import UserList from "../User/UserList/UserList";
import UserForm from "../User/UserForm/UserForm";
import TicketList from "../Ticket/TicketList/TicketList";
import TicketForm from "../Ticket/TicketForm/TicketForm";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainHeader />}>
                    <Route index element={
                        <SecureRoute>
                            <CustomerList />
                        </SecureRoute>
                    } />
                    <Route path="/form" element={
                        <SecureRoute>
                            <CustomerForm />
                        </SecureRoute>
                    } />
                    <Route path="/form/:customerId" element={
                        <SecureRoute>
                            <CustomerForm />
                        </SecureRoute>
                    } />
                    <Route path="/login" element={
                        <Login />
                    } />
                    <Route path="/users" element={
                        <SecureRoute>
                            <UserList />
                        </SecureRoute>
                    } />
                    <Route path="/user_form" element={
                        <SecureRoute>
                            <UserForm />
                        </SecureRoute>
                    } />
                    <Route path="/user_form/:userId" element={
                        <SecureRoute>
                            <UserForm />
                        </SecureRoute>
                    } />
                    <Route path="/tickets" element={
                        <SecureRoute>
                            <TicketList />
                        </SecureRoute>
                    } />
                    <Route path="/ticket_form" element={
                        <SecureRoute>
                            <TicketForm />
                        </SecureRoute>
                    } />
                    <Route path="/ticket_form/:ticketId" element={
                        <SecureRoute>
                            <TicketForm />
                        </SecureRoute>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;