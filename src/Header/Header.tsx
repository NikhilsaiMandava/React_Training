import * as React from 'react';
import '../Header/Header.css';
import Header_Logo_Description from '../assets/header_logo_description.png';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import profilePic from '../assets/profile_pic.png';
import { User2Icon,LogOutIcon } from "lucide-react"
import { NavLink,useNavigate } from 'react-router-dom';
import EditProfile from '../Profile/EditProfile.tsx';

const userData = {
    firstName: 'Qwerty',
    lastName: 'John',
    email: "qwerty9999@gmail.com",
    login: "Qwertyjohn",
    password: "john9999",
    role: 'Administrator',
    profile_pic: profilePic
}
function Header() {
    const navigate = useNavigate();
    const [showEditProfile, setShowEditProfile] = React.useState(false);

    const handleShowEditProfile =() => {
        setShowEditProfile(true);
    }
    const CloseShowEditProfile = () => {
        setShowEditProfile(false);
    }

    const handleLogoutClicked =() => {
        navigate('/login');
    }
    return (
        <div className='header_main_div'>
            <div className='header_logo_description_div'>
                <img src={Header_Logo_Description} alt="Error While Loading" />
            </div>
            <div className='header_nav_menu_div'>
                <ul style={{display:'flex',flexDirection : 'row'}}>
                    <NavLink to='map' className='header_nav_links'><li>Map</li></NavLink>
                    <NavLink to='cargoes' className='header_nav_links'><li>Cargoes</li></NavLink>
                    <NavLink to='voyages' className='header_nav_links'><li>Voyages</li></NavLink>
                    <NavLink to='users' className='header_nav_links'><li>Users</li></NavLink>
                    <NavLink to='customers' className='header_nav_links'><li>Customers</li></NavLink>
                    <NavLink to='settings' className='header_nav_links'><li>Settings</li></NavLink>
                </ul>
            </div>
            <div className='header_profile_div'>
                <Menubar style={{background:'none',border:'none'}}>
                    <MenubarMenu>
                         <Avatar style={{width:'60px',height:'60px'}}>
                            <AvatarImage src={userData.profile_pic}/>
                            <AvatarFallback>P</AvatarFallback>
                        </Avatar>
                        <MenubarTrigger style={{background:'none',border:'none',color:'white',padding:'0px'}}>
                            {userData.firstName}
                            {userData.lastName}
                        </MenubarTrigger>
                        <MenubarContent style={{width:'80px',marginTop:'10px'}}>
                            <MenubarItem onClick={handleShowEditProfile}><User2Icon style={{marginRight:'5px',fontSize:'20px'}} />Edit Profile</MenubarItem>
                            <MenubarItem onClick={handleLogoutClicked}><LogOutIcon style={{marginRight:'5px',fontSize:'20px'}}/>Logout</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
            {showEditProfile && <EditProfile userData={userData} onClose={CloseShowEditProfile} />}
        </div>
    )
}

export default Header;