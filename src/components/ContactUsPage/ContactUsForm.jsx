import React, { useEffect } from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';
import CountryCode from "../../data/countrycode.json"

const ContactUsForm = () => {
    const [loading,setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    } = useForm();

    
    const submitContactForm = async(data) => {
        // console.log("Logging the obtained data",data);
        try{
            setLoading(true);
            // const response = await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
            const response = await apiConnector(
                "POST",
                contactusEndpoint.CONTACT_US_API,
                data
            )
            console.log("Logging response: ",response);
            setLoading(false);
        }
        catch(error){
            console.log(error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        reset({
            email:"",
            firstname:"",
            lastname:"",
            message:"",
            phoneNo:"",
        })
    },[reset,isSubmitSuccessful,]);



  return (
    <form className="flex flex-col gap-7" onSubmit={handleSubmit(submitContactForm)}>
        <div className="flex flex-col gap-5 lg:flex-row"> 
            <div className="flex flex-col gap-2 lg:w-[48%]">
                {/* Firstname */}
            
                    <label htmlFor='firstname' className="lable-style">First Name</label>
                    <input
                        className="form-style"
                        type='text'
                        name='firstname'
                        id='firstname'
                        placeholder='Enter your First Name'
                        {...register("firstname",{required:true})}
                    />
                    {
                        errors.firstname && (
                            <span  className="-mt-1 text-[12px] text-yellow-100">
                                Please Enter your First Name
                            </span>
                        )
                    }
            </div>

            {/* LastName */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor='lastname' className="lable-style">Last Name</label>
                <input
                    className="form-style"
                    type='text'
                    name='lastname'
                    id='lastname'
                    placeholder='Enter your Last Name'
                    {...register("lastname")}
                />
            </div>
        </div>
            
            {/* Email */}
            <div className="flex flex-col gap-2">
                <label htmlFor='email' className="lable-style">Email</label>
                <input
                    className="form-style"
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter your Email'
                    {...register("email",{required:true})}
                />
                {
                    errors.firstname && (
                            <span lassName="-mt-1 text-[12px] text-yellow-100">
                                Please Enter your Email Address
                            </span>
                        )
                }
            </div>

            {/* Phone-Number */}
            <div className="flex flex-col gap-2">
                <label htmlFor="phonenumber" className="lable-style">
                Phone Number
                </label>

                <div className="flex gap-5">
                <div className="flex w-[81px] flex-col gap-2">
                    <select
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="Enter first name"
                    className="form-style"
                    {...register("countrycode", { required: true })}
                    >
                    {CountryCode.map((ele, i) => {
                        return (
                        <option key={i} value={ele.code}>
                            {ele.code} -{ele.country}
                        </option>
                        )
                    })}
                    </select>
                </div>
                <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                    <input
                    type="number"
                    name="phonenumber"
                    id="phonenumber"
                    placeholder="12345 67890"
                    className="form-style"
                    {...register("phoneNo", {
                        required: {
                        value: true,
                        message: "Please enter your Phone Number.",
                        },
                        maxLength: { value: 12, message: "Invalid Phone Number" },
                        minLength: { value: 10, message: "Invalid Phone Number" },
                    })}
                    />
                </div>
                </div>
                {errors.phoneNo && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                    {errors.phoneNo.message}
                </span>
                )}
            </div>
            
            {/* Message-Box */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="message" className="lable-style">Message</label>
                <textarea
                className="form-style"
                 name="message" 
                            id="message" 
                            cols={30} 
                            rows={7} 
                            placeholder='Enter your Message here'
                            {...register("message",{required:true})}
                />{
                    errors.message && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your Message.
                        </span>
                    )
                }
            </div>

            {/* Submit-Button */}
            <button
                disabled={loading}
                type="submit"
                className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                ${
                !loading &&
                "transition-all duration-200 hover:scale-95 hover:shadow-none"
                }  disabled:bg-richblack-500 sm:text-[16px] `}
            >
                Send Message
            </button>
       
    </form>
  )
}

export default ContactUsForm
