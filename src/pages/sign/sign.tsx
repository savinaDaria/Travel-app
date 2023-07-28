import styles from './styles.module.scss';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppRoute } from '../../enums/app-route.enum';
import { Password } from '../../enums/password.validate.enum';


const Sign = () => {

    const navigate = useNavigate();
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
    const handleSign = (e:React.MouseEvent<HTMLButtonElement>) => {        
        e.preventDefault();
        const form = e.currentTarget.form;
        if (form && form.reportValidity()){
            navigate(AppRoute.ROOT);
        }
    };

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
                            name="full-name"
                            type="text"
                            required
                        />
                    </label>)}
                <label className="input">
                    <span className="input__heading">Email</span>
                    <input data-test-id="auth-email" name="email" type="email" required />
                </label>
                <label className="input">
                    <span className="input__heading">Password</span>
                    <input
                        data-test-id="auth-password"
                        name="password"
                        type="password"
                        minLength={Password.MINLENGTH}
                        maxLength={Password.MAXLENGTH}
                        autoComplete="new-password"
                        required
                    />
                </label>
                <button data-test-id="auth-submit" className="button" type="submit" onClick={handleSign}>
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