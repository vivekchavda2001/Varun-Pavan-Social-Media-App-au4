import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as Rlink } from "react-router-dom";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import "./signup.css";
import { Redirect } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function SignUp() {
    let securityQuestion = [
        "Which phone number do you remember most from your childhood?",
        "What was your favorite place to visit as a child?",
        "Who is your favorite actor, musician, or artist?",
        "What is the name of your favorite pet?",
        "In what city were you born?",
        "What high school did you attend?",
        "What is the name of your first school?",
        "What is your favorite movie?",
        "What is your mother's maiden name?",
        "What street did you grow up on?"
    ]
    const classes = useStyles();
    const [email, newEmail] = useState("");
    const [password, newPassword] = useState("");
    const [cpassword, cnewPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [alertText, updatedAlertText] = useState("");
    const [severity, newSeverity] = useState("");
    const [question, selectedQuestion] = useState("")
    const [answer, selectedAnswer] = useState("")

    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };
    let emailValidation =
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        ) || email.length < 6;
    let passwordValidation = !/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(
        password
    );
    let securityQuestionValudation = question.length > 0;
    let answerValidation = answer.trim().length < 3
    let cpasswordValidation = password === cpassword;
    let disable =
        !emailValidation &&
        !passwordValidation &&
        cpasswordValidation &&
        !answerValidation &&
        securityQuestionValudation
        ;

    const submitHandler = async () => {

        let securityAnswer = answer.trim().toLocaleLowerCase()
        let securityQuestion = question
        let isExists = await axios.post("http://localhost:3010/users/reset", {
            email,
            securityQuestion,
            securityAnswer,
            password
        });
        updatedAlertText(
            !isExists.data
                ? "Answer Doesn't Match"
                : "Password reset Successfull..! You will be redirected to the login page."
        );
        newSeverity(!isExists.data ? "error" : "success");
        if (!isExists.data) {
            return handleClick();
        }
        // await axios.put("http://localhost:3010/users/reset", {
        //     email,
        //     password,
        //     securityQuestion,
        //     securityAnswer
        // });
        handleClick();
        setTimeout(() => (window.location.href = "/login"), 7000);
    };
    if (localStorage.getItem('token')) {
        return <Redirect to='/home' />
    }
    return (
        <Container component="main" maxWidth="xs" className="mt-3 pb-3 signup">
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {alertText}
                </Alert>
            </Snackbar>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset Password
        </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => newEmail(e.target.value)}
                                error={emailValidation && email.length !== 0}
                                helperText={
                                    emailValidation && email.length !== 0
                                        ? "*Invalid Email"
                                        : null
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => newPassword(e.target.value)}
                                error={passwordValidation && password.length !== 0}
                                helperText={
                                    passwordValidation && password.length !== 0
                                        ? "*Password must contain one uppercase, one lowercase and a special character and must be of minimum 6 characters"
                                        : null
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Confirm password"
                                type="password"
                                id="cpassword"
                                autoComplete="current-password"
                                value={cpassword}
                                onChange={(e) => cnewPassword(e.target.value)}
                                error={!cpasswordValidation}
                                helperText={
                                    !cpasswordValidation ? "*Password doesn't match" : null
                                }
                            />
                        </Grid>
                        <Grid>
                            <FormControl required className={classes.formControl}>
                                <p>Security Question</p>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    value={question}
                                    onChange={(e) => selectedQuestion(e.target.value)}
                                    className={classes.selectEmpty}
                                >
                                    {securityQuestion.map((value, idx) => <MenuItem key={idx} value={value}>{value}</MenuItem>)}
                                </Select>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="answer"
                                name="answer"
                                variant="outlined"
                                required
                                fullWidth
                                id="answer"
                                label="Answer"
                                value={answer}
                                onChange={(e) => selectedAnswer(e.target.value)}
                                error={answer.length > 0 && answerValidation}
                                helperText={
                                    answer.length > 0 && answerValidation
                                        ? "*Answer must be of three or more characters"
                                        : null
                                }
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="button"
                        // fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={submitHandler}
                        disabled={!disable}
                    >
                        Reset
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Rlink to="/login" variant="body2">
                                Already have an account? Sign in
              </Rlink>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}