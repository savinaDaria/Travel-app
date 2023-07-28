
import styles from './styles.module.scss';
import heartSVG from '../../assets/images/heart.svg';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <span className={styles.footer__text}>
                from
                <a className={styles.footer__link} href="https://binary-studio.com">
                    binary studio
                </a>
                with
                <img className={styles.footer__icon} src={heartSVG} alt="heart" />
            </span>
        </footer>);
}

export {Footer};