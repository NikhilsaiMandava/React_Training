import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Search, Plus,ListFilter } from "lucide-react";
import { Input } from "@/components/ui/input";
import CreateVoyage from './CreateVoyage/CreateVoyage';
import './Voyages.css';

function Voyages() {
    const [showCreateVoyage, setShowCreateVoyage] = React.useState(false);

    const handleShowCreateVoyage = () => {
        setShowCreateVoyage(true);
    }
    const CloseShowCreateVoyage = () => {
        setShowCreateVoyage(false);
    }
    return (
        <div className="voyage_main_div">
            <div className="voyage_searchbar_div">
                <div>
                    <span style={{color:'rgba(16, 24, 40, 1)',fontWeight:'600'}}>
                        Voyage List
                    </span>
                </div>
                <div className="voyage_search_icon_input_div">
                    <Search className="voyage_search_icon" />
                    <Input className="voyage_search_input" placeholder="Search..." />
                    <Button variant='outline' style={{
                        border:'0.7px solid rgba(208, 213, 221, 1)',
                        borderRadius:'6px',
                        color: 'rgba(52, 64, 84, 1)',
                        fontSize:'10px',
                        fontWeight:'normal',
                        marginRight:'2%',
                        padding:'1.5% 1.5%'
                        }}
                    >
                        <ListFilter style={{
                            marginRight: '5%',
                            width: '1vw',
                            height: '5vh',
                            }}
                        />
                            Filters
                    </Button>
                    <Button onClick={handleShowCreateVoyage} style={{
                        border: '0.7px solid rgba(16, 24, 40, 1)',
                        background: 'rgba(16, 24, 40, 1)',
                        borderRadius: '6px',
                        color: 'rgba(255, 255, 255, 1)',
                        fontSize: '10px',
                        padding: '1.5% 1.5%',
                        fontWeight: 'normal',
                        }}
                    >
                        <Plus style={{
                            marginRight: '5px',
                            width: '1vw',
                            height: '5vh'
                            }}
                        />
                        Create Voyage
                    </Button>
                </div>
                {showCreateVoyage && <CreateVoyage onClose={CloseShowCreateVoyage}/>}
            </div>
        </div>
    )
}

export default Voyages;