import { AppShell } from '@/components/app-shell';
import { Head, Link, router } from '@inertiajs/react';

interface Stats {
    total_incidents: number;
    open_incidents: number;
    high_priority_incidents: number;
    total_guards: number;
    total_teams: number;
}

interface Incident {
    id: number;
    incident_number: string;
    title: string;
    type: string;
    priority: string;
    status: string;
    created_at: string;
    reported_by: {
        user: {
            name: string;
        };
    };
}

interface Notification {
    id: number;
    title: string;
    message: string;
    type: string;
    priority: string;
    created_at: string;
}

interface GuardProfile {
    id: number;
    badge_number: string;
    rank: string;
    team?: {
        name: string;
        sector: string;
    };
}

interface Props {
    stats: Stats;
    recentIncidents: Incident[];
    notifications: Notification[];
    guardProfile?: GuardProfile;
    [key: string]: unknown;
}

export default function Dashboard({ stats, recentIncidents, notifications, guardProfile }: Props) {
    const handleMarkNotificationRead = (notificationId: number) => {
        router.post(route('notifications.mark-read'), {
            notification_id: notificationId,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'critical': return 'text-red-600 bg-red-50';
            case 'high': return 'text-orange-600 bg-orange-50';
            case 'medium': return 'text-yellow-600 bg-yellow-50';
            case 'low': return 'text-green-600 bg-green-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open': return 'text-red-600 bg-red-50';
            case 'investigating': return 'text-yellow-600 bg-yellow-50';
            case 'resolved': return 'text-green-600 bg-green-50';
            case 'closed': return 'text-gray-600 bg-gray-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <AppShell>
            <Head title="Security Dashboard" />
            
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            🛡️ Security Dashboard
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Monitor incidents, manage teams, and stay alert
                        </p>
                    </div>
                    <Link
                        href={route('incidents.create')}
                        className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors shadow-lg"
                    >
                        🚨 Report Incident
                    </Link>
                </div>

                {/* Guard Profile Card */}
                {guardProfile && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                                <span className="text-2xl">👮</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                                    Badge #{guardProfile.badge_number} - {guardProfile.rank}
                                </h3>
                                {guardProfile.team && (
                                    <p className="text-blue-700 dark:text-blue-300">
                                        {guardProfile.team.name} • {guardProfile.team.sector}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📋</span>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total_incidents}</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Incidents</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">🚨</span>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.open_incidents}</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Open Cases</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">⚠️</span>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.high_priority_incidents}</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">High Priority</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">👮</span>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total_guards}</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Active Guards</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">👥</span>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total_teams}</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Teams</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Link
                        href={route('incidents.index')}
                        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">📋</span>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">View Incidents</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Manage all incidents</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href={route('teams.index')}
                        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">👥</span>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Teams</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Manage teams</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href={route('guards.index')}
                        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">👮</span>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Guards</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Manage guards</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href={route('incidents.create')}
                        className="bg-red-600 text-white p-4 rounded-lg shadow-sm hover:bg-red-700 transition-colors"
                    >
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">🚨</span>
                            <div>
                                <p className="font-medium">Report Incident</p>
                                <p className="text-red-100 text-sm">Create new report</p>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Incidents */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Incidents</h2>
                        </div>
                        <div className="p-6">
                            {recentIncidents.length > 0 ? (
                                <div className="space-y-4">
                                    {recentIncidents.map((incident) => (
                                        <div key={incident.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(incident.priority)}`}>
                                                        {incident.priority.toUpperCase()}
                                                    </span>
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(incident.status)}`}>
                                                        {incident.status.toUpperCase()}
                                                    </span>
                                                </div>
                                                <p className="font-medium text-gray-900 dark:text-white">{incident.title}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {incident.incident_number} • By {incident.reported_by.user.name}
                                                </p>
                                            </div>
                                            <Link
                                                href={route('incidents.show', incident.id)}
                                                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                                            >
                                                View
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600 dark:text-gray-400 text-center py-8">No recent incidents</p>
                            )}
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Notifications</h2>
                        </div>
                        <div className="p-6">
                            {notifications.length > 0 ? (
                                <div className="space-y-4">
                                    {notifications.map((notification) => (
                                        <div key={notification.id} className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(notification.priority)}`}>
                                                        {notification.priority.toUpperCase()}
                                                    </span>
                                                </div>
                                                <p className="font-medium text-gray-900 dark:text-white">{notification.title}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{notification.message}</p>
                                            </div>
                                            <button
                                                onClick={() => handleMarkNotificationRead(notification.id)}
                                                className="text-blue-600 hover:text-blue-700 font-medium text-sm ml-3"
                                            >
                                                Mark Read
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600 dark:text-gray-400 text-center py-8">No new notifications</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}