import * as React from 'react';
import './CreateVoyage.css';
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
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { XIcon } from "lucide-react";
import { Button } from '@/components/ui/button';

const formSchema = z.object({
    customer : z.string(),
    voyage : z.string(),
    voyageStatus : z.string(),
    loadingPortCountry :z.string(),
    loadingPort:z.string(),
    loadingTerminal:z.string(),
    loadingStevedoring:z.string(),
    dischargePortCountry : z.string(),
    dischargePort: z.string(),
    dischargePortTerminal : z.string(),
    dischargeStevedoring:z.string(),
    receiver : z.string(),
    shipper : z.string(),
    calculatedETA : z.string(),
    vessel : z.string(),
    name : z.string(),
    image : z.string(),
    imo : z.string(),
    mmsi : z.string(),
    vesselFlagState : z.string(),
    portOfRegistry : z.string(),
    owners:z.string(),
    grt:z.string(),
    nrt:z.string(),
    breadth:z.string(),
    depth:z.string(),
    speed:z.string(),
    numberOfCranes:z.string(),
    cranesMounted:z.string(),
    craneSWL:z.string(),
    statementsOfFacts:z.string()
})
type FormData = z.infer<typeof formSchema>;
type FormFieldName = keyof FormData;
const formFields: { name: FormFieldName; label: string }[] = [
    { name: "customer", label: "Customer" },
    { name: "voyage", label: "Voyage" },
    { name: "voyageStatus", label: "Voyage Status" },
    { name: "loadingPortCountry", label: "Loading Port Country" },
    { name: "loadingPort", label: "Loading Port" },
    { name: "loadingTerminal", label: "Loading Terminal" },
    { name: "loadingStevedoring", label: "Loading Stevedoring" },
    { name: "dischargePortCountry", label: "Discharge Port Country" },
    { name: "dischargePort", label: "Discharge Port" },
    { name: "dischargePortTerminal", label: "Discharge Port Terminal" },
    { name: 'dischargeStevedoring', label: "Discharge Stevedoring"},
    { name: "receiver", label: "Receiver" },
    { name: "shipper", label: "Shipper" },
    { name: "calculatedETA", label: "Calculated ETA" },
    { name: "vessel", label: "Vessel" },
    { name: "name", label: "Name" },
    { name: "image", label: "Image"},
    { name: "imo", label: "IMO#"},
    { name: "mmsi", label: "MMSI#"},
    { name: "vesselFlagState", label: "Vessel Flag State"},
    { name: "portOfRegistry", label: "Port Of Registry"},
    { name: "owners", label: "Owners"},
    { name: "grt", label: "G.R.T"},
    { name: "nrt", label: "N.R.T"},
    { name: "breadth", label: "Breadth"},
    { name: "depth", label: "Depth"},
    { name: "speed", label: "Speed"},
    { name: "numberOfCranes", label: "Number Of Cranes"},
    { name: "cranesMounted", label: "Cranes Mounted"},
    { name: "craneSWL", label: "Crane SWL"},
    { name: "statementsOfFacts", label: "Statements Of Facts"}
];

interface CreateVoyageProps {
    onClose : () => void;
}
const CreateVoyage : React.FC< CreateVoyageProps > = ({onClose}) => {
    const [count,setCount]=React.useState(0);
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customer : '',
            voyage : '',
            voyageStatus : '',
            loadingPortCountry : '',
            loadingPort: '',
            loadingTerminal: '',
            loadingStevedoring: '',
            dischargePortCountry : '',
            dischargePort: '',
            dischargePortTerminal : '',
            receiver : '',
            shipper : '',
            calculatedETA : '',
            vessel : '',
            name : '',
            image : '',
            imo : '',
            mmsi : '',
            vesselFlagState : '',
            portOfRegistry : '',
            owners: '',
            grt: '',
            nrt: '',
            breadth: '',
            depth: '',
            speed: '',
            numberOfCranes: '',
            cranesMounted: '',
            craneSWL: '',
            statementsOfFacts: ''
        },
    });
    const onSubmit = (data: FormData) => {
        console.log(data);
    };
    return (
        <div className='create_voyage_card_main_div'>
            <Card style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(246, 246, 247, 1)',
                outline: 'none',
                width: '90vw',
                zIndex: 1000,
                }}
            >
                <CardHeader style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'rgba(26, 41, 80, 1)',
                    color: 'white',
                    padding: '20px'
                    }}
                >
                    <CardTitle style={{ fontSize: '15px' }}>Create Voyage</CardTitle>
                    <XIcon onClick={onClose} style={{ margin: '0px' }} />
                </CardHeader>
                <CardContent style={{ padding: '10px' }}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div style={{ display: 'flex', flexDirection: 'column', margin: '10px',overflowX:'auto',height:'80vh' }}>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                {[0, 1, 2].map((column) => (
                                        <div key={column} style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                                            {formFields.slice(column * 11, column * 11 + 10).map(({ name, label }) => (
                                                <FormField
                                                    key={name}
                                                    control={form.control}
                                                    name={name}
                                                    render={({ field }) => (
                                                        <FormItem style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                            <FormLabel style={{ width: '300px', padding: '5px' }}>{label}</FormLabel>
                                                            <Input {...field} className="create_voyage_input" />
                                                        </FormItem>
                                                    )}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', marginTop: '15px', paddingRight: '15px' }}>
                                    <Button variant='outline' style={{ color: 'black'}} onClick={onClose}>Cancel</Button>&nbsp;
                                    <Button style={{ backgroundColor: 'rgba(44, 57, 92, 1)' }}>Create Cargo</Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <div className='create_voyage_bg_div' onClick={onClose}></div>
        </div>
    )
}

export default CreateVoyage;