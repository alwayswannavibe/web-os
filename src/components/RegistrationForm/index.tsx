// Redux
import { FC, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

// Redux
import { login } from 'src/features/user/redux';

// Styles
import styles from '../LoginForm/loginform.module.css';

interface Props {
  children?: never;
}

const RegistrationForm: FC<Props> = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [formError, setFormError] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, getValues } = useForm({
    mode: 'onBlur',
  });

  const handleRegistration = async () => {
    setIsButtonDisabled(true);

    setFormError('');

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
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

      await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        username: getValues('username'),
        password: getValues('password'),
      }, {
        timeout: 5000,
      });

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
      <form className={styles.loginForm} onSubmit={handleSubmit(handleRegistration)}>
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
              pattern: { value: /^[A-z0-9_-]+$/, message: 'Username must contain only letters, numbers, dash and underscore' },
              minLength: { value: 5, message: 'Username must be at least 5 characters' },
              maxLength: { value: 20, message: 'Username must be no more then 20 characters' },
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
              minLength: { value: 5, message: 'Password must be at least 5 characters' },
              maxLength: { value: 20, message: 'Password must be no more then 20 characters' },
            })}
          />
        </label>
        <label htmlFor="loginPassword" className={styles.label}>
          <span
            className={`${styles.inputErrorDefault} ${errors.passwordConfirmation ? styles.inputError : ''}`}
          >
            {errors.passwordConfirmation?.message || 'Error'}
          </span>
          <input
            type="password"
            id="loginPasswordConfirmation"
            className={errors.passwordConfirmation ? styles.invalidInput : ''}
            placeholder="Password confirmation"
            onFocus={() => setFormError('')}
            {...register('passwordConfirmation', {
              validate: (value) => value === getValues('password') || 'Passwords should be equals',
            })}
          />
        </label>
        <div>
          <div className={styles.btnContainer}>
            <button type="submit" className={styles.submit} disabled={isButtonDisabled}>
              Sign Up
            </button>
          </div>
          <p className={styles.registration}>
            {'Already have an account? '}
            <Link to="/login">Sign In</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export { RegistrationForm };
