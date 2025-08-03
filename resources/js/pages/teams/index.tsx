import { AppShell } from '@/components/app-shell';
import { Head, Link } from '@inertiajs/react';

interface Team {
    id: number;
    name: string;
    description?: string;
    sector: string;
    shift: string;
    max_members: number;
    is_active: boolean;
    guards_count: number;
    created_at: string;
}

interface PaginationData {
    data: Team[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    teams: PaginationData;
    [key: string]: unknown;
}

export default function TeamsIndex({ teams }: Props) {
    const getShiftIcon = (shift: string) => {
        switch (shift) {
            case 'morning': return '🌅';
            case 'afternoon': return '☀️';
            case 'night': return '🌙';
            default: return '⏰';
        }
    };

    const getShiftColor = (shift: string) => {
        switch (shift) {
            case 'morning': return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'afternoon': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'night': return 'text-purple-600 bg-purple-50 border-purple-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    return (
        <AppShell>
            <Head title="Security Teams" />
            
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            👥 Security Teams
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Manage security teams and assignments
                        </p>
                    </div>
                    <Link
                        href={route('teams.create')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
                    >
                        ➕ Create New Team
                    </Link>
                </div>

                {/* Teams Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teams.data.map((team) => (
                        <div key={team.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                            <span className="text-2xl">👥</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {team.name}
                                            </h3>
                                            {!team.is_active && (
                                                <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                                                    INACTIVE
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xl">🏢</span>
                                        <span className="text-gray-600 dark:text-gray-400">{team.sector}</span>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xl">{getShiftIcon(team.shift)}</span>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getShiftColor(team.shift)}`}>
                                            {team.shift.toUpperCase()} SHIFT
                                        </span>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <span className="text-xl">👮</span>
                                        <span className="text-gray-600 dark:text-gray-400">
                                            {team.guards_count} / {team.max_members} members
                                        </span>
                                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div 
                                                className="bg-blue-600 h-2 rounded-full transition-all"
                                                style={{ width: `${Math.min((team.guards_count / team.max_members) * 100, 100)}%` }}
                                            />
                                        </div>
                                    </div>

                                    {team.description && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                            {team.description}
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        Created {new Date(team.created_at).toLocaleDateString()}
                                    </span>
                                    <div className="flex space-x-2">
                                        <Link
                                            href={route('teams.show', team.id)}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {teams.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">👥</div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No teams found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Create your first security team to start organizing your guards.
                        </p>
                        <Link
                            href={route('teams.create')}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            Create First Team
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {teams.last_page > 1 && (
                    <div className="flex justify-center space-x-2">
                        {Array.from({ length: teams.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={route('teams.index', { page })}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    page === teams.current_page
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