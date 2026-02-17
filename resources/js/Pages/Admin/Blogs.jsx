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

export default function Blogs({ items }) {
    const { flash } = usePage().props;
    const rows = useMemo(() => items ?? [], [items]);

    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState('create');
    const [editing, setEditing] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleting, setDeleting] = useState(null);

    const form = useForm({
        title: '',
        excerpt: '',
        body: '',
        author_name: '',
        published_at: '',
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
            title: '',
            excerpt: '',
            body: '',
            author_name: '',
            published_at: new Date().toISOString().split('T')[0],
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
            title: row.title ?? '',
            excerpt: row.excerpt ?? '',
            body: row.body ?? '',
            author_name: row.author_name ?? '',
            published_at: row.published_at ? new Date(row.published_at).toISOString().split('T')[0] : '',
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
            form.post(route('admin.blogs.store'), {
                forceFormData: true,
                onSuccess: () => closeModal(),
            });
            return;
        }

        if (editing?.id) {
            form.post(route('admin.blogs.update', editing.id), {
                _method: 'put',
                forceFormData: true,
                onSuccess: () => closeModal(),
            });
        }
    }

    function confirmDelete() {
        if (!deleting?.id) return;
        form.delete(route('admin.blogs.destroy', deleting.id), {
            onSuccess: () => closeDelete(),
        });
    }

    return (
        <AuthenticatedLayout header="Blogs">
            <Head title="Blogs" />

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <div className="text-lg font-extrabold text-slate-900 dark:text-white">Blogs</div>
                        <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                            Create, edit, and manage blog posts
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/blogs"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                        >
                            View Public
                        </Link>
                        <button
                            type="button"
                            onClick={openCreate}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                            <GIcon name="add" />
                            Create Post
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
                                <th className="px-4 py-3">Cover</th>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
                            {rows.map((b) => (
                                <tr key={b.id} className="text-slate-700 dark:text-slate-200">
                                    <td className="px-4 py-3">
                                        <div className="h-10 w-16 overflow-hidden rounded-lg bg-slate-200 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                                            {b.image_url ? (
                                                <img
                                                    src={normalizeImageUrl(b.image_url)}
                                                    alt=""
                                                    className="h-full w-full object-cover"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="grid h-full w-full place-items-center bg-primary-50 text-primary-600">
                                                    <GIcon name="article" />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{b.title}</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">
                                            {b.slug}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={cn(
                                                'inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ring-1',
                                                b.is_active
                                                    ? 'bg-green-50 text-green-700 ring-green-200 dark:bg-green-900/20 dark:text-green-200'
                                                    : 'bg-slate-100 text-slate-600 ring-slate-200 dark:bg-slate-950 dark:text-slate-300'
                                            )}
                                        >
                                            {b.is_active ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => openEdit(b)}
                                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
                                            >
                                                <GIcon name="edit" className="text-[16px]" />
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => openDelete(b)}
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
                                    <td className="px-4 py-8 text-slate-500 dark:text-slate-400" colSpan={4}>
                                        No blog posts found.
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
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-2xl transition-all dark:bg-slate-900">
                                    <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                                        <div>
                                            <Dialog.Title className="text-xl font-black text-slate-900 dark:text-white">
                                                {mode === 'create' ? 'Add New Post' : 'Edit Post'}
                                            </Dialog.Title>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
                                        >
                                            <GIcon name="close" />
                                        </button>
                                    </div>

                                    <form onSubmit={submit} className="px-6 py-6">
                                        <div className="grid gap-6 lg:grid-cols-3">
                                            <div className="lg:col-span-2 space-y-6">
                                                <div>
                                                    <label className="text-sm font-bold text-slate-900 dark:text-white">Post Title</label>
                                                    <input
                                                        value={form.data.title}
                                                        onChange={(e) => form.setData('title', e.target.value)}
                                                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                        placeholder="Enter blog title..."
                                                    />
                                                    {form.errors.title ? <div className="mt-1 text-xs text-red-600">{form.errors.title}</div> : null}
                                                </div>

                                                <div>
                                                    <label className="text-sm font-bold text-slate-900 dark:text-white">Content Body</label>
                                                    <textarea
                                                        value={form.data.body}
                                                        onChange={(e) => form.setData('body', e.target.value)}
                                                        rows={12}
                                                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white font-serif"
                                                        placeholder="Write your article content here..."
                                                    />
                                                    {form.errors.body ? <div className="mt-1 text-xs text-red-600">{form.errors.body}</div> : null}
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div>
                                                    <label className="text-sm font-bold text-slate-900 dark:text-white">Short Excerpt</label>
                                                    <textarea
                                                        value={form.data.excerpt}
                                                        onChange={(e) => form.setData('excerpt', e.target.value)}
                                                        rows={3}
                                                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                        placeholder="Brief summary..."
                                                    />
                                                    {form.errors.excerpt ? <div className="mt-1 text-xs text-red-600">{form.errors.excerpt}</div> : null}
                                                </div>

                                                <div>
                                                    <label className="text-sm font-bold text-slate-900 dark:text-white">Author Name</label>
                                                    <input
                                                        value={form.data.author_name}
                                                        onChange={(e) => form.setData('author_name', e.target.value)}
                                                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                        placeholder="e.g. Sheddy"
                                                    />
                                                    {form.errors.author_name ? <div className="mt-1 text-xs text-red-600">{form.errors.author_name}</div> : null}
                                                </div>

                                                <div>
                                                    <label className="text-sm font-bold text-slate-900 dark:text-white">Published Date</label>
                                                    <input
                                                        type="date"
                                                        value={form.data.published_at}
                                                        onChange={(e) => form.setData('published_at', e.target.value)}
                                                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                    />
                                                    {form.errors.published_at ? <div className="mt-1 text-xs text-red-600">{form.errors.published_at}</div> : null}
                                                </div>

                                                <div>
                                                    <label className="text-sm font-bold text-slate-900 dark:text-white">Cover Image</label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => form.setData('image', e.target.files?.[0] ?? null)}
                                                        className="mt-3 block w-full text-sm text-slate-700 file:mr-4 file:rounded-full file:border-0 file:bg-primary-50 file:px-6 file:py-2.5 file:text-sm file:font-black file:text-primary-700 hover:file:bg-primary-100 dark:text-slate-300 dark:file:bg-primary-900/30"
                                                    />
                                                    {form.errors.image ? <div className="mt-1 text-xs text-red-600">{form.errors.image}</div> : null}
                                                </div>

                                                <div className="flex items-center gap-3 pt-2">
                                                    <input
                                                        id="is_active"
                                                        type="checkbox"
                                                        checked={!!form.data.is_active}
                                                        onChange={(e) => form.setData('is_active', e.target.checked)}
                                                        className="h-5 w-5 rounded-lg border-slate-300 text-primary focus:ring-primary"
                                                    />
                                                    <label htmlFor="is_active" className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                                        Publish Post
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-10 flex items-center justify-end gap-3 border-t border-slate-200 pt-6 dark:border-slate-800">
                                            <button
                                                type="button"
                                                onClick={closeModal}
                                                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={form.processing}
                                                className="inline-flex items-center justify-center rounded-2xl bg-primary px-8 py-3.5 text-sm font-black text-white shadow-xl shadow-primary-500/20 transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70 active:scale-95"
                                            >
                                                {mode === 'create' ? 'Create Post' : 'Save Changes'}
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
                                <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                                    <div className="p-6">
                                        <Dialog.Title className="text-xl font-black text-slate-900 dark:text-white">Delete blog post?</Dialog.Title>
                                        <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">This action cannot be undone.</div>

                                        <div className="mt-6 flex items-center gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950 dark:ring-1 dark:ring-slate-800">
                                            <div className="h-12 w-16 overflow-hidden rounded-lg ring-1 ring-slate-200">
                                                {deleting?.image_url ? (
                                                    <img src={normalizeImageUrl(deleting.image_url)} alt="" className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="grid h-full w-full place-items-center bg-primary-100 text-primary-600">
                                                        <GIcon name="article" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="font-black text-slate-900 dark:text-white line-clamp-1">{deleting?.title}</div>
                                        </div>

                                        <div className="mt-8 flex items-center justify-end gap-3">
                                            <button
                                                type="button"
                                                onClick={closeDelete}
                                                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                onClick={confirmDelete}
                                                disabled={form.processing}
                                                className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-8 py-3 text-sm font-black text-white shadow-lg shadow-red-500/20 transition hover:bg-red-700 disabled:opacity-70 active:scale-95"
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
