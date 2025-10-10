import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { MdMailOutline, MdLockOutline } from "react-icons/md";

const schema = z.object({
    email: z.string().min(1, "Email is required").email("Email is invalid"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
})

type FormFields = z.infer<typeof schema>; // { email: string, password: string
interface UserData {
    email: string;
    password: string;
}
const Login = () => {
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
        const user = JSON.parse(localStorage.getItem("userEmail") || "[]");

        (user as UserData[]).forEach((element: UserData) => {
            if (data.email === element.email && data.password === element.password) {
                navigate("/todo");
            } else {
                setError('root', {
                    message: "Email or password is invalid. Please try again",
                })
            }
        });
    }

    return (
        <div className="flex items-center justify-center bg-[rgba(255,255,255,0.7)] rounded-md w-lg flex-col">
            <div className="mt-4 p-4 text-3xl">
                <p>Login</p>
            </div>
            <form action="" className="flex flex-col w-full h-full p-6 gap-5" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email" className="flex flex-col gap-2 relative">Email
                    <MdMailOutline className="absolute top-9 left-3.5" />
                    <input
                        {...register("email")}
                        id="email"
                        type="text"
                        placeholder="Input your email"
                        autoComplete="email"
                        className="border-black border rounded-full p-2 pl-9"
                    />
                    {errors.email && <div className="text-red-500">{errors.email.message}</div>}
                </label>
                <label htmlFor="password" className="flex flex-col gap-2 relative">Password
                    <MdLockOutline className="absolute top-9 left-3.5" />
                    <input
                        {...register("password")}
                        id='password'
                        type="password"
                        placeholder="Input your password"
                        className="border-black border rounded-full p-2 pl-9"
                    />
                    {errors.password && <div className="text-red-500">{errors.password.message}</div>}
                </label>
                <button disabled={isSubmitting} className="border rounded-full p-2 bg-cyan-400 text-white hover:bg-cyan-600 transition-colors duration-200">
                    {isSubmitting ? "Loading..." : "Login"}
                </button>
                {errors.root && <div className="text-red-500">{errors.root.message}</div>}
            </form>
            <div className="p-3 mb-2">
                <p>
                    If you don't have an account you
                    <Link to="/register" className="text-cyan-500 underline ml-1">can sign up now</Link>
                </p>
            </div>
        </div>
    )
}

export default Login;