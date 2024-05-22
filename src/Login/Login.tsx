import LoginLogo from '../assets/login_logo.png';
import LoginTitle from '../assets/login_title.png';
import '../Login/Login.css';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import { LockIcon } from "lucide-react"



const formSchema = z.object({
    email: z.string().min(8,{
        message:"Invalid Email entered"
    }),
    password : z.string().min(6,{
        message : "Password should be at least 6 characters",
    })
})
type FormData = z.infer<typeof formSchema>;

function Login() {
    const navigate =useNavigate();
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: '',
          password: '',
        },
    });
    const onSubmit = (data: FormData) => {
        console.log(data);
        navigate('/dashboard/map');
    };
    return (
        <>
            <div className="login_main_div">
                <div className="login_bg_div">
                    <div className='login_image_div'>
                        <div className="login_background_color_div">
                            <div className='login_logo_div'>
                                <img src={LoginLogo} alt="error while importing" style={{width:'300px'}}></img>
                                <br />
                                <br />
                                <img src={LoginTitle} alt="error while importing"></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='login_form_div'>
                    <div className = 'login_form_bg_div'>
                        <div className='login_form_card'>
                            <div className="login_title_description">
                                <span className='sigin_title'>Sign In</span>
                                <br />
                                <span className='signin_description'>Enter your login details to access your account</span>
                                <br />
                                <br />
                            </div>
                            <div className='login_form_component'>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="johndoe@gmail.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='password'
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder='***********' {...field} type='password'/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className='form_submit_btn'>
                                            <LockIcon size='18px' style={{marginRight : '15px'}}/>Login
                                        </Button>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;