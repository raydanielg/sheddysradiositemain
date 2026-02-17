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

function cn(...parts) {
    return parts.filter(Boolean).join(' ');
}

function formatDateTime(value) {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleString();
}

export default function ContactMessages({ items }) {
    const { flash } = usePage().props;
    const rows = useMemo(() => items ?? [], [items]);

    const [viewOpen, setViewOpen] = useState(false);
    const [viewing, setViewing] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleting, setDeleting] = useState(null);

    const form = useForm({});

    function openView(row) {
        setViewing(row);
        setViewOpen(true);
    }

    function closeView() {
        setViewOpen(false);
        setViewing(null);
    }

    function openDelete(row) {
        setDeleting(row);
        setDeleteOpen(true);
    }

    function closeDelete() {
        setDeleteOpen(false);
        setDeleting(null);
    }

    function confirmDelete() {
        if (!deleting?.id) return;
        form.delete(route('admin.contact-messages.destroy', deleting.id), {
            onSuccess: () => closeDelete(),
        });
    }

    return (
        <AuthenticatedLayout header="Contact Messages">
            <Head title="Contact Messages" />

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <div className="text-lg font-extrabold text-slate-900 dark:text-white">Contact Messages</div>
                        <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                            View and manage messages from the contact form
                        </div>
                    </div>
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
                                <th className="px-4 py-3">Sender</th>
                                <th className="px-4 py-3">Subject</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
                            {rows.map((m) => (
                                <tr key={m.id} className="text-slate-700 dark:text-slate-200">
                                    <td className="px-4 py-3">
                                        <div className="font-bold text-slate-900 dark:text-white">{m.name}</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">{m.email}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="line-clamp-1">{m.subject ?? '(No Subject)'}</div>
                                    </td>
                                    <td className="px-4 py-3 text-xs">{formatDateTime(m.created_at)}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => openView(m)}
                                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
                                            >
                                                <GIcon name="visibility" className="text-[16px]" />
                                                View
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => openDelete(m)}
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
                                    <td className="px-4 py-8 text-slate-500 dark:text-slate-400 text-center" colSpan={4}>
                                        No messages found.
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Modal */}
            <Transition appear show={viewOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeView}>
                    <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-200"
                                enterFrom="opacity-0 translate-y-4 scale-95"
                                enterTo="opacity-100 translate-y-0 scale-100"
                                leave="ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0 scale-100"
                                leaveTo="opacity-0 translate-y-4 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-2xl transition-all dark:bg-slate-900">
                                    <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                                        <div>
                                            <Dialog.Title className="text-xl font-black text-slate-900 dark:text-white">
                                                Message Details
                                            </Dialog.Title>
                                            <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                                From {viewing?.name} on {formatDateTime(viewing?.created_at)}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={closeView}
                                            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
                                        >
                                            <GIcon name="close" />
                                        </button>
                                    </div>

                                    <div className="px-6 py-6 space-y-6">
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div>
                                                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Sender</div>
                                                <div className="mt-1 font-bold text-slate-900 dark:text-white">{viewing?.name}</div>
                                                <div className="text-sm text-primary font-semibold">{viewing?.email}</div>
                                                <div className="text-sm text-slate-600 dark:text-slate-400">{viewing?.phone ?? 'No phone provided'}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Subject</div>
                                                <div className="mt-1 font-bold text-slate-900 dark:text-white">{viewing?.subject ?? '(No Subject)'}</div>
                                            </div>
                                        </div>

                                        <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800">
                                            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Message</div>
                                            <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-200 whitespace-pre-wrap">
                                                {viewing?.message}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-5 dark:border-slate-800">
                                        <button
                                            type="button"
                                            onClick={closeView}
                                            className="inline-flex items-center justify-center rounded-2xl bg-slate-100 px-6 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                                        >
                                            Close
                                        </button>
                                        <a
                                            href={`mailto:${viewing?.email}?subject=Re: ${viewing?.subject}`}
                                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-3 text-sm font-black text-white shadow-xl shadow-primary-500/20 transition hover:bg-primary-700 active:scale-95"
                                        >
                                            <GIcon name="reply" />
                                            Reply via Email
                                        </a>
                                    </div>
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
                        <div className="fixed inset-0 bg-black/50" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0 translate-y-4 scale-95" enterTo="opacity-100 translate-y-0 scale-100" leave="ease-in duration-150" leaveFrom="opacity-100 translate-y-0 scale-100" leaveTo="opacity-0 translate-y-4 scale-95">
                                <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                                    <div className="p-6">
                                        <Dialog.Title className="text-xl font-black text-slate-900 dark:text-white">Delete message?</Dialog.Title>
                                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">This will permanently remove the message from your database.</p>
                                        <div className="mt-6 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950 dark:ring-1 dark:ring-slate-800">
                                            <div className="font-bold text-slate-900 dark:text-white">{deleting?.name}</div>
                                            <div className="text-sm text-slate-500 dark:text-slate-400">{deleting?.subject}</div>
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
