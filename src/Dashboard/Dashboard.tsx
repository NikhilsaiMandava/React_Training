import { Outlet } from "react-router-dom";
import Header from "../Header/Header.tsx";

function Dashboard() {
    return (
        <>
            <header>
                <Header />
            </header>
            <div className="dashboard_outlet_div">
                <Outlet  />
            </div>
        </>
    )
}

export default Dashboard;