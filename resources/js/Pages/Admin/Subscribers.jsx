import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Dialog, Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Fragment, useMemo, useState } from 'react';

function GIcon({ name, className = 'text-[18px]' }) {
    return (
        <span className={`material-symbols-outlined ${className} leading-none`} aria-hidden="true">
            {name}
        </span>
    );
}

export default function Subscribers({ items }) {
    const { flash } = usePage().props;
    const rows = useMemo(() => items ?? [], [items]);

    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState('create');
    const [editing, setEditing] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleting, setDeleting] = useState(null);

    const form = useForm({
        email: '',
    });

    function openCreate() {
        setMode('create');
        setEditing(null);
        form.reset();
        form.clearErrors();
        setModalOpen(true);
    }

    function openEdit(row) {
        setMode('edit');
        setEditing(row);
        form.reset();
        form.clearErrors();
        form.setData('email', row.email);
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        setEditing(null);
        form.reset();
    }

    function openDelete(row) {
        setDeleting(row);
        setDeleteOpen(true);
    }

    function closeDelete() {
        setDeleteOpen(false);
        setDeleting(null);
    }

    function submit(e) {
        e.preventDefault();
        if (mode === 'create') {
            form.post(route('admin.subscribers.store'), {
                onSuccess: () => closeModal(),
            });
        } else {
            form.put(route('admin.subscribers.update', editing.id), {
                onSuccess: () => closeModal(),
            });
        }
    }

    function confirmDelete() {
        form.delete(route('admin.subscribers.destroy', deleting.id), {
            onSuccess: () => closeDelete(),
        });
    }

    return (
        <AuthenticatedLayout header="Subscribers">
            <Head title="Subscribers" />

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <div className="text-lg font-extrabold text-slate-900 dark:text-white">Subscribers</div>
                        <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                            Manage newsletter subscribers and email lists
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={openCreate}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        <GIcon name="add" />
                        Add Subscriber
                    </button>
                </div>

                {flash?.success ? (
                    <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-900/40 dark:bg-green-900/20 dark:text-green-200">
                        {flash.success}
                    </div>
                ) : null}

                <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-slate-200 dark:ring-slate-800">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-600 dark:bg-slate-950 dark:text-slate-300">
                            <tr>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Subscribed On</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
                            {rows.map((s) => (
                                <tr key={s.id} className="text-slate-700 dark:text-slate-200">
                                    <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{s.email}</td>
                                    <td className="px-4 py-3 text-xs">{new Date(s.created_at).toLocaleDateString()}</td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => openEdit(s)}
                                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
                                            >
                                                <GIcon name="edit" className="text-[16px]" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => openDelete(s)}
                                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-700 shadow-sm transition hover:bg-red-50 dark:border-red-900/50 dark:bg-slate-950 dark:text-red-300 dark:hover:bg-red-900/10"
                                            >
                                                <GIcon name="delete" className="text-[16px]" />
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {rows.length === 0 ? (
                                <tr>
                                    <td className="px-4 py-8 text-slate-500 dark:text-slate-400 text-center" colSpan={3}>
                                        No subscribers found.
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create/Edit Modal */}
            <Transition appear show={modalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0 translate-y-4 scale-95" enterTo="opacity-100 translate-y-0 scale-100" leave="ease-in duration-150" leaveFrom="opacity-100 translate-y-0 scale-100" leaveTo="opacity-0 translate-y-4 scale-95">
                                <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                                    <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                                        <Dialog.Title className="text-xl font-black text-slate-900 dark:text-white">
                                            {mode === 'create' ? 'Add Subscriber' : 'Edit Subscriber'}
                                        </Dialog.Title>
                                        <button onClick={closeModal} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800">
                                            <GIcon name="close" />
                                        </button>
                                    </div>
                                    <form onSubmit={submit} className="px-6 py-6 space-y-4">
                                        <div>
                                            <label className="text-sm font-bold text-slate-900 dark:text-white">Email Address</label>
                                            <input
                                                type="email"
                                                value={form.data.email}
                                                onChange={(e) => form.setData('email', e.target.value)}
                                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                placeholder="subscriber@example.com"
                                                required
                                            />
                                            {form.errors.email && <div className="mt-1 text-xs text-red-600">{form.errors.email}</div>}
                                        </div>
                                        <div className="mt-6 flex items-center justify-end gap-3">
                                            <button type="button" onClick={closeModal} className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white">
                                                Cancel
                                            </button>
                                            <button type="submit" disabled={form.processing} className="inline-flex items-center justify-center rounded-2xl bg-primary px-8 py-3 text-sm font-black text-white shadow-xl shadow-primary-500/20 transition hover:bg-primary-700 active:scale-95 disabled:opacity-70">
                                                {mode === 'create' ? 'Add' : 'Save Changes'}
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Delete Confirmation Modal */}
            <Transition appear show={deleteOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeDelete}>
                    <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0 translate-y-4 scale-95" enterTo="opacity-100 translate-y-0 scale-100" leave="ease-in duration-150" leaveFrom="opacity-100 translate-y-0 scale-100" leaveTo="opacity-0 translate-y-4 scale-95">
                                <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                                    <div className="p-6">
                                        <Dialog.Title className="text-xl font-black text-slate-900 dark:text-white">Remove subscriber?</Dialog.Title>
                                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">They will no longer receive updates.</p>
                                        <div className="mt-6 rounded-2xl bg-slate-50 p-4 font-black text-slate-900 dark:bg-slate-950 dark:text-white dark:ring-1 dark:ring-slate-800">
                                            {deleting?.email}
                                        </div>
                                        <div className="mt-8 flex items-center justify-end gap-3">
                                            <button type="button" onClick={closeDelete} className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white">
                                                Cancel
                                            </button>
                                            <button onClick={confirmDelete} className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-8 py-3 text-sm font-black text-white shadow-lg shadow-red-500/20 transition hover:bg-red-700 active:scale-95">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </AuthenticatedLayout>
    );
}
