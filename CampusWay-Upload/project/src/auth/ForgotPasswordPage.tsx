import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MailCheck, Mail } from 'lucide-react';
import AuthShell from './AuthShell';
import { FormMessage } from './FormControls';
import { supabase } from '@/lib/supabase';

interface ForgotForm {
  email: string;
}

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotForm>();

  const onSubmit = async (values: ForgotForm) => {
    setServerError('');
    const { error } = await supabase.auth.resetPasswordForEmail(values.email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      setServerError(error.message);
      return;
    }
    setSent(true);
  };

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter the email you registered with and we'll send you a password reset link."
    >
      {sent ? (
        <div className="space-y-5 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-50">
            <MailCheck size={26} className="text-teal-600" />
          </span>
          <FormMessage kind="success">
            Reset link sent. Check your inbox — the link opens the password reset page.
          </FormMessage>
          <Link to="/login" className="block text-sm font-semibold text-teal-700 hover:underline">
            Back to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label htmlFor="forgot-email" className="text-sm font-semibold text-navy-900">Email</label>
            <input
              id="forgot-email"
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

          {serverError && <FormMessage kind="error">{serverError}</FormMessage>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:bg-navy-300"
          >
            <Mail size={16} />
            {isSubmitting ? 'Sending…' : 'Send Reset Link'}
          </button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-navy-500">
        Remembered it?{' '}
        <Link to="/login" className="font-semibold text-teal-700 hover:underline">Sign in</Link>
      </p>
    </AuthShell>
  );
}
