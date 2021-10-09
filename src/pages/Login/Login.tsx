// Libraries
import axios from 'axios';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// Redux
import { login } from '@Features/user/redux';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Styles
import styles from './login.module.css';

const Login: FC<ChildrenNever> = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [formError, setFormError] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();

  // ToDo: Перенести в redux thunk
  async function handleLogin(): Promise<void> {
    setIsButtonDisabled(true);

    setFormError('');

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        username: getValues('username'),
        password: getValues('password'),
      }, {
        timeout: 5000,
        withCredentials: true,
      });

      if (res.data.error) {
        setFormError(res.data.error);
        setIsButtonDisabled(false);
        return;
      }

      dispatch(login({ username: getValues('username') }));

      history.push('/');
      window.location.reload();
    } catch (error) {
      setIsButtonDisabled(false);
      setFormError('Server error, try again later');
    }

    setIsButtonDisabled(false);
  }

  return (
    <div className={styles.wrapper}>
      <button type="button" onClick={() => history.push('/')} className={styles.closeBtn}>←</button>
      <form className={styles.loginForm} onSubmit={handleSubmit(handleLogin)}>
        <span
          className={`${styles.formErrorDefault} ${formError ? styles.formError : ''}`}
        >
          {formError || 'Error'}
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

export { Login };
