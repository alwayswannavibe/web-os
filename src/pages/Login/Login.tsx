// Libraries
import axios from 'axios';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// Redux
import { login } from '@Features/user/redux';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Components
import { Button } from '@Components/Button/Button';

// Styles
import styles from './login.module.css';

const Login: FC<ChildrenNever> = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [formError, setFormError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

  function handleTooglePasswordVisible(): void {
    setIsPasswordVisible((value) => !value);
  }

  return (
    <div className={styles.wrapper}>
      <Button type="button" onClick={() => history.push('/')} className={styles.closeBtn}>←</Button>
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
          <div className={styles.inputBtnContainer}>
            <div className={styles.empty} />
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
            <div className={styles.empty} />
          </div>
        </label>
        <label htmlFor="loginPassword" className={styles.label}>
          <span
            className={`${styles.inputErrorDefault} ${errors.password ? styles.inputError : ''}`}
          >
            {errors.password?.message || 'Error'}
          </span>
          <div className={styles.inputBtnContainer}>
            <div className={styles.empty} />
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              id="loginPassword"
              className={errors.password ? styles.invalidInput : ''}
              placeholder="Password"
              onFocus={() => setFormError('')}
              {...register('password', {
                required: { value: true, message: 'You must fill this field' },
              })}
            />
            <Button type="button" className={styles.changePasswordVisibility} onClick={handleTooglePasswordVisible}>
              {isPasswordVisible ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </Button>
          </div>
        </label>
        <div className={styles.btnContainer}>
          <Button type="submit" disabled={isButtonDisabled} className={styles.signIn}>
            Sign In
          </Button>
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
