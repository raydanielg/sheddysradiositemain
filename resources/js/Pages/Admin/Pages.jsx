import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Dialog, Transition } from '@headlessui/react';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
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

export default function Pages({ items }) {
    const { flash } = usePage().props;
    const rows = useMemo(() => items ?? [], [items]);

    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState('create');
    const [editing, setEditing] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleting, setDeleting] = useState(null);

    const form = useForm({
        title: '',
        slug: '',
        excerpt: '',
        body: '',
        is_active: true,
        image: null,
    });

    function openCreate() {
        setMode('create');
        setEditing(null);
        form.reset();
        form.clearErrors();
        form.setData({
            title: '',
            slug: '',
            excerpt: '',
            body: '',
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
            title: row.title ?? '',
            slug: row.slug ?? '',
            excerpt: row.excerpt ?? '',
            body: row.body ?? '',
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
            form.post(route('admin.pages.store'), {
                forceFormData: true,
                onSuccess: () => closeModal(),
            });
            return;
        }

        if (editing?.id) {
            form.post(route('admin.pages.update', editing.id), {
                _method: 'put',
                forceFormData: true,
                onSuccess: () => closeModal(),
            });
        }
    }

    function confirmDelete() {
        if (!deleting?.id) return;
        form.delete(route('admin.pages.destroy', deleting.id), {
            onSuccess: () => closeDelete(),
        });
    }

    return (
        <AuthenticatedLayout header="Site Pages">
            <Head title="Site Pages" />

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <div className="text-lg font-extrabold text-slate-900 dark:text-white">Site Pages</div>
                        <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                            Manage content for static pages like About and Contact
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={openCreate}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                            <GIcon name="add" />
                            Create Page
                        </button>
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
                                <th className="px-4 py-3">Hero</th>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Slug</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
                            {rows.map((p) => (
                                <tr key={p.id} className="text-slate-700 dark:text-slate-200">
                                    <td className="px-4 py-3">
                                        <div className="h-10 w-16 overflow-hidden rounded-lg bg-slate-200 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                                            {p.hero_image_url ? (
                                                <img
                                                    src={normalizeImageUrl(p.hero_image_url)}
                                                    alt=""
                                                    className="h-full w-full object-cover"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="grid h-full w-full place-items-center bg-primary-50 text-primary-600">
                                                    <GIcon name="image" />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{p.title}</td>
                                    <td className="px-4 py-3">
                                        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                            /{p.slug}
                                        </code>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={cn(
                                                'inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ring-1',
                                                p.is_active
                                                    ? 'bg-green-50 text-green-700 ring-green-200 dark:bg-green-900/20 dark:text-green-200'
                                                    : 'bg-slate-100 text-slate-600 ring-slate-200 dark:bg-slate-950 dark:text-slate-300'
                                            )}
                                        >
                                            {p.is_active ? 'Active' : 'Hidden'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => openEdit(p)}
                                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
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
                            {(items ?? []).length === 0 ? (
                                <tr>
                                    <td className="px-4 py-6 text-slate-500 dark:text-slate-400" colSpan={4}>
                                        No pages found.
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
