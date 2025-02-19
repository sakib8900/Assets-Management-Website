import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Lottie from 'lottie-react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';
import loginLottie from '../../assets/lootie/login.json';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const from = location.state?.from?.pathname || "/";
    
    const onSubmit = async (data) => {
        setIsLoading(true);
        
        try {
            const { email, password } = data;
            const result = await signIn(email, password);
            
            if (result.user) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            }
        } catch (error) {
            console.log('Login error:', error.code);
            
            if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
                Swal.fire({
                    icon: "error",
                    title: "User Not Found",
                    text: "No user found with this email address",
                });
            } else if (error.code === 'auth/wrong-password') {
                Swal.fire({
                    icon: "error",
                    title: "Invalid Password",
                    text: "The password you entered is incorrect",
                });
            }
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <div className="hero min-h-screen">
            <Helmet>
                <title>Asset Management || Login</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row-reverse gap-10">
                <div className="w-full md:w-1/2 mb-8 md:mb-0">
                    <Lottie 
                        animationData={loginLottie} 
                        loop={true} 
                        style={{ height: "300px", width: "300px" }} 
                    />
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input 
                                type="email" 
                                {...register("email", { 
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-blue-400" 
                                placeholder="email" 
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input 
                                type="password" 
                                {...register("password", { 
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-blue-400" 
                                placeholder="password" 
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        
                        <div className="form-control mt-6">
                            <button 
                                className={`items-center px-3 py-2 backdrop-blur-md text-blue-500 text-lg font-semibold rounded-lg 
                                             shadow-lg hover:bg-blue-500 hover:text-black border-2 border-blue-500 
                                             transition-all duration-300 hover:shadow-blue-500/50 
                                             active:scale-95 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;