import * as React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import './Restore.css';

interface RestoreProps {
    onClose: () => void;
    selectedRows : number;
}

const Restore : React.FC<RestoreProps> = ({selectedRows,onClose}) => {
    return (
        <div className="restore_cargoes_main_div">
            <Card style={{
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                backgroundColor: 'rgba(255, 255, 255, 1)', 
                outline: 'none',
                width:'fit-Content',
                padding:'0%',
                zIndex:1000,
                }}
            >
                <CardHeader style={{ 
                        display: 'flex', 
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        backgroundColor: 'rgba(44, 57, 92, 1)', 
                        color: 'white', 
                        padding: '5%', 
                    }}
                >
                    <CardTitle style={{fontSize : '15px'}}>Archive</CardTitle>
                    <XIcon onClick={onClose} style={{margin:'0%'}}/>
                </CardHeader>
                <CardContent style={{padding:'30px',width:'100%'}}>
                    <span>Do you want to restore {selectedRows} cargo(es)</span>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'end',marginTop:'10%'}}>
                        <Button style={{
                            backgroundColor:'rgba(255, 255, 255, 1)',
                            color:'black',
                            outline:'2px solid rgba(226, 232, 240, 1)',
                            marginRight:'5%'
                            }}
                            onClick={onClose}>
                            No
                        </Button>
                        <Button style={{
                            backgroundColor:'rgba(44, 57, 92, 1)'
                            }}>
                            Yes
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <div className="restore_cargoes_bg_div" onClick={onClose}></div>
        </div>
    )
}

export default Restore;