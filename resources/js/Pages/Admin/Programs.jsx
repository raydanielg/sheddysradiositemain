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

function normalizeImageUrl(url) {
    if (!url) return '';
    if (typeof url === 'string' && url.startsWith('http')) {
        const idx = url.indexOf('/storage/');
        if (idx !== -1) return url.slice(idx);
    }
    return url;
}

const DAY_LABELS = {
    1: 'Jumatatu',
    2: 'Jumanne',
    3: 'Jumatano',
    4: 'Alhamisi',
    5: 'Ijumaa',
    6: 'Jumamosi',
    7: 'Jumapili',
};

export default function Programs({ items }) {
    const { flash } = usePage().props;
    const rows = useMemo(() => items ?? [], [items]);

    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState('create');
    const [editing, setEditing] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleting, setDeleting] = useState(null);

    const form = useForm({
        day_of_week: 1,
        title: '',
        host: '',
        start_time: '',
        end_time: '',
        description: '',
        sort_order: 0,
        is_active: true,
        image: null,
    });

    function openCreate() {
        setMode('create');
        setEditing(null);
        form.reset();
        form.clearErrors();
        form.setData({
            day_of_week: 1,
            title: '',
            host: '',
            start_time: '',
            end_time: '',
            description: '',
            sort_order: 0,
            is_active: true,
            image: null,
        });
        setModalOpen(true);
    }

    function openEdit(row) {
        setMode('edit');
        setEditing(row);
        form.reset();
        form.clearErrors();
        form.setData({
            day_of_week: row.day_of_week ?? 1,
            title: row.title ?? '',
            host: row.host ?? '',
            start_time: row.start_time ?? '',
            end_time: row.end_time ?? '',
            description: row.description ?? '',
            sort_order: row.sort_order ?? 0,
            is_active: !!row.is_active,
            image: null,
        });
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        setEditing(null);
        form.reset();
        form.clearErrors();
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
            form.post(route('admin.programs.store'), {
                forceFormData: true,
                onSuccess: () => closeModal(),
            });
            return;
        }

        if (editing?.id) {
            form.put(route('admin.programs.update', editing.id), {
                forceFormData: true,
                onSuccess: () => closeModal(),
            });
        }
    }

    function confirmDelete() {
        if (!deleting?.id) return;
        form.delete(route('admin.programs.destroy', deleting.id), {
            onSuccess: () => closeDelete(),
        });
    }

    return (
        <AuthenticatedLayout header="Programs">
            <Head title="Programs" />

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <div className="text-lg font-extrabold text-slate-900 dark:text-white">Programs</div>
                        <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                            Create, edit, and manage schedule programs (Vipindi)
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={openCreate}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        <GIcon name="add" />
                        Create
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
                                <th className="px-4 py-3">Image</th>
                                <th className="px-4 py-3">Program</th>
                                <th className="px-4 py-3">Day</th>
                                <th className="px-4 py-3">Time</th>
                                <th className="px-4 py-3">Active</th>
                                <th className="px-4 py-3">Sort</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
                            {rows.map((p) => (
                                <tr key={p.id} className="text-slate-700 dark:text-slate-200">
                                    <td className="px-4 py-3">
                                        <div className="h-10 w-14 overflow-hidden rounded-lg bg-slate-200 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                                            {p.image_url ? (
                                                <img
                                                    src={normalizeImageUrl(p.image_url)}
                                                    alt=""
                                                    className="h-full w-full object-cover"
                                                    loading="lazy"
                                                />
                                            ) : null}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="font-semibold text-slate-900 dark:text-white">{p.title}</div>
                                        {p.host ? (
                                            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                Host: {p.host}
                                            </div>
                                        ) : null}
                                    </td>
                                    <td className="px-4 py-3">{DAY_LABELS[p.day_of_week] ?? p.day_of_week}</td>
                                    <td className="px-4 py-3">{p.start_time} - {p.end_time}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={cn(
                                                'inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1',
                                                p.is_active
                                                    ? 'bg-green-50 text-green-700 ring-green-200 dark:bg-green-900/20 dark:text-green-200 dark:ring-green-900/40'
                                                    : 'bg-slate-100 text-slate-600 ring-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:ring-slate-800',
                                            )}
                                        >
                                            {p.is_active ? 'Active' : 'Hidden'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">{p.sort_order ?? 0}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => openEdit(p)}
                                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
                                            >
                                                <GIcon name="edit" className="text-[16px]" />
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => openDelete(p)}
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
                                    <td className="px-4 py-8 text-slate-500 dark:text-slate-400" colSpan={7}>
                                        No programs found.
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </div>
            </div>

            <Transition appear show={modalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black/50" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-200"
                                enterFrom="opacity-0 translate-y-4 scale-95"
                                enterTo="opacity-100 translate-y-0 scale-100"
                                leave="ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0 scale-100"
                                leaveTo="opacity-0 translate-y-4 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                                    <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-4 dark:border-slate-800">
                                        <div>
                                            <Dialog.Title className="text-lg font-extrabold text-slate-900 dark:text-white">
                                                {mode === 'create' ? 'Create Program' : 'Edit Program'}
                                            </Dialog.Title>
                                            <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                                Program details for the schedule
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
                                            aria-label="Close"
                                        >
                                            <GIcon name="close" />
                                        </button>
                                    </div>

                                    <form onSubmit={submit} className="px-6 py-5">
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="sm:col-span-2">
                                                <label className="text-sm font-semibold text-slate-900 dark:text-white">Program title</label>
                                                <input
                                                    value={form.data.title}
                                                    onChange={(e) => form.setData('title', e.target.value)}
                                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                    placeholder="e.g. Asubuhi na Sheddy's"
                                                />
                                                {form.errors.title ? <div className="mt-1 text-xs text-red-600">{form.errors.title}</div> : null}
                                            </div>

                                            <div>
                                                <label className="text-sm font-semibold text-slate-900 dark:text-white">Day</label>
                                                <select
                                                    value={form.data.day_of_week}
                                                    onChange={(e) => form.setData('day_of_week', Number(e.target.value))}
                                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                >
                                                    {Object.entries(DAY_LABELS).map(([k, v]) => (
                                                        <option key={k} value={Number(k)}>
                                                            {v}
                                                        </option>
                                                    ))}
                                                </select>
                                                {form.errors.day_of_week ? <div className="mt-1 text-xs text-red-600">{form.errors.day_of_week}</div> : null}
                                            </div>

                                            <div>
                                                <label className="text-sm font-semibold text-slate-900 dark:text-white">Host</label>
                                                <input
                                                    value={form.data.host}
                                                    onChange={(e) => form.setData('host', e.target.value)}
                                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                    placeholder="e.g. Ray"
                                                />
                                                {form.errors.host ? <div className="mt-1 text-xs text-red-600">{form.errors.host}</div> : null}
                                            </div>

                                            <div>
                                                <label className="text-sm font-semibold text-slate-900 dark:text-white">Start time</label>
                                                <input
                                                    value={form.data.start_time}
                                                    onChange={(e) => form.setData('start_time', e.target.value)}
                                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                    placeholder="06:00"
                                                />
                                                {form.errors.start_time ? <div className="mt-1 text-xs text-red-600">{form.errors.start_time}</div> : null}
                                            </div>

                                            <div>
                                                <label className="text-sm font-semibold text-slate-900 dark:text-white">End time</label>
                                                <input
                                                    value={form.data.end_time}
                                                    onChange={(e) => form.setData('end_time', e.target.value)}
                                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                    placeholder="09:00"
                                                />
                                                {form.errors.end_time ? <div className="mt-1 text-xs text-red-600">{form.errors.end_time}</div> : null}
                                            </div>

                                            <div className="sm:col-span-2">
                                                <label className="text-sm font-semibold text-slate-900 dark:text-white">Description</label>
                                                <textarea
                                                    value={form.data.description}
                                                    onChange={(e) => form.setData('description', e.target.value)}
                                                    rows={4}
                                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                    placeholder="Short description..."
                                                />
                                                {form.errors.description ? <div className="mt-1 text-xs text-red-600">{form.errors.description}</div> : null}
                                            </div>

                                            <div>
                                                <label className="text-sm font-semibold text-slate-900 dark:text-white">Sort Order</label>
                                                <input
                                                    type="number"
                                                    value={form.data.sort_order}
                                                    onChange={(e) => form.setData('sort_order', Number(e.target.value))}
                                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                />
                                                {form.errors.sort_order ? <div className="mt-1 text-xs text-red-600">{form.errors.sort_order}</div> : null}
                                            </div>

                                            <div>
                                                <label className="text-sm font-semibold text-slate-900 dark:text-white">Status</label>
                                                <div className="mt-3 flex items-center gap-3">
                                                    <input
                                                        id="is_active"
                                                        type="checkbox"
                                                        checked={!!form.data.is_active}
                                                        onChange={(e) => form.setData('is_active', e.target.checked)}
                                                        className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                                                    />
                                                    <label htmlFor="is_active" className="text-sm text-slate-700 dark:text-slate-300">
                                                        Active
                                                    </label>
                                                </div>
                                                {form.errors.is_active ? <div className="mt-1 text-xs text-red-600">{form.errors.is_active}</div> : null}
                                            </div>

                                            <div className="sm:col-span-2">
                                                <label className="text-sm font-semibold text-slate-900 dark:text-white">Image (optional)</label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => form.setData('image', e.target.files?.[0] ?? null)}
                                                    className="mt-2 block w-full text-sm text-slate-700 file:mr-4 file:rounded-xl file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-bold file:text-slate-800 hover:file:bg-slate-200 dark:text-slate-200 dark:file:bg-slate-950 dark:file:text-white dark:hover:file:bg-slate-800"
                                                />
                                                {form.errors.image ? <div className="mt-1 text-xs text-red-600">{form.errors.image}</div> : null}
                                            </div>
                                        </div>

                                        <div className="mt-6 flex items-center justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={closeModal}
                                                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={form.processing}
                                                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
                                            >
                                                {mode === 'create' ? 'Create' : 'Save changes'}
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <Transition appear show={deleteOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeDelete}>
                    <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black/50" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-200"
                                enterFrom="opacity-0 translate-y-4 scale-95"
                                enterTo="opacity-100 translate-y-0 scale-100"
                                leave="ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0 scale-100"
                                leaveTo="opacity-0 translate-y-4 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                                    <div className="px-6 py-5">
                                        <Dialog.Title className="text-lg font-extrabold text-slate-900 dark:text-white">Delete program?</Dialog.Title>
                                        <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">This action cannot be undone.</div>

                                        <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 dark:bg-slate-950 dark:text-white dark:ring-slate-800">
                                            {deleting?.title}
                                        </div>

                                        <div className="mt-6 flex items-center justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={closeDelete}
                                                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                onClick={confirmDelete}
                                                disabled={form.processing}
                                                className="inline-flex items-center justify-center rounded-xl bg-red-600 px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
                                            >
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
