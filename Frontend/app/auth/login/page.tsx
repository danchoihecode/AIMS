'use client';

<<<<<<< HEAD
import Box from '@mui/material/Box'
import {
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment, Link, Radio, RadioGroup, Stack,
    TextField,
    Typography
} from "@mui/material";
import { Button, buttonVariants  } from "@/components/ui/button";
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

import {useRouter} from "next/navigation";
import {useState} from "react";
import {EyeOffOutline, EyeOutline} from "mdi-material-ui";
import { signIn } from "next-auth/react";
import {useFormik} from "formik";
=======
import Box from '@mui/material/Box';
import {
    Checkbox,
    IconButton,
    InputAdornment, Link, Stack,
    TextField,
    Typography,
    Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeOffOutline, EyeOutline } from "mdi-material-ui";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
import * as Yup from "yup";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [userType, setUserType] = useState("admin");
<<<<<<< HEAD
=======
    const [isSubmitting, setIsSubmitting] = useState(false);
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            submit: undefined
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .max(100)
                .email('Must be a valid email')
                .required('Email is required'),
            password: Yup
                .string()
                .max(100)
                .required('Password is required')
        }),
        onSubmit: async (values, helpers) => {
<<<<<<< HEAD
=======
            if (isSubmitting) return;

            setIsSubmitting(true);
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
            const response = await signIn('login', {
                redirect: false,
                email: values.email,
                password: values.password
            });

            if (response && !response.error) {
                const route = userType === "admin" ? "/admin" : "/manager";
                router.push(route);
            } else {
                const errorMessage = response?.error || 'Unexpected error';
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: errorMessage });
                helpers.setSubmitting(false);
            }
<<<<<<< HEAD
=======
            setIsSubmitting(false);
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
        }
    });

    return (
        <Box
<<<<<<< HEAD
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',

        }}>
           
            
=======
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
            <Box
                sx={{
                    padding: 4,
                    backgroundColor: '#ffffff',
                    borderRadius: 2,
                    boxShadow: 3,
                    border: '1px solid #ddd',
<<<<<<< HEAD

                }}
            >
            <form noValidate onSubmit={formik.handleSubmit} className="space-y-12 w-full sm:w-[400px]">
     
            <Typography variant="h5" sx={{ marginBottom: 3 }}>
                    Sign In
                </Typography>
                <Stack spacing={3} sx={{ minWidth: '43vh' }}>
                    {formik.errors.submit && (
                        <Typography
                            color="error"
                            sx={{ mt: 3 }}
                            variant="body2"
                        >
                            {formik.errors.submit}
                        </Typography>
                    )}
                    <TextField
                        fullWidth
                        label='Email'
                        sx={{ marginBottom: 4 }}
                        name='email'
                        error={!!(formik.touched.email && formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    
                    <TextField
                        fullWidth
                        label='Password'
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        edge='end'
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label='toggle password visibility'
                                    >
                                        {showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        name='password'
                        error={!!(formik.touched.password && formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="user-type-label">Login as</InputLabel>
                        <Select
                            labelId="user-type-label"
                            id="user-type"
                            name="user-type"
                            value={userType}
                            label="Login as"
                            onChange={(event) => setUserType(event.target.value)}
                        >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="manager">Manager</MenuItem>
                        </Select>
                    </FormControl>

                </Stack>

                <Box
                    sx={{
                        mb: 4,
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between'
                    }}
                >
                    <Box>
                        <Checkbox />Remember Me
                    </Box>
                    <Link className={buttonVariants({ variant: "outline" })}>Forgot password?</Link>

                </Box>
                <Button
                    className="w-full" size="lg" type="submit"
                >
                    Login
                </Button>

                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Typography variant='body2' sx={{ marginRight: 2 }}>
                        New on our platform?
                    </Typography>
                    <Typography variant='body2'>
                        <Link href='/auth/register'>
                            Create an account
                        </Link>
                    </Typography>
                </Box>
            </form>
            </Box>

=======
                }}
            >
                <form noValidate onSubmit={formik.handleSubmit} className="space-y-12 w-full sm:w-[400px]">
                    <Typography variant="h5" sx={{ marginBottom: 3 }}>
                        Sign In
                    </Typography>
                    <Stack spacing={3} sx={{ minWidth: '43vh' }}>
                        {formik.errors.submit && (
                            <Typography
                                color="error"
                                sx={{ mt: 3 }}
                                variant="body2"
                            >
                                {formik.errors.submit}
                            </Typography>
                        )}
                        <TextField
                            fullWidth
                            label='Email'
                            sx={{ marginBottom: 4 }}
                            name='email'
                            error={!!(formik.touched.email && formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            fullWidth
                            label='Password'
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            edge='end'
                                            onClick={() => setShowPassword(!showPassword)}
                                            aria-label='toggle password visibility'
                                        >
                                            {showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            name='password'
                            error={!!(formik.touched.password && formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="user-type-label">Login as</InputLabel>
                            <Select
                                labelId="user-type-label"
                                id="user-type"
                                name="user-type"
                                value={userType}
                                label="Login as"
                                onChange={(event) => setUserType(event.target.value)}
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="manager">Manager</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Box
                        sx={{
                            mb: 4,
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Box>
                            <Checkbox />Remember Me
                        </Box>
                        <Link className={buttonVariants({ variant: "outline" })}>Forgot password?</Link>
                    </Box>
                    <Button
                        className="w-full" size="lg" type="submit" disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Typography variant='body2' sx={{ marginRight: 2 }}>
                            New on our platform?
                        </Typography>
                        <Typography variant='body2'>
                            <Link href='/auth/register'>
                                Create an account
                            </Link>
                        </Typography>
                    </Box>
                </form>
            </Box>
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
        </Box>
    );
};

export default LoginPage;
