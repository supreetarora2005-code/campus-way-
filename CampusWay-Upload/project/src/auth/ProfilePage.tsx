import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, ShieldCheck, Save, UserRound } from 'lucide-react';
import AuthShell from './AuthShell';
import { PasswordInput, FormMessage } from './FormControls';
import { useAuth } from './AuthContext';
import { supabase } from '@/lib/supabase';

interface ProfileForm {
  fullName: string;
  newPassword?: string;
}

export default function ProfilePage() {
  const { user, profile, isAdmin, loading, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle');
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>();

  useEffect(() => {
    if (!loading && !user) navigate('/login', { replace: true, state: { from: '/profile' } });
  }, [loading, user, navigate]);

  const onSubmit = async (values: ProfileForm) => {
    setStatus('idle');
    setServerError('');
    const { error } = await supabase.auth.updateUser({ data: { full_name: values.fullName.trim() } });
    if (error) {
      setServerError(error.message);
      setStatus('error');
      return;
    }
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ full_name: values.fullName.trim() })
      .eq('id', user!.id);
    if (profileError) {
      setServerError(profileError.message);
      setStatus('error');
      return;
    }
    await refreshProfile();
    setStatus('saved');
  };

  if (loading || !user) {
    return (
      <div className="page-shell flex min-h-[50vh] items-center justify-center py-16 text-sm text-navy-500">
        Loading your profile…
      </div>
    );
  }

  return (
    <AuthShell title="Your profile" subtitle="Manage your CampusWay account details.">
      <div className="space-y-6">
        <div className="flex items-center gap-4 rounded-2xl bg-navy-50 p-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-teal-400">
            <UserRound size={22} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-navy-900">{profile?.full_name || 'CampusWay user'}</p>
            <p className="truncate text-xs text-navy-500">{user.email}</p>
          </div>
        </div>

        {isAdmin && (
          <Link
            to="/admin"
            className="flex items-center gap-3 rounded-2xl bg-teal-50 p-4 ring-1 ring-teal-200 transition hover:bg-teal-100"
          >
            <ShieldCheck size={20} className="text-teal-700" />
            <div>
              <p className="text-sm font-bold text-teal-900">Administrator</p>
              <p className="text-xs text-teal-700">Open the admin dashboard to manage campus data</p>
            </div>
          </Link>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label htmlFor="profile-name" className="text-sm font-semibold text-navy-900">Full name</label>
            <input
              id="profile-name"
              autoComplete="name"
              className="input-field mt-1.5"
              defaultValue={profile?.full_name ?? ''}
              placeholder="Your name"
              {...register('fullName', { required: 'Please enter your name.' })}
            />
            {errors.fullName && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.fullName.message}</p>}
          </div>

          <PasswordInput
            label="New password (optional)"
            autoComplete="new-password"
            placeholder="Leave blank to keep current password"
            {...register('newPassword', {
              validate: (v) => {
                if (!v) return true;
                if (v.length < 8) return 'Must be at least 8 characters.';
                if (!(/[A-Z]/.test(v) && /[a-z]/.test(v) && /\d/.test(v)))
                  return 'Needs an uppercase letter, a lowercase letter and a number.';
                return true;
              },
            })}
          />

          {status === 'saved' && <FormMessage kind="success">Your profile has been updated.</FormMessage>}
          {serverError && <FormMessage kind="error">{serverError}</FormMessage>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:bg-navy-300"
          >
            <Save size={16} />
            {isSubmitting ? 'Saving…' : 'Save Changes'}
          </button>
        </form>

        <button
          onClick={async () => {
            await signOut();
            navigate('/', { replace: true });
          }}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-navy-200 py-3.5 text-sm font-semibold text-navy-800 transition hover:bg-navy-50"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </AuthShell>
  );
}
