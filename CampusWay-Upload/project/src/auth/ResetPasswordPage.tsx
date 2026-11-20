import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { KeyRound } from 'lucide-react';
import AuthShell from './AuthShell';
import { PasswordInput, FormMessage } from './FormControls';
import { supabase } from '@/lib/supabase';

interface ResetForm {
  password: string;
  confirm: string;
}

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetForm>();

  const onSubmit = async (values: ResetForm) => {
    setServerError('');
    const { error } = await supabase.auth.updateUser({ password: values.password });
    if (error) {
      setServerError(
        error.message.includes('session')
          ? 'This reset link is invalid or has expired. Request a new one from the forgot-password page.'
          : error.message
      );
      return;
    }
    navigate('/login', { replace: true, state: { resetDone: true } });
  };

  return (
    <AuthShell
      title="Choose a new password"
      subtitle="Set a new password for your CampusWay account. You'll sign in with it right after."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <PasswordInput
          label="New password"
          autoComplete="new-password"
          placeholder="New password"
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

        <PasswordInput
          label="Confirm new password"
          autoComplete="new-password"
          placeholder="Repeat new password"
          error={errors.confirm?.message}
          {...register('confirm', {
            required: 'Please confirm your password.',
            validate: (v) => v === watch('password') || 'Passwords do not match.',
          })}
        />

        {serverError && <FormMessage kind="error">{serverError}</FormMessage>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:bg-navy-300"
        >
          <KeyRound size={16} />
          {isSubmitting ? 'Updating…' : 'Update Password'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-navy-500">
        Didn't get a link?{' '}
        <Link to="/forgot-password" className="font-semibold text-teal-700 hover:underline">Request a new one</Link>
      </p>
    </AuthShell>
  );
}
