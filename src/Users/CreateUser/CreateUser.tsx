import * as React from 'react';
import './CreateUser.css';
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
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { XIcon,ChevronDown } from "lucide-react";

const formSchema = z.object({
    firstName : z.string(),
    lastName : z.string(),
    email: z.string(),
    login : z.string(),
    password : z.string(),
    confirmPassword : z.string(),
    userRole : z.string(),
    jobTitle : z.string(),
    customers : z.string(),
    profilePic : z.string()
})
type FormData = z.infer<typeof formSchema>;

type FormFieldName = keyof FormData;
const formFields: { name: FormFieldName; label: string }[] = [
    { name : 'firstName',label:'First Name'},
    { name : 'lastName',label:'Last Name'},
    { name : 'email',label:'Email'},
    { name : 'login',label: 'Login'},
    { name : 'password',label:'Password'},
    { name : 'confirmPassword', label : 'Confirm Password'},
    { name : 'userRole', label : 'User Role'},
    { name : 'jobTitle', label : 'Job Title'},
    { name : 'customers', label : 'Customers'},
    { name : 'profilePic' ,label : 'Profile Pic'}
]
type Checked = DropdownMenuCheckboxItemProps["checked"];
interface CreateUserProps {
    onClose:() => void;
}
const userRoles = [
    'Truck Driver',
    'Surveyor',
    'Supervisor',
    'Stevedore',
    'HSE Professional',
    'Support'
]
const jobRoles = [
    'Administrator',
    'Inspector',
    'Carrier',
    'Report Viewer'
]

