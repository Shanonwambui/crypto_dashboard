import React from "react";
import { useNavigate } from 'react-router-dom';
import {Box, Button, TextField} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { setUser } from "../../redux/state/user/UserSlice";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    country: "",
    password: "",
    
};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


const userSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup.string().matches(phoneRegExp, "Phone number is not valid").required("required"),
    country: yup.string().required("required"),
    password: yup.string().required("required"),
    
});

const Form = () => {
    const isNonMobile =  useMediaQuery("(min-width: 600px)");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleFormSubmit = (values) => {
        dispatch(setUser(values)); // Dispatch the setUser action
        navigate('/'); // Redirect to dashboard page
    }
    return(
    <Box p={isSmallScreen ? "10px" : "20px"} sx={{backgroundColor: colors.primary[400]}} marginTop="60px" height="100vh">
        <Header title="CREATE USER" subtitle="Create a New User Profile "></Header>
        <Box sx={{backgroundColor: colors.primary[500], borderRadius: 2}} p="20px">
        <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
        
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
                    
                    borderRadius= "4px"
                    sx={{
                        "& > div": {gridColumn: isNonMobile ? undefined : "span 4" },
                        backgroundColor: colors.primary[500],
                    }}
                    >
                        <TextField 
                        fullWidth
                        variant="filled"
                        type="text"
                        label="First Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        name="firstName"
                        error={!!touched.firstName && !!errors.firstName}
                        helperText={touched.firstName && errors.firstName}
                        sx={{gridColumn: "span 2"}}

                        />
                        <TextField 
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Last Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        name="lastName"
                        error={!!touched.lastName && !!errors.lastName}
                        helperText={touched.lastName && errors.lastName}
                        sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                        fullWidth
                        variant="filled"
                        type="text"
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
                        type="text"
                        label="Contact Number"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.contact}
                        name="contact"
                        error={!!touched.contact && !!errors.contact}
                        helperText={touched.contact && errors.contact}
                        sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Country"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address1}
                        name="country"
                        error={!!touched.address1 && !!errors.address1}
                        helperText={touched.address1 && errors.address1}
                        sx={{ gridColumn: "span 4" }}
                        />
                         <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address1}
                        name="password"
                        error={!!touched.address1 && !!errors.address1}
                        helperText={touched.address1 && errors.address1}
                        sx={{ gridColumn: "span 4" }}
                        />
                    
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt="20px">
                    <Link to="/Sign-in">
                        <Button color="secondary">Sign in</Button>
                    </Link>
                        <Button type="submit" color="secondary" variant="contained">
                            Create New User
                        </Button>
                    </Box>

                </form>
            )}
        </Formik>


        </Box>
        
    </Box>);
};

export default Form;