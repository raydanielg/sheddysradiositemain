import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function RadioSettings({ streamUrl }) {
    const { data, setData, put, processing, errors, recentlySuccessful } =
        useForm({
            stream_url: streamUrl ?? '',
        });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.radio-settings.update'));
    };

    return (
        <AuthenticatedLayout header="Radio Settings">
            <Head title="Radio Settings" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="stream_url"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Stream URL
                                    </label>
                                    <input
                                        id="stream_url"
                                        type="text"
                                        value={data.stream_url}
                                        onChange={(e) =>
                                            setData('stream_url', e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                        placeholder="https://..."
                                    />
                                    {errors.stream_url && (
                                        <div className="mt-1 text-sm text-red-600">
                                            {errors.stream_url}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 disabled:opacity-50"
                                    >
                                        Save
                                    </button>
                                    {recentlySuccessful && (
                                        <span className="text-sm text-green-600">
                                            Saved.
                                        </span>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
