import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import AuthShell from './AuthShell';
import { PasswordInput, FormMessage } from './FormControls';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshProfile } = useAuth();
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (values: LoginForm) => {
    setServerError('');
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email.trim(),
      password: values.password,
    });
    if (error) {
      setServerError(
        error.message === 'Invalid login credentials'
          ? 'Incorrect email or password. Please try again.'
          : error.message
      );
      return;
    }
    await refreshProfile();
    const from = (location.state as { from?: string } | null)?.from ?? '/';
    navigate(from, { replace: true });
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your CampusWay account to manage your profile and save your campus preferences."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <label htmlFor="login-email" className="text-sm font-semibold text-navy-900">Email</label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            className="input-field mt-1.5"
            placeholder="you@rnsit.ac.in"
            {...register('email', {
              required: 'Email is required.',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address.' },
            })}
          />
          {errors.email && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.email.message}</p>}
        </div>

        <PasswordInput
          label="Password"
          autoComplete="current-password"
          placeholder="Your password"
          error={errors.password?.message}
          {...register('password', { required: 'Password is required.' })}
        />

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs font-semibold text-teal-700 hover:underline">
            Forgot password?
          </Link>
        </div>

        {serverError && <FormMessage kind="error">{serverError}</FormMessage>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:bg-navy-300"
        >
          <LogIn size={16} />
          {isSubmitting ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-navy-500">
        New to CampusWay?{' '}
        <Link to="/signup" className="font-semibold text-teal-700 hover:underline">Create an account</Link>
      </p>
    </AuthShell>
  );
}
