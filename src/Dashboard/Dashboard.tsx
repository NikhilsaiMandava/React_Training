import { Outlet } from "react-router-dom";
import Header from "../Header/Header.tsx";

function Dashboard() {
    return (
        <div>
            <header>
                <Header />
            </header>
            <div className="dashboard_outlet_div">
                <Outlet  />
            </div>
        </div>
    )
}

export default Dashboard;