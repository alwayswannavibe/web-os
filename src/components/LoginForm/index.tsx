// Libraries
import axios from 'axios';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// Redux
import { login } from 'src/features/user/redux';

// Styles
import styles from './loginform.module.css';

interface Props {
  children?: never;
}

const LoginForm: FC<Props> = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [formError, setFormError] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();

  const handleLogin = async () => {
    setIsButtonDisabled(true);

    setFormError('');

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        username: getValues('username'),
        password: getValues('password'),
      }, {
        timeout: 5000,
      });

      if (res.data.error) {
        setFormError(res.data.error);
        setIsButtonDisabled(false);
        return;
      }

      if (!res.data.access_token) {
        setIsButtonDisabled(false);
        return;
      }

      dispatch(login({ username: getValues('username') }));
      history.push('/');
    } catch (error) {
      setIsButtonDisabled(false);
      setFormError('Server error, try again later');
    }

    setIsButtonDisabled(false);
  };

  return (
    <div className={styles.wrapper}>
      <button type="button" onClick={() => history.push('/')} className={styles.closeBtn}>←</button>
      <form className={styles.loginForm} onSubmit={handleSubmit(handleLogin)}>
        <span
          className={`${styles.formErrorDefault} ${formError ? styles.formError : ''}`}
        >
          {formError || 'error'}
        </span>
        <label htmlFor="loginName" className={styles.label}>
          <span
            className={`${styles.inputErrorDefault} ${errors.username ? styles.inputError : ''}`}
          >
            {errors.username?.message || 'Error'}
          </span>
          <input
            type="text"
            id="loginName"
            placeholder="Username"
            className={errors.username ? styles.invalidInput : ''}
            onFocus={() => setFormError('')}
            {...register('username', {
              required: { value: true, message: 'You must fill this field' },
            })}
          />
        </label>
        <label htmlFor="loginPassword" className={styles.label}>
          <span
            className={`${styles.inputErrorDefault} ${errors.password ? styles.inputError : ''}`}
          >
            {errors.password?.message || 'Error'}
          </span>
          <input
            type="password"
            id="loginPassword"
            className={errors.password ? styles.invalidInput : ''}
            placeholder="Password"
            onFocus={() => setFormError('')}
            {...register('password', {
              required: { value: true, message: 'You must fill this field' },
            })}
          />
        </label>
        <div className={styles.btnContainer}>
          <button type="submit" className={styles.submit} disabled={isButtonDisabled}>
            Sign In
          </button>
        </div>
        <p className={styles.registration}>
          {'Don\'t have an account? '}
          <Link to="/registration">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export { LoginForm };
