import * as React from 'react';
import { Button } from '@/components/ui/button';
import './ViewVoyage.css';
import { Plus, Trash2 } from 'lucide-react';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

const statusProgressMap: Record<string, number> = {
    "Loading": 40,
    "sailing": 60,
    "Planning": 0,
    "Discharging": 80,
    "Completed": 100,
};
const formSchema = z.object({
    milePoint:z.string(),
    calculatedETA : z.string(),
    customNote:z.string(),
    navigationalStatus:z.string(),
    speed:z.string(),
    course:z.string(),
    voyageStatus : z.string(),
    loadingPortCountry :z.string(),
    dischargePort: z.string(),
    vessel : z.string(),
    mmsi : z.string(),
    customer : z.string(),
    voyage : z.string(),
    loadingPort:z.string(),
    loadingTerminal:z.string(),
    loadingStevedoring:z.string(),
    dischargePortCountry : z.string(),
    dischargePortTerminal : z.string(),
    dischargeStevedoring:z.string(),
    receiver : z.string(),
    shipper : z.string(),
    name : z.string(),
    image : z.string(),
    imo : z.string(),
    vesselFlagState : z.string(),
    portOfRegistry : z.string(),
    owners:z.string(),
    grt:z.string(),
    nrt:z.string(),
    breadth:z.string(),
    depth:z.string(),
    numberOfCranes:z.string(),
    cranesMounted:z.string(),
    craneSWL:z.string(),
    statementsOfFacts:z.string()
})
type FormData = z.infer<typeof formSchema>;
type FormFieldName = keyof FormData;
const formFields: { name: FormFieldName; label: string }[] = [
    { name:'milePoint', label: 'Mile Point'},
    { name: "calculatedETA", label: "ETA" },
    { name: "customNote", label: 'Custom Note'},
    { name: 'navigationalStatus', label:"Navigational Status"},
    { name: "speed", label: "Speed"},
    { name:'course',label: 'Course'},
    { name: "voyageStatus", label: "Voyage Status" },
    { name: "loadingPortCountry", label: "Voyage Loading Country" },
    { name: "dischargePort", label: "Voyage Discharge Port" },
    { name: "vessel", label: "Vessel" },
    { name: "mmsi", label: "MMSI#"},
    { name: "customer", label: "Customer" },
    { name: "voyage", label: "Voyage" },
    { name: "loadingPort", label: "Loading Port" },
    { name: "loadingTerminal", label: "Loading Terminal" },
    { name: "loadingStevedoring", label: "Loading Stevedoring" },
    { name: "dischargePortCountry", label: "Discharge Port Country" },
    { name: "dischargePortTerminal", label: "Discharge Port Terminal" },
    { name: 'dischargeStevedoring', label: "Discharge Stevedoring"},
    { name: "receiver", label: "Receiver" },
    { name: "shipper", label: "Shipper" },
    { name: "name", label: "Name" },
    { name: "image", label: "Image"},
    { name: "imo", label: "IMO#"},
    { name: "vesselFlagState", label: "Vessel Flag State"},
    { name: "portOfRegistry", label: "Port Of Registry"},
    { name: "owners", label: "Owners"},
    { name: "grt", label: "G.R.T"},
    { name: "nrt", label: "N.R.T"},
    { name: "breadth", label: "Breadth"},
    { name: "depth", label: "Depth"},
    { name: "numberOfCranes", label: "Number Of Cranes"},
    { name: "cranesMounted", label: "Cranes Mounted"},
    { name: "craneSWL", label: "Crane SWL"},
    { name: "statementsOfFacts", label: "Statements Of Facts"}
];
interface ViewVoyageProps {
    onClose:() => void;
    voyage: any;
}

