import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import './ArchiveCargoCard.css';

interface ArchiveCreateCargoProps {
    onClose: () => void;
    selectedRows : number;
}
const ArchiveCreateCargo:React.FC<ArchiveCreateCargoProps> = ({selectedRows,onClose}) => {
    return (
        <div className="archive_cargoes_main_div">
            <Card style={{
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                backgroundColor: 'rgba(255, 255, 255, 1)', 
                outline: 'none',
                width:'500px',
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
                        padding: '20px', 
                    }}
                >
                    <CardTitle style={{fontSize : '15px'}}>Archive</CardTitle>
                    <XIcon onClick={onClose} style={{margin:'0px'}}/>
                </CardHeader>
                <CardContent style={{padding:'30px',width:'100%'}}>
                    <span>Do you really want to archive {selectedRows} cargo(es)</span>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'end',marginTop:'20px'}}>
                        <Button style={{
                            backgroundColor:'rgba(255, 255, 255, 1)',
                            color:'black',
                            outline:'1px solid rgba(226, 232, 240, 1)',
                            marginRight:'10px'
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
            <div className="archive_cargoes_bg_div" onClick={onClose}></div>
        </div>
    )
}

export default ArchiveCreateCargo;