// Libraries
import { FC, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Assets
import space from '@Backgrounds/space.webp';

// Types
import { RootState } from '@Types/rootState.type';

// Redux
import { registration } from '@Features/user/redux';

// Components
import { Button } from '@Components/Button/Button';

// Styles
import styles from './registration.module.css';

const Registration: FC<ChildrenNever> = () => {
  const [formError, setFormError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const registrationError = useSelector((state: RootState) => state.user.registrationError);
  const isRegistrationLoading = useSelector((state: RootState) => state.user.isRegistrationLoading);

  const history = useHistory();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    setFormError(registrationError);
  }, [registrationError]);

  function handleTooglePasswordVisible(): void {
    setIsPasswordVisible((value) => !value);
  }

  function handleTooglePasswordVisible2(): void {
    setIsPasswordVisible2((value) => !value);
  }

  function handleRegistration(): void {
    dispatch(registration({
      username: getValues('username'),
      password: getValues('password'),
    }));
  }

  return (
    <>
      <div className={styles.overlay} style={{ backgroundImage: `url(${space})` }} />
      <div className={styles.wrapper}>
        <Button type="button" onClick={() => history.push('/')} className={styles.closeBtn}>←</Button>
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
            <div className={styles.inputBtnContainer}>
              <div className={styles.empty} />
              <input
                type="text"
                id="loginName"
                placeholder="Username"
                className={errors.username ? styles.invalidInput : ''}
                onFocus={() => setFormError('')}
                {...register('username', {
                  required: {
                    value: true,
                    message: 'You must fill this field',
                  },
                  pattern: {
                    value: /^[A-z0-9_-]+$/,
                    message: 'Username must contain only letters, numbers, dash and underscore',
                  },
                  minLength: {
                    value: 5,
                    message: 'Username must be at least 5 characters',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Username must be no more then 20 characters',
                  },
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
                  required: {
                    value: true,
                    message: 'You must fill this field',
                  },
                  minLength: {
                    value: 5,
                    message: 'Password must be at least 5 characters',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Password must be no more then 20 characters',
                  },
                })}
              />
              <Button type="button" className={styles.changePasswordVisibility} onClick={handleTooglePasswordVisible}>
                {isPasswordVisible ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
              </Button>
            </div>
          </label>
          <label htmlFor="loginPassword" className={styles.label}>
            <span
              className={`${styles.inputErrorDefault} ${errors.passwordConfirmation ? styles.inputError : ''}`}
            >
              {errors.passwordConfirmation?.message || 'Error'}
            </span>
            <div className={styles.inputBtnContainer}>
              <div className={styles.empty} />
              <input
                type={isPasswordVisible2 ? 'text' : 'password'}
                id="loginPasswordConfirmation"
                className={errors.passwordConfirmation ? styles.invalidInput : ''}
                placeholder="Password confirmation"
                onFocus={() => setFormError('')}
                {...register('passwordConfirmation', {
                  validate: (value) => value === getValues('password') || 'Passwords should be equals',
                })}
              />
              <Button type="button" className={styles.changePasswordVisibility} onClick={handleTooglePasswordVisible2}>
                {isPasswordVisible2 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
              </Button>
            </div>
          </label>
          <div className={styles.btnContainer}>
            <Button type="submit" className={styles.signIn} disabled={isRegistrationLoading}>
              Sign Up
            </Button>
          </div>
          <p className={styles.registration}>
            {'Already have an account? '}
            <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export { Registration };
