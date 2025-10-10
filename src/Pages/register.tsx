import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { MdMailOutline, MdLockOutline } from "react-icons/md";
interface UserData {
    email: string;
    password: string;
}
const schema = z.object({
    email: z.string().min(1, "Email is required").email("Email is invalid"),
    password:
        z.string()
            .min(8, "Password must be at least 8 characters long")
            .regex(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                "Password must contain at least one uppercase, one lowercase, one number, and one special character"
            ),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters long")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

type FormFields = z.infer<typeof schema>; // { email: string, password: string

const Register = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const newDate = Date.now();
        const exitUser = JSON.parse(localStorage.getItem('userEmail') || "[]");
        const usersArray = Array.isArray(exitUser) ? exitUser : [];
        const check = usersArray.some((e: UserData) => e.email === data.email);
        if (check) {
            setError('email', {
                message: "Email already exists please try again"
            })
        }
        else {
            const newUser = {
                id: newDate,
                email: data.email,
                password: data.password,
            }
            usersArray.push(newUser);
            localStorage.setItem("userEmail", JSON.stringify(usersArray));
            navigate("/login");
        }

    }

    return (
        <div className="flex items-center justify-center bg-[rgba(255,255,255,0.7)] rounded-md w-lg flex-col">
            <div className="mt-4 p-4 text-3xl">
                <p>Sign Up</p>
            </div>
            <form action="" className="flex flex-col w-full h-full p-6 gap-5" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email" className="flex flex-col gap-2 relative">Email
                    <MdMailOutline className="absolute top-9 left-3.5" />
                    <input
                        {...register("email")}
                        id="email"
                        type="text"
                        placeholder="Input your email"
                        className="border-black border rounded-full p-2 pl-9"
                    />
                    {errors.email && <div className="text-red-500">{errors.email.message}</div>}
                </label>
                <label htmlFor="password" className="flex flex-col gap-2 relative">Password
                    < MdLockOutline className="absolute top-9 left-3.5" />
                    <input
                        {...register("password")}
                        id='password'
                        type="password"
                        placeholder="Input your password"
                        className="border-black border rounded-full p-2 pl-9"
                    />
                    {errors.password && <div className="text-red-500">{errors.password.message}</div>}
                </label>
                <label htmlFor="password" className="flex flex-col gap-2 relative">Confirm Password
                    <MdLockOutline className="absolute top-9 left-3.5" />
                    <input
                        {...register("confirmPassword")}
                        id='confirmPassword'
                        type="password"
                        placeholder="Input your password again"
                        className="border-black border rounded-full p-2 pl-9"
                    />
                    {errors.confirmPassword && <div className="text-red-500">{errors.confirmPassword.message}</div>}
                </label>
                <button disabled={isSubmitting} className="border rounded-full mt-4 p-2 bg-cyan-400 text-white hover:bg-cyan-600 transition-colors duration-200">
                    {isSubmitting ? "Loading..." : "Sign Up"}
                </button>
            </form>
            <div className="p-3 mb-2">
                <p>
                    If you have an account you
                    <Link to="/login" className="text-cyan-500 underline ml-1">can login now</Link>
                </p>
            </div>
        </div>
    )
}

export default Register;