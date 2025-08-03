import { AppShell } from '@/components/app-shell';
import { Head, Link } from '@inertiajs/react';

interface Guard {
    id: number;
    badge_number: string;
    rank: string;
    phone?: string;
    status: string;
    hire_date: string;
    user: {
        name: string;
        email: string;
    };
    team?: {
        name: string;
        sector: string;
        shift: string;
    };
}

interface PaginationData {
    data: Guard[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    guards: PaginationData;
    [key: string]: unknown;
}

export default function GuardsIndex({ guards }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'text-green-600 bg-green-50 border-green-200';
            case 'inactive': return 'text-red-600 bg-red-50 border-red-200';
            case 'on_leave': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getShiftIcon = (shift?: string) => {
        switch (shift) {
            case 'morning': return '🌅';
            case 'afternoon': return '☀️';
            case 'night': return '🌙';
            default: return '⏰';
        }
    };

    return (
        <AppShell>
            <Head title="Security Guards" />
            
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            👮 Security Guards
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Manage security personnel and assignments
                        </p>
                    </div>
                    <Link
                        href={route('guards.create')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
                    >
                        ➕ Add New Guard
                    </Link>
                </div>

                {/* Guards List */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    {guards.data.length > 0 ? (
                        <>
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <p className="text-gray-600 dark:text-gray-400">
                                    Showing {guards.data.length} of {guards.total} guards
                                </p>
                            </div>
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                {guards.data.map((guard) => (
                                    <div key={guard.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                                    <span className="text-2xl">👮</span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {guard.user.name}
                                                        </h3>
                                                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(guard.status)}`}>
                                                            {guard.status.replace('_', ' ').toUpperCase()}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-lg">🏷️</span>
                                                            <span>Badge #{guard.badge_number}</span>
                                                        </div>
                                                        
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-lg">👔</span>
                                                            <span>{guard.rank}</span>
                                                        </div>

                                                        {guard.phone && (
                                                            <div className="flex items-center space-x-2">
                                                                <span className="text-lg">📞</span>
                                                                <span>{guard.phone}</span>
                                                            </div>
                                                        )}

                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-lg">📅</span>
                                                            <span>Since {new Date(guard.hire_date).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>

                                                    {guard.team && (
                                                        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                            <div className="flex items-center space-x-4 text-sm">
                                                                <div className="flex items-center space-x-2">
                                                                    <span className="text-lg">👥</span>
                                                                    <span className="font-medium text-gray-900 dark:text-white">
                                                                        {guard.team.name}
                                                                    </span>
                                                                </div>
                                                                
                                                                <div className="flex items-center space-x-2">
                                                                    <span className="text-lg">🏢</span>
                                                                    <span className="text-gray-600 dark:text-gray-400">
                                                                        {guard.team.sector}
                                                                    </span>
                                                                </div>

                                                                <div className="flex items-center space-x-2">
                                                                    <span className="text-lg">{getShiftIcon(guard.team.shift)}</span>
                                                                    <span className="text-gray-600 dark:text-gray-400">
                                                                        {guard.team.shift} shift
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center space-x-3">
                                                <Link
                                                    href={route('guards.show', guard.id)}
                                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                                >
                                                    View Profile
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="p-12 text-center">
                            <div className="text-6xl mb-4">👮</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                No guards found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Add your first security guard to start managing your team.
                            </p>
                            <Link
                                href={route('guards.create')}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                Add First Guard
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {guards.last_page > 1 && (
                    <div className="flex justify-center space-x-2">
                        {Array.from({ length: guards.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={route('guards.index', { page })}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    page === guards.current_page
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                            >
                                {page}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}