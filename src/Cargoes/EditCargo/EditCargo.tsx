import * as React from 'react';
import './EditCargo.css';
import { Button } from '@/components/ui/button';
import { Link2, Trash2,Calendar as CalendarIcon } from 'lucide-react';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Graph from '../../Common/Graph/Graph.tsx';

interface EditCargoProps {
    onClose: () => void;
    cargo: any
}
const statusProgressMap: Record<string, number> = {
    "Load Ready": 20,
    "Onboard": 40,
    "Discharged": 60,
    "Loaded Out": 80,
    "Origin": 0,
    "Distribution In": 50,
    "Distribution Out": 70,
    "Delivered": 100,
};
const formSchema = z.object({
    customer: z.string(),
    packingListId: z.string(),
    cargoType: z.string(),
    cargoSubType: z.string(),
    cargoStatus: z.string(),
    projectName: z.string(),
    projectNumber: z.string(),
    voyage: z.string(),
    cargoId: z.string(),
    barcode: z.string(),
    guppyId: z.string(),
    remoraId: z.string(),
    length: z.string(),
    height: z.string(),
    weightMetricTons: z.string()
})
type FormData = z.infer<typeof formSchema>;
type FormFieldName = keyof FormData;
const formFields: { name: FormFieldName; label: string }[] = [
    { name: "customer", label: "Customer" },
    { name: "cargoSubType", label: "Cargo Subtype" },
    { name: "projectNumber", label: "Project Number" },
    { name: "barcode", label: "Barcode #" },
    { name: "length", label: "Length (M)" },
    { name: "packingListId", label: "Packing List ID" },
    { name: "cargoStatus", label: "Cargo Status" },
    { name: "voyage", label: "Voyage#" },
    { name: "guppyId", label: "Guppy ID" },
    { name: "height", label: "Height" },
    { name: "cargoType", label: "Cargo Type" },
    { name: "projectName", label: "Project Name" },
    { name: "cargoId", label: "Cargo ID" },
    { name: "remoraId", label: "Remora ID" },
    { name: "weightMetricTons", label: "Weight,Metric tons" },
];
const EditCargo: React.FC<EditCargoProps> = ({ onClose, cargo }) => {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
      })
    const progress = statusProgressMap[cargo.cargoStatus] ?? 0;
    const CargoStatus = cargo.cargoStatus === 'Origin';//return boolean
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customer: cargo.customer,
            packingListId: cargo.packingListId,
            cargoType: cargo.cargoType,
            cargoSubType: cargo.cargoSubType,
            cargoStatus: cargo.cargoStatus,
            projectName: cargo.projectName,
            projectNumber: cargo.projectNumber,
            voyage: cargo.voyage,
            cargoId: cargo.cargoId,
            barcode: cargo.barcode,
            guppyId: cargo.guppyId,
            remoraId: cargo.remoraId,
            length: cargo.length,
            height: cargo.height,
            weightMetricTons: cargo.weightMetricTons
        },
    });
    const onSubmit = (data: FormData) => {
        console.log(data);
    };
    return (
        <div className='edit_cargo_main_div'>
            <div className='edit_cargo_sub_div'>
                <div className='edit_cargo_progress_div'>
                    <div className='edit_cargo_name'>
                        <span>Cargo 333 :{cargo.cargoType} ss</span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progress}%` }}>
                            <div className="progress-text" style={{
                                color: CargoStatus ? 'black' : 'white',
                                alignItems: CargoStatus ? 'center' : 'normal',
                                justifyContent: CargoStatus ? 'end' : '',
                            }}
                            >
                                {cargo.cargoStatus}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='buttons_div'>
                    <Button variant='outline' onClick={onClose}>Cancel</Button>
                    <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
                </div>
            </div>
            <div className='edit_cargo_details_main_div'>
                <div className='edit_cargo_details_button_div'>
                    <Button variant='ghost' className='edit_cargo_assign_btn'>
                        <Link2 className='edit_cargo_details_link_icon' />
                        Assign to Voyage
                    </Button>
                    <Button variant='ghost' className='edit_cargo_delete_btn'>
                        <Trash2 className='edit_cargo_details_delete_icon' />
                        Delete
                    </Button>
                </div>
                <div className='edit_cargo_details_div'>
                    <Form {...form}>
                        <form>
                            {formFields.map(({ name, label }) => (
                                <div className='edit_cargo_details_label_input_div'>
                                    <div style={{paddingLeft:'1vw',width:'20vw'}}>
                                        <FormField
                                            control={form.control}
                                            name={name}
                                            render={() => (
                                                <FormItem>
                                                    <FormLabel className='edit_cargo_details_label'>{label}</FormLabel>
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
                                                    <Input {...field}  className='edit_cargo_details_input'/>
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
            <div className='edit_cargo_map_div'>
                <p>
                    Map
                </p>
            </div>
            <div className='edit_cargo_graph_calendar_div'>
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    // justifyContent:'space-evenly',
                    alignItems:'center'
                    }}
                >
                    <div style={{paddingLeft:'2%',paddingRight:'2%'}}>
                        <Button variant='ghost' style={{
                            color:'rgba(181, 187, 198, 1)',
                            fontSize:'14px',
                            fontWeight:'600',
                            }}
                        >
                            Temperature
                        </Button>
                        <Button variant='outline' style={{
                            color:'rgba(181, 187, 198, 1)',
                            fontSize:'14px',
                            fontWeight:'600',
                            }}
                        >
                            Acceleration
                        </Button>
                    </div>
                    <div>
                        <Popover>
                            <PopoverTrigger asChild style={{width:'100%'}}>
                                <Button
                                    id="date"
                                    variant={"outline"}
                                    // className={cn(
                                    //     "w-[250px] justify-start text-left font-normal",
                                    //     !date && "text-muted-foreground"
                                    // )}
                                    style={{
                                        backgroundColor:'rgba(255, 255, 255, 1)',
                                        border:'0.6px solid rgba(203, 213, 225, 1)',
                                        fontSize:'10px',
                                        fontWeight:'500',
                                        color:'rgba(102, 112, 133, 1)',
                                    }}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {format(date.from, "LLL dd, y")} -{" "}
                                                {format(date.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(date.from, "LLL dd, y")
                                        )
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                </Button>
                            </PopoverTrigger>
                            <div>
                                <PopoverContent data-side='bottom' style={{
                                    width:'fit-Content',
                                    padding:'0%',
                                    fontSize:'4px',
                                    transform: 'translate(-5%, -0%)'
                                    }}
                                >
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        defaultMonth={date?.from}
                                        selected={date}
                                        onSelect={setDate}
                                        numberOfMonths={2}
                                        style={{
                                            fontSize:'4px',
                                            padding:'0.5%',
                                            backgroundColor:'rgba(255, 255, 255, 1)',
                                            border:'0.3px solid rgba(228, 228, 231, 1)',
                                        }}
                                    />
                                </PopoverContent>
                            </div>
                        </Popover>
                    </div>
                </div>
                {/* <Graph /> */}
            </div>
        </div>
    )
}

export default EditCargo;