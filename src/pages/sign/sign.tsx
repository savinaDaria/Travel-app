import styles from './styles.module.scss';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppRoute } from '../../constants/enums/app-route.enum';
import { Password } from '../../constants/enums/password.validate.enum';
import { toast } from 'react-toastify'
import { setUser } from '../../slices/auth.slice';
import { useSignInUserMutation } from '../../slices/api.slice';
import { useSignUpUserMutation } from '../../slices/api.slice';
import { useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';

const Sign = () => {
    const [formInputValues, setFormValue] = useState({
        email:"",
        password:"",
        fullname:""
    });
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const { pathname } = useLocation();
    const { signMethod, linkToSign, question, isSignUp,questionMethod,signMethodWithFirstCapital } = pathname === AppRoute.SIGNIN ?
        {
            signMethod: 'in',
            signMethodWithFirstCapital: 'In',
            linkToSign: AppRoute.SIGNUP,
            question: "Don't have an account?",
            questionMethod: 'up',
            isSignUp: false
        } :
        {
            signMethod: 'up',
            signMethodWithFirstCapital: 'Up',
            linkToSign: AppRoute.SIGNIN,
            question: "Already have an account?",            
            questionMethod: 'in',
            isSignUp: true
        }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValue({ ...formInputValues, [e.target.name]: e.target.value })
    };
    const handleSign = async (e:React.MouseEvent<HTMLButtonElement>) => {        
        e.preventDefault();
        const form=e.currentTarget.form;
        if (form && form.reportValidity()){
            if(signMethod==='in')await signInUser({email:formInputValues.email, password:formInputValues.password});
            else if(signMethod==='up')await signUpUser({fullName:formInputValues.fullname,email:formInputValues.email, password:formInputValues.password});
        }
        else{
            toast.error(`Please fill all input fields to sign ${signMethod}`)
        }
    };
    const [
        signInUser,
        {
            data,
            isSuccess,
            isError,
            error
        },
    ] = useSignInUserMutation()

    const [
        signUpUser,
        {
            data: signUpData,
            isSuccess:isSignUpSuccess,
            isError: isSignUpError
        },
    ] = useSignUpUserMutation()
    useEffect(() => {
        if (isSuccess) {
            toast.success('User signed in successfully')
            dispatch(
                setUser({
                    id: data.user.id,
                    fullName: data.user.fullName,
                    email: data.user.email,
                    createdAt: data.user.createdAt,
                    token: data.token,
                })
            )
            navigate('/')
        }
        if (isError) {
            toast.error('There was an error while signing in')
        }
    }, [isSuccess, isError])
    useEffect(() => {
        if (isSignUpSuccess) {
            toast.success('User signed up successfully')
            dispatch(
                setUser({
                    id: signUpData.user.id,
                    fullName: signUpData.user.fullName,
                    email: signUpData.user.email,
                    createdAt: signUpData.user.createdAt,
                    token: signUpData.token,
                })
            )
            navigate('/')
        }
        if (isError) {
            toast.error('There was an error while signing up')
        }
    }, [isSignUpSuccess, isSignUpError])
    return (
        <main className={styles[`sign-${signMethod}-page`]}>
            <h1 className="visually-hidden">Travel App</h1>
            <form className={styles[`sign-${signMethod}-form`]} autoComplete="off">
                <h2 className={styles[`sign-${signMethod}-form__title`]}>Sign {signMethodWithFirstCapital}</h2>
                {isSignUp && (
                    <label className="input">
                        <span className="input__heading">Full name</span>
                        <input
                            data-test-id="auth-full-name"
                            name="fullname"
                            value={formInputValues.fullname}
                            type="text"
                            onChange={handleInputChange}
                            required
                        />
                    </label>)}
                <label className="input">
                    <span className="input__heading">Email</span>
                    <input 
                    data-test-id="auth-email" 
                    name="email" 
                    type="email"                     
                    value={formInputValues.email}
                    onChange={handleInputChange}
                    required />
                </label>
                <label className="input">
                    <span className="input__heading">Password</span>
                    <input
                        data-test-id="auth-password"
                        name="password"
                        type="password"                        
                        value={formInputValues.password}
                        minLength={Password.MINLENGTH}
                        maxLength={Password.MAXLENGTH}
                        autoComplete="new-password"
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <button data-test-id="auth-submit" className="button" type="submit" onClick={handleSign} >
                    Sign {signMethodWithFirstCapital}
                </button>
            </form>
            <span>
                {question}
                <Link
                    data-test-id={`auth-sign-${signMethod}-link`}
                    to={linkToSign}
                    className={styles[`sign-${signMethod}-form__link`]}
                >
                    Sign {questionMethod}
                </Link>
            </span>
        </main>
    );
}

export { Sign };