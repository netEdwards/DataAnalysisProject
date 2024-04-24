import styles from './account.module.css';

const Account = () => {
    return (
        <div className={styles.main}>
            <div>
                <h1>Your Account: </h1>
                <p>Username: testuser</p>
                <p>Password: test</p>
            </div>
        </div>
    );
}

export default Account;