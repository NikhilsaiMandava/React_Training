import * as React from 'react';
import './EditCargo.css';
import { Button } from '@/components/ui/button';
import { Link2, Trash2 } from 'lucide-react';
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

const EditCargo: React.FC<EditCargoProps> = ({ onClose, cargo }) => {
    const progress = statusProgressMap[cargo.cargoStatus] ?? 0;
    const CargoStatus = cargo.cargoStatus === 'Origin';//return boolean
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customer: cargo.customer,
            packingListId: cargo.packingListId,
            cargoType: cargo.cargoType ,
            cargoSubType: cargo.cargoSubType ,
            cargoStatus: cargo.cargoStatus ,
            projectName: cargo.projectName ,
            projectNumber: cargo.projectNumber ,
            voyage: cargo.voyage ,
            cargoId: cargo.cargoId ,
            barcode: cargo.barcode ,
            guppyId: cargo.guppyId ,
            remoraId: cargo.remoraId ,
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
                    <Button>Save</Button>
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
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div style={{display:'flex',
                                flexDirection:'row'
                            }}>
                                <div className='edit_cargo_details_label_div'>
                                    <FormField
                                        control={form.control}
                                        name="customer"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Customer</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="cargoSubType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Cargo Subtype</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="projectNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Project Number</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="barcode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Barcode #</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="length"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Length(M)</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="packingListId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Packing List ID</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="cargoStatus"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Cargo Status</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="voyage"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Voyage#</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="guppyId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Guppy ID</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="height"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Height</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="cargoType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Cargo Type</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="projectName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Project Name</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="cargoId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Cargo ID</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="remoraId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Remora ID</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="weightMetricTons"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Weight,Metric tons</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='edit_cargo_details_input_div'>
                                    <FormField
                                        control={form.control}
                                        name="customer"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Input {...field}/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="cargoSubType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Input {...field}/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="projectNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Input {...field}/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="barcode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Input {...field}/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="length"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Input {...field}/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="packingListId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Input {...field}/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="cargoStatus"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Input {...field}/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="voyage"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Input {...field}/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="guppyId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Input {...field}/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="height"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Input {...field}/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="cargoType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Input {...field}/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="projectName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Input {...field}/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="cargoId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Input {...field}/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="remoraId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Input {...field}/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="weightMetricTons"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Input {...field}/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default EditCargo;