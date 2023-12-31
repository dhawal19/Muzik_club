import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    useTheme
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
// import { Edit } from "@mui/icons-material";

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required")
});


const initialValuesLogin = {
    email: "",
    password: ""
};

const Form = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");


    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch("http://localhost:3500/login", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(values),
                credentials: "include"
            });
        const status = loggedInResponse.status;
        console.log(status);
        if(status === 400 || status === 401) {
            alert("Invalid email or password");
            return;
        }
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.foundUser,
                    token: loggedIn.accessToken
                })
            );
            navigate("/dash");
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        await login(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesLogin}
            validationSchema={loginSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4"},
                        }}
                    >
                        <TextField 
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 2"}}
                        /> 
                        <TextField 
                            label="Password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 2"}}
                        />
                    </Box>


                    {/* BUTTONS */}
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m:"2rem 0",
                                p:"1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": {
                                    backgroundColor: palette.primary.light
                                },

                            }}
                        >
                        LOGIN
                        </Button>
                        {/* <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.main
                                }
                            }}
                        >
                            {isLogin ? "Don't have an account? Sign Up here." : "Already have an account? Login here."}

                        </Typography> */}
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default Form;