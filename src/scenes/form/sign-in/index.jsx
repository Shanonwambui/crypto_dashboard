import React from "react";
import { useNavigate } from 'react-router-dom';
import {Box, Button, TextField} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { setUser } from "../../../redux/state/user/UserSlice";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";



const loginSchema = yup.object().shape({
    
    email: yup.string().email("invalid email").required("required"),
    
    password: yup.string().required("required"),
    
});


const SignInForm = () => {
    const isNonMobile =  useMediaQuery("(min-width: 600px)");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleFormSubmit = (values) => {
        dispatch(setUser(values)); // Dispatch the loginUser action
        navigate('/'); // Redirect to dashboard page
    }

    return(
    <Box p={isSmallScreen ? "10px" : "20px"} sx={{backgroundColor: colors.primary[400]}} marginTop="60px" height="100vh">
        <Header title="SIGN IN" subtitle="Sign in to your account"></Header>
        <Box sx={{backgroundColor: colors.primary[500], borderRadius: 2}} p="20px">
        <Formik
        onSubmit={handleFormSubmit}
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        >
            {({
                values,
                errors, 
                touched, 
                handleBlur, 
                handleChange, 
                handleSubmit,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box 
                    display="grid" 
                    gap="30px" 
                    gridTemplateColumns="repeat(4,minmax(0,1fr))"
                    sx={{
                        "& > div": {gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                    >
                        <TextField
                        fullWidth
                        variant="filled"
                        type="email"
                        label="Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        error={!!touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                        sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                        fullWidth
                        variant="filled"
                        type="password"
                        label="Password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        name="password"
                        error={!!touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                        sx={{ gridColumn: "span 4" }}
                        />
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt="20px">
                        <Link to="/form">
                            <Button color="secondary">Sign up</Button>
                        </Link>
                        <Button type="submit" color="secondary" variant="contained">
                            Sign In
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
        </Box>
        
    </Box>);
};

export default SignInForm;