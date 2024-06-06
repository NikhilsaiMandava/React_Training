import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { XIcon,ChevronDown } from "lucide-react";
import './GenerateReport.css';

type Checked = DropdownMenuCheckboxItemProps["checked"];
interface GenerateReportProps {
    onClose: () => void;
}

const formSchema = z.object({
    operationType:z.string(),
    voyage : z.string(),
    projectNumber : z.string(),
    train : z.string(),
    truck : z.string(),
    barge : z.string()
})
type FormData = z.infer<typeof formSchema>;
const noBoxShadowStyle = `
    .no-box-shadow:focus {
        box-shadow: none !important;
        border: 0.9px solid rgba(203, 213, 225, 1) !important;
}`;
const operationTypes =[
    'Under Hook (L)',
    'Under Hook (D)',
    'F.O.T'
]

const GenerateReport:React.FC<GenerateReportProps> = ({ onClose }) => {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            operationType:'',
            voyage : '',
            projectNumber : '',
            train : '',
            truck : '',
            barge : ''
        },
    });
    const onSubmit = (data: FormData) => {
        console.log(data);
        form.reset();
        setCheckedItems({
            'Under Hook (L)': false,
            'Under Hook (D)': false,
            'F.O.T': false
        });
        setSelectedTransport(null);
    };
    const [checkedItems, setCheckedItems] = React.useState<Record<string, Checked>>({
        'Under Hook (L)': false,
        'Under Hook (D)': false,
        'F.O.T': false
    });
    const [selectedTransport, setSelectedTransport] = React.useState<string | null>(null);
    const handleCheckedChange = (type: string, checked: Checked) => {
        const newCheckedItems = Object.keys(checkedItems).reduce((acc, key) => {
            acc[key] = key === type ? checked : false;
            return acc;
        }, {} as Record<string, Checked>);

        setCheckedItems(newCheckedItems);
        form.setValue('operationType', checked ? type : '');
        setSelectedTransport(null);  // fot radio options
    };
    const handleTransportChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTransport(event.target.value);
    };
    return (
        <div className="generate_report_main_div">
            <Card style={{
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                backgroundColor: 'rgba(255, 255, 255, 1)', 
                outline: 'none',
                width:'700px',
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
                    <CardTitle style={{fontSize : '15px'}}>Generate Report</CardTitle>
                    <XIcon onClick={onClose} style={{margin:'0px'}}/>
                </CardHeader>
                <CardContent style={{padding:'50px',width:'100%'}}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="operationType"
                                render={({ field }) => (
                                    <FormItem style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                        <FormLabel style={{width:'140px',paddingRight:'5px',fontSize:'13px',color:'rgba(0, 0, 0, 1)',fontWeight:'500'}}>Operation Type</FormLabel>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger style={{width:'100%'}}>
                                                <Button variant="outline" style={{
                                                        display:'flex',
                                                        flexDirection:'row',
                                                        justifyContent:'space-between',
                                                        alignItems:'center',
                                                        width:'100%',
                                                        padding: '10px 15px',
                                                    }}
                                                >
                                                    <span style={{fontSize:'13px',color:'rgba(15, 23, 42, 1)',fontWeight:'400'}}>{field.value || 'Select any option'}</span>
                                                    <ChevronDown style={{
                                                        width:'20px',
                                                        height:'17px',
                                                        color:'1px solid rgba(77, 77, 77, 1)'
                                                    }}/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent style={{zIndex:1000,width:'484px',color:'rgba(102, 112, 133, 1)'}}>
                                                {operationTypes.map((type) => (
                                                    <DropdownMenuCheckboxItem
                                                        style={{
                                                            fontSize:checkedItems[type]?'13px':'10px',
                                                            color:checkedItems[type] ? 'black' :'',
                                                            fontWeight:checkedItems[type]?'400':'normal',
                                                        }}
                                                        key={type}
                                                        checked={checkedItems[type]}
                                                        onCheckedChange={(checked) => handleCheckedChange(type, checked)}
                                                    >
                                                        {type}
                                                    </DropdownMenuCheckboxItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </FormItem>
                                )}
                            />
                            {(checkedItems['Under Hook (L)'] || checkedItems['Under Hook (D)']) && (
                                <FormField
                                    control={form.control}
                                    name="voyage"
                                    render={({ field }) => (
                                        <FormItem style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '0px' }}>
                                            <FormLabel style={{ width: '140px', paddingRight: '5px', fontSize: '13px', color: 'rgba(0, 0, 0, 1)' ,fontWeight:'500'}}>Voyage#</FormLabel>
                                            <style>{noBoxShadowStyle}</style>
                                            <Input {...field} style={{ width: '100%' }} className="no-box-shadow"/>
                                        </FormItem>
                                    )}
                                />
                            )}
                            {(checkedItems['F.O.T'] && (
                                <>
                                <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',padding:'10px'}}>
                                    <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                        <Input type="radio" value="Train" 
                                            name="radio"
                                            onChange={handleTransportChange} 
                                            style={{
                                                width:'9px',
                                                height:'9px',
                                                color:'rgba(16, 24, 40, 1)',
                                                backgroundColor:'rgba(16, 24, 40, 1)'
                                            }}
                                        /><span style={{
                                            color:'rgba(15, 23, 42, 1)',
                                            fontSize:'12px',
                                            fontWeight:'400',
                                            paddingLeft:'10px'
                                            }}
                                        >Train</span>
                                    </div>
                                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',paddingLeft:'70px'}}>
                                        <Input 
                                            type="radio" 
                                            value="Truck" 
                                            name="radio" 
                                            onChange={handleTransportChange}
                                            style={{
                                                width:'9px',
                                                height:'9px',
                                                color:'rgba(16, 24, 40, 1)',
                                                backgroundColor:'rgba(16, 24, 40, 1)'
                                            }}
                                        /><span style={{
                                            color:'rgba(15, 23, 42, 1)',
                                            fontSize:'12px',
                                            fontWeight:'400',
                                            paddingLeft:'10px'
                                            }}
                                        >Truck</span>
                                    </div>
                                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',paddingLeft:'70px'}}>
                                        <Input 
                                            type="radio" 
                                            value="Barge" 
                                            name="radio"
                                            onChange={handleTransportChange}
                                            style={{
                                                width:'9px',
                                                height:'9px',
                                                color:'rgba(16, 24, 40, 1)',
                                                backgroundColor:'rgba(16, 24, 40, 1)'
                                            }}
                                        /><span style={{
                                            color:'rgba(15, 23, 42, 1)',
                                            fontSize:'12px',
                                            fontWeight:'400',
                                            paddingLeft:'10px'
                                            }}
                                        >Barge</span>
                                    </div>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="projectNumber"
                                    render={({ field }) => (
                                        <FormItem style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '0px' }}>
                                            <FormLabel style={{ width: '140px', paddingRight: '5px', fontSize: '13px', color: 'rgba(0, 0, 0, 1)' ,fontWeight:'500'}}>Project Number</FormLabel>
                                            <style>{noBoxShadowStyle}</style>
                                            <Input {...field} style={{ width: '100%' }} className="no-box-shadow"/>
                                        </FormItem>
                                    )}
                                />
                                {selectedTransport && (
                                    <FormField
                                        control={form.control}
                                        name={selectedTransport.toLowerCase() as keyof FormData}
                                        render={({ field }) => (
                                            <FormItem style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '0px'}}>
                                                <FormLabel style={{ width: '140px', paddingRight: '5px', fontSize: '13px', color: 'rgba(0, 0, 0, 1)', fontWeight: '500' }}>{selectedTransport}#</FormLabel>
                                                <style>{noBoxShadowStyle}</style>
                                                <Input {...field} style={{ width: '100%' }} className="no-box-shadow" />
                                            </FormItem>
                                        )}
                                    />
                                )}
                                </>
                            ))}
                            <hr style={{marginTop:'40px'}}/>
                            <div style={{display:'flex',flexDirection:'row',justifyContent:'end',marginTop:'20px'}}>
                                <Button style={{backgroundColor:'rgba(255, 255, 255, 1)',color:'black',outline:'1px solid rgba(226, 232, 240, 1)'}} onClick={onClose}>Cancel</Button>&nbsp;
                                <Button style={{backgroundColor:'rgba(44, 57, 92, 1)'}}>Create Cargo</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <div className="generate_report_bg_div" onClick={onClose}></div>
        </div>
    )
}

export default GenerateReport;