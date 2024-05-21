import * as React from 'react';
import { NavLink, Outlet,useNavigate,useLocation } from 'react-router-dom';
import './Cargoes.css';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CreateCargo from './CreateCargo/CreateCargo';

function Cargoes() {
    const [showCreateCargo, setShowCreateCargo] = React.useState(false);
    const navigate = useNavigate();
    const location=useLocation();

    React.useEffect(() => {
        if (location.pathname === '/dashboard/cargoes') {
            navigate('list');
        }
    }, [navigate, location.pathname]);

    const handleShowCreateCargo =() => {
        setShowCreateCargo(true);
    }
    const CloseShowCreateCargo = () => {
        setShowCreateCargo(false);
    }
    return (
        <div className="cargoes_main_div">
            <div className="cargoes_sub_div">
                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <NavLink to='list' className='cargoes_nav_links'>Cargoes List</NavLink>
                    <NavLink to='archive' className='cargoes_nav_links'>Archive</NavLink>
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                    <Button onClick={handleShowCreateCargo} style={{
                        border : '0.7px solid rgba(16, 24, 40, 1)',
                        padding:'7.68px, 12.28px, 7.68px, 12.28px',
                        backgroundColor:'rgba(16, 24, 40, 1)',
                        borderRadius:'6px',
                        boxShadow:'0 0.7 rgba(16, 24, 40, 0.05)',
                        fontSize:'10px',
                        color:'rgba(255, 255, 255, 1)'
                        }}
                    >
                    <Plus style={{
                        marginRight:'5px',
                        width:'15px',
                        height:'15px'
                        }}
                    />
                    Create Cargo
                </Button>
                </div>
            </div>
            {showCreateCargo && <CreateCargo onClose={CloseShowCreateCargo} />}
            <div className='cargoes_outlet_div'>
                <Outlet />
            </div>
        </div>
    )
}

export default Cargoes;