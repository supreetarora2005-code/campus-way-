import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import AuthShell from './AuthShell';
import { PasswordInput, FormMessage } from './FormControls';
import { supabase } from '@/lib/supabase';

interface SignupForm {
  fullName: string;
  email: string;
  password: string;
  confirm: string;
}

const PASSWORD_RULES = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { label: 'One number', test: (p: string) => /\d/.test(p) },
];

export default function SignupPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>();

  const password = watch('password', '');

  const onSubmit = async (values: SignupForm) => {
    setServerError('');
    const { data, error } = await supabase.auth.signUp({
      email: values.email.trim(),
      password: values.password,
      options: {
        data: { full_name: values.fullName.trim() },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });
    if (error) {
      setServerError(
        error.message.includes('already registered')
          ? 'An account with this email already exists. Try signing in instead.'
          : error.message
      );
      return;
    }
    if (data.session) {
      navigate('/', { replace: true });
    } else {
      setEmailSent(true);
    }
  };

  if (emailSent) {
    return (
      <AuthShell
        title="Confirm your email"
        subtitle="We've sent a confirmation link to your email address. Click it to activate your account, then sign in."
      >
        <Link
          to="/login"
          className="inline-flex w-full items-center justify-center rounded-xl bg-teal-500 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-600"
        >
          Go to Sign In
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Register with your email to get the most out of CampusWay. Browsing the campus never requires an account."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <label htmlFor="signup-name" className="text-sm font-semibold text-navy-900">Full name</label>
          <input
            id="signup-name"
            autoComplete="name"
            className="input-field mt-1.5"
            placeholder="Your name"
            {...register('fullName', { required: 'Please enter your name.' })}
          />
          {errors.fullName && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.fullName.message}</p>}
        </div>

        <div>
          <label htmlFor="signup-email" className="text-sm font-semibold text-navy-900">Email</label>
          <input
            id="signup-email"
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
          autoComplete="new-password"
          placeholder="Create a password"
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required.',
            validate: {
              length: (v) => v.length >= 8 || 'Must be at least 8 characters.',
              strong: (v) =>
                (/[A-Z]/.test(v) && /[a-z]/.test(v) && /\d/.test(v)) ||
                'Needs an uppercase letter, a lowercase letter and a number.',
            },
          })}
        />

        <ul className="grid grid-cols-2 gap-1 text-xs text-navy-500">
          {PASSWORD_RULES.map(({ label, test }) => (
            <li key={label} className={`flex items-center gap-1.5 ${test(password) ? 'text-teal-700' : ''}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${test(password) ? 'bg-teal-500' : 'bg-navy-300'}`} />
              {label}
            </li>
          ))}
        </ul>

        <PasswordInput
          label="Confirm password"
          autoComplete="new-password"
          placeholder="Repeat your password"
          error={errors.confirm?.message}
          {...register('confirm', {
            required: 'Please confirm your password.',
            validate: (v) => v === password || 'Passwords do not match.',
          })}
        />

        {serverError && <FormMessage kind="error">{serverError}</FormMessage>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:bg-navy-300"
        >
          <UserPlus size={16} />
          {isSubmitting ? 'Creating account…' : 'Create Account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-navy-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-teal-700 hover:underline">Sign in</Link>
      </p>
    </AuthShell>
  );
}
