'use client'
import Box from '@mui/material/Box'
import {
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeOffOutline, EyeOutline } from "mdi-material-ui";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { authOption } from "@/configs/next-auth-config";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

const ChangePasswordPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            newPassword:'',
            confirmPassword: '',
            submit: null
        },
        validationSchema: Yup.object({
            newPassword: Yup
                .string()
                .min(8, 'Password must be at least 8 characters')
                .max(100, 'Password must be at most 100 characters')
                .required('New Password is required'),
            confirmPassword: Yup
                .string()
                .min(8, 'Password must be at least 8 characters')
                .max(100, 'Password must be at most 100 characters')
                .required('Confirm Password is required'),
        }),
        onSubmit: async (values, helpers) => {
            const session = await getServerSession(authOption) as Session;
            const response = await signIn('change-password', {
                redirect: false,
                newPassword: values.newPassword,
                token: session.access_token
            }) as ResponseData

            if (!response.error){
                if (session?.admin) {
                    router.push('/admin');
                } else if (session?.manager) {
                    router.push('/manager');
                } else {
                    router.push('/');
                }
            } else {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: response.error });
                helpers.setSubmitting(false);
            }
        }
    });


    return (
        <Box className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Change Password</CardTitle>
                    <CardDescription>
                        Enter your new password below to change your account password.
                    </CardDescription>
                </CardHeader>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <CardContent className="grid gap-4">
                        {formik.errors.submit && (
                            <Typography color="error" sx={{ mt: 3 }} variant="body2">
                                {formik.errors.submit}
                            </Typography>
                        )}
                        <div className="grid gap-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <TextField
                                id="newPassword"
                                type={showPassword ? 'text' : 'password'}
                                name="newPassword"
                                error={!!(formik.touched.newPassword && formik.errors.newPassword)}
                                helperText={formik.touched.newPassword && formik.errors.newPassword}
                                onBlur={formik.handleBlur}
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position='end'>
                                            <IconButton
                                                edge='end'
                                                onClick={() => setShowPassword(!showPassword)}
                                                aria-label='toggle password visibility'
                                            >
                                                {showPassword ? <EyeOutline fontSize='small' /> :
                                                    <EyeOffOutline fontSize='small' />}
                                            </IconButton>
                                        </InputAdornment>
                                }}
                                fullWidth
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <TextField
                                id="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position='end'>
                                            <IconButton
                                                edge='end'
                                                onClick={() => setShowPassword(!showPassword)}
                                                aria-label='toggle password visibility'
                                            >
                                                {showPassword ? <EyeOutline fontSize='small' /> :
                                                    <EyeOffOutline fontSize='small' />}
                                            </IconButton>
                                        </InputAdornment>
                                }}
                                fullWidth
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit">
                            Change Password
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </Box>
    )
}


export default ChangePasswordPage
