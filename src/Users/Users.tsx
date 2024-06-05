import * as React from 'react';
import { Button } from "@/components/ui/button";
import './Users.css';
import { ListFilter, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { NavLink,Outlet,useNavigate, useLocation } from "react-router-dom";
import CreateUser from './CreateUser/CreateUser.tsx';

function Users() {
    const navigate=useNavigate();
    const location=useLocation();
    React.useEffect(() => {
        if (location.pathname === '/dashboard/users') {
            navigate('allusers');
        }
    }, [navigate, location.pathname]);
    const [showCreateUser,setShowCreateUser] = React.useState(false);
    const handleShowCreateUser = () => {
        setShowCreateUser(true);
    }
    const closeShowCreateUser = () => {
        setShowCreateUser(false);
    }
    return (
        <div className="users_main_div">
            <div className="users_links_search_div">
                <div className="users_links_div">
                    <NavLink to="allusers" className="users_links_btn">All Users</NavLink>
                    <NavLink to='usersonline' className="users_links_btn">Users Online</NavLink>
                    <NavLink to='activityreport' className="users_links_btn">Activity Report</NavLink>
                </div>
                <div style={{display:'flex',flexDirection:'row',marginRight:'2%'}}>
                    <div className="users_search_bar_div">
                        <Search className="users_search_bar_search_icon"/>
                        <Input placeholder="Search..." className="users-search_bar_input_div"/>
                    </div>
                    <div className="users_buttons_div">
                        <Button variant='outline' className="users_filters_btn">
                            <ListFilter className="users_filters_btn_icon"/>
                            Filters
                        </Button>
                        <Button className="users_create_user_btn" onClick={handleShowCreateUser}>
                            <Plus className="users_create_user_btn_icon"/>
                            Create User
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
            {showCreateUser && <CreateUser onClose={closeShowCreateUser}/>}
        </div>
    )
}

export default Users;