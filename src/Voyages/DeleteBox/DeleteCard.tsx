import * as React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import './DeleteCard.css';

interface DeletecardProperties {
    onClose:() => void;
    voyage : any;
}
const DeleteCard:React.FC<DeletecardProperties> = ({onClose,voyage}) => {
    return (
        <div className='voyages_delete_main_div'>
            <Card style={{
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                backgroundColor: 'rgba(255, 255, 255, 1)', 
                outline: 'none',
                width:'28vw',
                zIndex:1000,
                }}
            >
                <CardHeader style={{ 
                        backgroundColor: 'rgba(44, 57, 92, 1)', 
                        color: 'white', 
                    }}
                >
                    <CardTitle style={{fontSize : '20px',display:'flex',alignItems:'center',justifyContent:'center'}}>Delete Voyage</CardTitle>
                </CardHeader>
                <CardContent style={{padding:'10%',width:'max-Content'}}>
                    <div style={{display:'flex',flexDirection:'column',}}>
                        <span style={{fontSize:'13px',color:'rgba(0, 0, 0, 1)',fontWeight:'500'}}>Do you really want to delete this ({voyage.voyage}) voyage?</span>
                        <div style={{display:'flex',justifyContent:'end',marginTop:'14%'}}>
                            <Button variant='outline' onClick={onClose} style={{
                                padding:'1.5% 1.5%',
                                marginRight:'3%',
                                border:'0.7px solid rgba(226, 232, 240, 1)'
                                }}
                            >
                                Cancel
                            </Button>
                            <Button style={{
                                backgroundColor:'rgba(220, 53, 69, 1)',
                                padding:'1.5% 1.5%'
                                }}
                            >
                                Delete Voyage
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className='voyages_delete_bg_div' onClick={onClose}></div>
        </div>
    )
}

export default DeleteCard;