const ViewVoyage : React.FC<ViewVoyageProps> =({onClose,voyage}) => {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            milePoint:'NL-123',
            calculatedETA : voyage.calculatedETA,
            customNote:'',
            navigationalStatus:'1234567',
            speed: voyage.speed,
            course:'',
            voyageStatus : voyage.voyageStatus,
            loadingPortCountry : voyage.loadingPortCountry,
            dischargePort: voyage.dischargePort,
            vessel : voyage.vessel,
            mmsi : voyage.mmsi,
            customer : voyage.customer,
            voyage : voyage.voyage,
            loadingPort: voyage.loadingPort,
            loadingTerminal: voyage.loadingTerminal ,
            loadingStevedoring: voyage.loadingStevedoring,
            dischargePortCountry : voyage.dischargePortCountry,
            dischargePortTerminal : voyage.dischargePortTerminal,
            receiver : voyage.receiver,
            shipper : voyage.shipper,
            name : voyage.name,
            image : voyage.image,
            imo : voyage.imo,
            vesselFlagState : voyage.vesselFlagState,
            portOfRegistry : voyage.portOfRegistry,
            owners: voyage.owners,
            grt: voyage.grt,
            nrt: voyage.nrt,
            breadth: voyage.breadth,
            depth: voyage.depth,
            numberOfCranes: voyage.numberOfCranes,
            cranesMounted: voyage.cranesMounted,
            craneSWL: voyage.cranesSWL,
            statementsOfFacts: voyage.statementsOfFacts
        },
    });
    const progress = statusProgressMap[voyage.voyageStatus] ?? 0;
    const VoyageStatus = voyage.voyageStatus === 'Planning';//return boolean
    return (
        <div className='view_voyage_main_div'>
            <div className='view_voyage_sub_div'>
                <div className='view_voyage_progress_div'>
                    <div className='view_voyage_name'>
                        <span>{voyage.voyage}</span>
                    </div>
                    <div className='view_voyage_progress_bar'>
                        <div className='view_voyage_progress_fill' style={{ width: `${progress}%` }}>
                            <div className='view_voyage_progress_text' style={{
                                color: VoyageStatus ? 'black' : 'white',
                                alignItems: VoyageStatus ? 'center' : 'normal',
                                justifyContent: VoyageStatus ? 'end' : 'center',
                                padding:VoyageStatus?'0%':''
                                }}
                            >
                                {voyage.voyageStatus}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='view_voyage_buttons_div'>
                    <Button variant='outline' onClick={onClose} style={{
                        padding:'1.5% 1.5%',
                        width:'6vw',
                        border:'0.7px solid rgba(226, 232, 240, 1)'
                        }}
                    >
                        Back
                    </Button>
                </div>
            </div>
            <div className='view_voyage_details_main_div'>
                <div className='view_voyage_details_buttons_div'>
                    <Button variant='ghost' className='view_voyage_details_generate_btn'>
                        Generate Info
                    </Button>
                    <Button variant='ghost' className='view_voyage_details_delete_btn'>
                        <Trash2 className='view_voyage_details_delete_icon'/>
                        Delete
                    </Button>
                </div>
                <div className='view_voyage_details_div'>
                    <Form {...form}>
                        <form>
                            {formFields.map(({ name, label }) => (
                                <div className='view_voyage_details_label_input_div'>
                                    <div style={{paddingLeft:'1vw',width:'20vw'}}>
                                        <FormField
                                            control={form.control}
                                            name={name}
                                            render={() => (
                                                <FormItem>
                                                    <FormLabel className='view_voyage_details_label'>{label}</FormLabel>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div style={{width:'100%'}}>
                                        <FormField
                                            control={form.control}
                                            name={name}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Input {...field}  className='view_voyage_details_input'/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            ))}
                        </form>
                    </Form>
                </div>
            </div>
            <div className='view_voyage_map_div'>
                <p>Map</p>
            </div>
            <div className='view_voyage_assign_cargoes_div'>
                <div style={{width:'100%',display:'flex',justifyContent:'end'}}>
                    <Button className='view_voyage_assign_cargoes_btn'>
                        <Plus className='view_voyage_assign_cargoes_plus_icon'/>
                        Assign Cargoes
                    </Button>
                </div>
                <div className='view_voyage_cargoes_div'>
                    <span style={{
                        color:'rgba(181, 187, 198, 1)',
                        fontWeight:'600',
                        fontSize:'14px'
                        }}
                    >
                        No cargoes assigned
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ViewVoyage;