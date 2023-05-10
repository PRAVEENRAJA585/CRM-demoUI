import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFormContext, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import HelpIcon from '@mui/icons-material/Help';
import withReducer from 'app/store/withReducer';
import reducer from '../store';
import { getMyPassword, saveMyPassword } from '../store/myPasswordSlice';
import { selectMyPassword } from '../store/myPasswordSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMyProfile, selectMyProfile } from '../store/myProfileSlice';

const schema = yup.object().shape({
    name: yup.string().required('You must enter a name'),
});

function PasswordForm() {
    const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const { isValid, dirtyFields, errors } = formState;

    const form = watch();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const myPassword = useSelector(selectMyPassword);
    
    useEffect(() => {
        dispatch(getMyPassword(1));
    }, [dispatch]);

    const email = myPassword?.emailAddress

    function handleSavePassword() {
        const data = { ...getValues(), email };
        dispatch(saveMyPassword((data))).then(() => {
            navigate('/apps/profile/mypassword');
        });
    }

    return (
        <>
            <div className="ml-10 mt-20">
                <h1 className="text-2xl">
                    My Password <HelpIcon fontSize="small" color="disabled" />
                </h1>
                <h1 className="text-md" style={{ color: "gray" }}>
                    Change Your Password                </h1>
                <hr className="border-t-2 border-black-400 " />
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div className="text-md font-medium pt-20 flex"><div className='min-w-[15%] text-left mx-20	pt-20 relative  left-0'>Current Password </div> <div className=' text-left '>
                        <Controller
                            name="Email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-8"
                                    value={email}
                                    style={{ display: 'none' }}
                                />
                            )}

                        />
                        <Controller
                            name="Currentpassword"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-8"
                                    required
                                    autoFocus
                                    id="currentpassword"
                                    variant="outlined"
                                    size="small"
                                />
                            )}
                        />
                    </div>
                    </div>

                    <div className="text-md font-medium pt-20 flex"><div className='min-w-[15%] text-left mx-20	pt-20 relative  left-0'> New Password </div> <div className=' text-left '>
                        <Controller
                            name="NewPassword"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    required
                                    autoFocus
                                    id="NewPassword"
                                    variant="outlined"
                                    size="small"
                                />
                            )}

                        />
                    </div>
                    </div>
                    <div className="text-md font-medium pt-20 flex"><div className='min-w-[15%] text-left mx-20	pt-20 relative  left-0'> Confirm Password </div> <div className=' text-left '>
                        <Controller
                            name="ConfirmPassword"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-10"
                                    required
                                    autoFocus
                                    id="confirmPassword"
                                    variant="outlined"
                                    size="small"
                                />
                            )}
                        />
                    </div>
                    </div>
                    <div className='ml-20 pt-20'>
                <Button
                    className="ml-25 "
                    variant="contained"
                    color="secondary"
                    onClick={handleSavePassword}
                    style={{
                        WebkitAppearance: "button",
                        backgroundColor: "rgb(55, 48, 163)",
                        backgroundImage: "none",

                    }}
                >
                    Save
                </Button>

            </div>
                </Box></div >
            

        </>

    )
}

export default withReducer('profileApp', reducer)(PasswordForm);