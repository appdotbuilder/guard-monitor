import { AppShell } from '@/components/app-shell';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Incident {
    id: number;
    incident_number: string;
    title: string;
    type: string;
    priority: string;
    status: string;
    location: string;
    created_at: string;
    reported_by: {
        user: {
            name: string;
        };
    };
    media_count?: number;
}

interface PaginationData {
    data: Incident[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    incidents: PaginationData;
    filters: {
        status?: string;
        priority?: string;
        type?: string;
    };
    [key: string]: unknown;
}

export default function IncidentsIndex({ incidents, filters }: Props) {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        
        router.get(route('incidents.index'), newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'critical': return 'text-red-600 bg-red-50 border-red-200';
            case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'low': return 'text-green-600 bg-green-50 border-green-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open': return 'text-red-600 bg-red-50 border-red-200';
            case 'investigating': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'resolved': return 'text-green-600 bg-green-50 border-green-200';
            case 'closed': return 'text-gray-600 bg-gray-50 border-gray-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'theft': return '🚨';
            case 'vandalism': return '💥';
            case 'suspicious_activity': return '👁️';
            case 'safety_hazard': return '⚠️';
            case 'medical_emergency': return '🏥';
            case 'fire': return '🔥';
            default: return '📋';
        }
    };

    return (
        <AppShell>
            <Head title="Incidents" />
            
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            📋 Incident Reports
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Manage and track all security incidents
                        </p>
                    </div>
                    <Link
                        href={route('incidents.create')}
                        className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors shadow-lg"
                    >
                        🚨 Report New Incident
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Status
                            </label>
                            <select
                                value={localFilters.status || ''}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">All Statuses</option>
                                <option value="open">Open</option>
                                <option value="investigating">Investigating</option>
                                <option value="resolved">Resolved</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Priority
                            </label>
                            <select
                                value={localFilters.priority || ''}
                                onChange={(e) => handleFilterChange('priority', e.target.value)}
                                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">All Priorities</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Type
                            </label>
                            <select
                                value={localFilters.type || ''}
                                onChange={(e) => handleFilterChange('type', e.target.value)}
                                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">All Types</option>
                                <option value="theft">Theft</option>
                                <option value="vandalism">Vandalism</option>
                                <option value="suspicious_activity">Suspicious Activity</option>
                                <option value="safety_hazard">Safety Hazard</option>
                                <option value="medical_emergency">Medical Emergency</option>
                                <option value="fire">Fire</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button
                                onClick={() => {
                                    setLocalFilters({});
                                    router.get(route('incidents.index'));
                                }}
                                className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Incidents List */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    {incidents.data.length > 0 ? (
                        <>
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <p className="text-gray-600 dark:text-gray-400">
                                    Showing {incidents.data.length} of {incidents.total} incidents
                                </p>
                            </div>
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                {incidents.data.map((incident) => (
                                    <div key={incident.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <span className="text-2xl">{getTypeIcon(incident.type)}</span>
                                                    <div className="flex items-center space-x-2">
                                                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(incident.status)}`}>
                                                            {incident.status.replace('_', ' ').toUpperCase()}
                                                        </span>
                                                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getPriorityColor(incident.priority)}`}>
                                                            {incident.priority.toUpperCase()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                                    {incident.title}
                                                </h3>
                                                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                                    <span>#{incident.incident_number}</span>
                                                    <span>📍 {incident.location}</span>
                                                    <span>👮 {incident.reported_by.user.name}</span>
                                                    <span>📅 {new Date(incident.created_at).toLocaleDateString()}</span>
                                                    {incident.media_count && incident.media_count > 0 && (
                                                        <span>📎 {incident.media_count} files</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Link
                                                    href={route('incidents.show', incident.id)}
                                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="p-12 text-center">
                            <div className="text-6xl mb-4">📋</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                No incidents found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                No incidents match your current filters or none have been reported yet.
                            </p>
                            <Link
                                href={route('incidents.create')}
                                className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                            >
                                Report First Incident
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {incidents.last_page > 1 && (
                    <div className="flex justify-center space-x-2">
                        {Array.from({ length: incidents.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={route('incidents.index', { ...localFilters, page })}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    page === incidents.current_page
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