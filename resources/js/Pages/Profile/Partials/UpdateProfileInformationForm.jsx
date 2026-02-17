import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;
    const flash = usePage().props.flash;

    const [localPreview, setLocalPreview] = useState(null);
    const previewUrl = useMemo(() => {
        if (localPreview) return localPreview;
        return user?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name ?? 'User')}&background=ef4444&color=fff&bold=true&size=160`;
    }, [localPreview, user?.avatar_url, user?.name]);

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            _method: 'patch',
            name: user.name,
            email: user.email,
            avatar: null,
        });

    const submit = (e) => {
        e.preventDefault();

        post(route('profile.update'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    Update your account details and profile photo.
                </p>
            </header>

            {flash?.success ? (
                <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800 dark:border-green-900/40 dark:bg-green-900/20 dark:text-green-200">
                    {flash.success}
                </div>
            ) : null}

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 overflow-hidden rounded-2xl ring-2 ring-white shadow-sm dark:ring-slate-900">
                            <img src={previewUrl} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div>
                            <div className="text-sm font-black text-slate-900 dark:text-white">Profile Photo</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">PNG/JPG/WebP up to 5MB</div>
                        </div>
                    </div>
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0] ?? null;
                                setData('avatar', file);
                                if (file) {
                                    setLocalPreview(URL.createObjectURL(file));
                                } else {
                                    setLocalPreview(null);
                                }
                            }}
                            className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-full file:border-0 file:bg-primary-50 file:px-6 file:py-2.5 file:text-sm file:font-black file:text-primary-700 hover:file:bg-primary-100 dark:text-slate-300 dark:file:bg-primary-900/30"
                        />
                        <InputError className="mt-2" message={errors.avatar} />
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-2 block w-full rounded-2xl border-slate-200 shadow-sm focus:border-primary focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-2 block w-full rounded-2xl border-slate-200 shadow-sm focus:border-primary focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-1 rounded-md text-sm font-bold text-primary underline hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-bold text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
