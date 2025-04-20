import React, { useEffect } from 'react'
import InputField from '../shared/InputField'
import { useForm } from 'react-hook-form'
import { FaAddressCard } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { addUpdateUserAddress } from '../../store/actions'

const AddAddressForm = ({ address ,setOpenAddressModal }) => {

    const dispatch = useDispatch();
    const {btnLoader} = useSelector((state)=> state.errors)
    const{
            register,
            handleSubmit,
            setValue,
            reset,
            formState:{errors},
        } = useForm({
            mode:"onTouched"
        })

        const onSaveAddressHandler = async(data) => {
            dispatch(addUpdateUserAddress(
                data,
                toast,
                address?.addressId,
                setOpenAddressModal,
            ))};

        useEffect(()=>{
            if (address?.addressId) {
                setValue("buildingName",address?.buildingName);
                setValue("street",address?.street);
                setValue("city",address?.city);
                setValue("state",address?.state);
                setValue("pincode",address?.pincode);
                setValue("country",address?.country);
            }
        },[address])

  return (
     <div className=''>
            <form 
            onSubmit={handleSubmit(onSaveAddressHandler)}
            className=''>
                <div className='flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4'>
                    <FaAddressCard 
                    className='mr-2 text-2xl'/>
                {!address?.addressId ? "Add Address" : "Update Address" }
                </div>
                <div className=' flex flex-col gap-4'>
                    <InputField
                        label="Building Name"
                        required
                        id="buildingName"
                        type="text"
                        message="* Building Name is Required"
                        register={register}
                        errors={errors}
                        placeholder="Enter your Building Name"
                    />
                    <InputField
                        label="Street"
                        required
                        id="street"
                        type="text"
                        message="* Street is Required"
                        register={register}
                        errors={errors}
                        placeholder="Enter your Street"
                    />

                    
                    <InputField 
                        label="City"
                        required
                        id="city"
                        type="text"
                        message="* City is Required"
                        register={register}
                        errors={errors}
                        placeholder="Enter your City"
                    />

                    <InputField 
                        label="State"
                        required
                        id="state"
                        type="text"
                        message="* State is Required"
                        register={register}
                        errors={errors}
                        placeholder="Enter your State"
                    />
                    <InputField 
                        label="Pincode"
                        required
                        id="pincode"
                        type="text"
                        message="* Pincode is Required"
                        register={register}
                        errors={errors}
                        placeholder="Enter Pincode"
                        pattern={{
                            value: /^[1-9][0-9]{5}$/,
                            message: "* Enter a valid 6-digit Pincode"
                          }}
                    />
                    <InputField 
                        label="Country"
                        required
                        id="country"
                        type="text"
                        message="* Country is Required"
                        register={register}
                        errors={errors}
                        placeholder="Enter  Country"
                    />


                    <button
                    disabled={btnLoader}
                    className='text-white bg-customBlue px-4 py-2 rounded-md mt-4  '
                    type='submit'>
                    { btnLoader ? (
                      <div role="status">
                      <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-200 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg>
                      <span className="sr-only ">Loading...</span>
                        </div>
                    ):(
                        <>Save</>
                    )}
                    </button>
                </div>
            </form>
        </div>
  )
}

export default AddAddressForm