const CreateUser:React.FC<CreateUserProps> =({onClose}) =>{
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          firstName : '',
          lastName : '',
          email : '',
          login : '',
          password : '',
          confirmPassword : '',
          userRole : '',
          jobTitle : '',
          customers : '',
          profilePic : ''
        },
    });
    const [checkedItems, setCheckedItems] = React.useState<Record<string, Checked>>({
        'Truck Driver':false,
        'Surveyor':false,
        'Supervisor':false,
        'Stevedore':false,
        'HSE Professional':false,
        'Support' : false
    });
    const [JobRoles, setJobRoles] = React.useState<Record<string, Checked>>({
        'Administrator':false,
        'Inspector':false,
        'Carrier':false,
        'Report Viewer':false
    });
    const handleCheckedChange = (role: string, checked: Checked) => {
        const newCheckedItems = Object.keys(checkedItems).reduce((acc, key) => {
            acc[key] = key === role ? checked : false;
            return acc;
        }, {} as Record<string, Checked>);

        setCheckedItems(newCheckedItems);
        form.setValue('userRole', checked ? role : '');
    };
    const handleJobRoleChange = (jobrole: string, checked: Checked) => {
        const newCheckedItems = Object.keys(JobRoles).reduce((acc, key) => {
            acc[key] = key === jobrole ? checked : false;
            return acc;
        }, {} as Record<string, Checked>);

        setJobRoles(newCheckedItems);
        form.setValue('jobTitle', checked ? jobrole : '');
    };
    const onSubmit = (data: FormData) => {
        console.log(data);
    };
    return (
        <div className='create_user_main_div'>
            <Card style={{
                position:'absolute',
                top:'50%',
                left:'50%',
                transform:'translate(-50%,-50%)',
                width:'50vw',
                backgroundColor:'rgba(255, 255, 255, 1)',
                outline:'none',
                zIndex:'1000',
                border : '1px solid rgba(246, 246, 247, 1)'
                }}
            >
                <CardHeader style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    backgroundColor:'rgba(26, 41, 80, 1)',
                    color:'white',
                    alignItems:'center'
                    }}
                >
                    <CardTitle style={{fontSize : '15px'}}>Create User</CardTitle>
                    <XIcon onClick={onClose} style={{margin:'0px'}}/>
                </CardHeader>
                <CardContent style={{padding:'10px',maxHeight:'80vh',overflow:'auto'}}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            {formFields.map(({ name, label }) => (
                                <div className='create_user_label_input_div'>
                                    <div style={{display:'flex',flexDirection:'column',paddingLeft:'1vw',width:'20vw'}}>
                                        <FormField
                                            control={form.control}
                                            name={name}
                                            render={() => (
                                                <FormItem>
                                                    <FormLabel className='create_user_label'>{label}</FormLabel>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                                        <FormField
                                            control={form.control}
                                            name={name}
                                            render={({ field }) => (
                                                <FormItem>
                                                    {name==='profilePic' ?
                                                        <Input {...field} type='file' accept='.jpeg,.png' className='create_user_dp_input'/> 
                                                        : name === 'password' 
                                                        ?
                                                        <Input {...field} className='create_user_input' type='password'/>
                                                        : name === 'userRole'
                                                        ?
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger style={{width:'100%'}}>
                                                                <Button variant='outline' style={{
                                                                    display:'flex',
                                                                    flexDirection:'row',
                                                                    justifyContent:'space-between',
                                                                    alignItems:'center',
                                                                    width:'100%',
                                                                    padding: '2% 4%',
                                                                    border:'border: 1px solid rgba(203, 213, 225, 1);'
                                                                    }}
                                                                >
                                                                    <span style={{fontSize:'13px',color:'rgba(15, 23, 42, 1)',fontWeight:'400'}}>{field.value}</span>
                                                                    <ChevronDown style={{
                                                                        width:'20px',
                                                                        height:'17px',
                                                                        color:'1px solid rgba(77, 77, 77, 1)'
                                                                    }}/>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent style={{
                                                                zIndex:1000,
                                                                width:'32.5vw',
                                                                color:'rgba(102, 112, 133, 1)',
                                                                backgroundColor:'rgba(255, 255, 255, 1)'
                                                                }}
                                                            >
                                                                {userRoles.map((userRole) => (
                                                                    <DropdownMenuCheckboxItem style={{
                                                                        fontSize:checkedItems[userRole]?'13px':'10px',
                                                                        color:checkedItems[userRole] ? 'black' :'',
                                                                        fontWeight:checkedItems[userRole]?'400':'normal',
                                                                        }}
                                                                        key={userRole}
                                                                        checked={checkedItems[userRole]}
                                                                        onCheckedChange={(checked) => handleCheckedChange(userRole, checked)}
                                                                    >
                                                                        {userRole}
                                                                    </DropdownMenuCheckboxItem>
                                                                ))}
                                                            </DropdownMenuContent>
                                                        </DropdownMenu> 
                                                        : name === 'jobTitle'
                                                        ?
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger style={{width:'100%'}}>
                                                                <Button variant='outline' style={{
                                                                    display:'flex',
                                                                    flexDirection:'row',
                                                                    justifyContent:'space-between',
                                                                    alignItems:'center',
                                                                    width:'100%',
                                                                    padding: '2% 4%',
                                                                    border:'border: 1px solid rgba(203, 213, 225, 1);'
                                                                    }}
                                                                >
                                                                    <span style={{fontSize:'13px',color:'rgba(15, 23, 42, 1)',fontWeight:'400'}}>{field.value}</span>
                                                                    <ChevronDown style={{
                                                                        width:'20px',
                                                                        height:'17px',
                                                                        color:'1px solid rgba(77, 77, 77, 1)'
                                                                    }}/>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent style={{
                                                                zIndex:1000,
                                                                width:'32.5vw',
                                                                color:'rgba(102, 112, 133, 1)',
                                                                backgroundColor:'rgba(255, 255, 255, 1)'
                                                                }}
                                                            >
                                                                {jobRoles.map((jobRole) => (
                                                                    <DropdownMenuCheckboxItem style={{
                                                                        fontSize:checkedItems[jobRole]?'13px':'10px',
                                                                        color:checkedItems[jobRole] ? 'black' :'',
                                                                        fontWeight:checkedItems[jobRole]?'400':'normal',
                                                                        }}
                                                                        key={jobRole}
                                                                        checked={checkedItems[jobRole]}
                                                                        onCheckedChange={(checked) => handleJobRoleChange(jobRole, checked)}
                                                                    >
                                                                        {jobRole}
                                                                    </DropdownMenuCheckboxItem>
                                                                ))}
                                                            </DropdownMenuContent>
                                                        </DropdownMenu> 
                                                        :
                                                        <Input {...field}  className='create_user_input'/>
                                                    }
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            ))}
                            <div style={{display:'flex',flexDirection:'row',justifyContent:'end',marginTop:'2%'}}>
                                <Button variant='outline' onClick={onClose} style={{
                                    border:'0.7px solid rgba(226, 232, 240, 1)',
                                    padding:'1.5% 1.5%',
                                    marginRight:'2%'
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button style={{
                                    backgroundColor:'rgba(44, 57, 92, 1)',
                                    padding:'1.5% 1.5%'
                                    }}
                                >
                                    Create User
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <div className='create_user_bg_div' onClick={onClose}></div>
        </div>
    )
}

export default CreateUser;