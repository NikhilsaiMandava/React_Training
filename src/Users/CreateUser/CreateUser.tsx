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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

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
interface CreateUserProps {
    onClose:() => void;
}

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
                <CardContent style={{padding:'10px'}}>
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
                                                    <Input {...field}  className='create_user_input'/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            ))}
                            <div style={{display:'flex',flexDirection:'row',justifyContent:'end'}}>
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