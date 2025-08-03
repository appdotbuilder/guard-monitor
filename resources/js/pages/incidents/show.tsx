import { AppShell } from '@/components/app-shell';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface IncidentMedia {
    id: number;
    filename: string;
    original_name: string;
    type: string;
    file_path: string;
    description?: string;
}

interface Incident {
    id: number;
    incident_number: string;
    title: string;
    description: string;
    type: string;
    priority: string;
    status: string;
    location: string;
    latitude?: number;
    longitude?: number;
    occurred_at: string;
    created_at: string;
    involved_parties?: string[];
    witnesses?: string[];
    actions_taken?: string;
    follow_up_required?: string;
    reported_by: {
        user: {
            name: string;
        };
        badge_number: string;
        rank: string;
        team?: {
            name: string;
            sector: string;
        };
    };
    media: IncidentMedia[];
}

interface Props {
    incident: Incident;
    [key: string]: unknown;
}

export default function ShowIncident({ incident }: Props) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [status, setStatus] = useState(incident.status);
    const [actionsTaken, setActionsTaken] = useState(incident.actions_taken || '');
    const [followUp, setFollowUp] = useState(incident.follow_up_required || '');

    const handleStatusUpdate = () => {
        setIsUpdating(true);
        
        router.put(route('incidents.update', incident.id), {
            status,
            actions_taken: actionsTaken,
            follow_up_required: followUp,
        }, {
            onSuccess: () => {
                setIsUpdating(false);
            },
            onError: () => {
                setIsUpdating(false);
            },
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
            <Head title={`Incident ${incident.incident_number}`} />
            
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center space-x-3 mb-2">
                            <Link
                                href={route('incidents.index')}
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                ← Back to Incidents
                            </Link>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {getTypeIcon(incident.type)} {incident.title}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Incident #{incident.incident_number}
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className={`px-4 py-2 text-sm font-medium rounded-full border ${getStatusColor(incident.status)}`}>
                            {incident.status.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className={`px-4 py-2 text-sm font-medium rounded-full border ${getPriorityColor(incident.priority)}`}>
                            {incident.priority.toUpperCase()} PRIORITY
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Incident Details */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Incident Details</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Type
                                    </label>
                                    <p className="text-gray-900 dark:text-white capitalize">
                                        {incident.type.replace('_', ' ')}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Occurred At
                                    </label>
                                    <p className="text-gray-900 dark:text-white">
                                        {new Date(incident.occurred_at).toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Location
                                    </label>
                                    <p className="text-gray-900 dark:text-white">
                                        📍 {incident.location}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Reported At
                                    </label>
                                    <p className="text-gray-900 dark:text-white">
                                        {new Date(incident.created_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Description
                                </label>
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                                        {incident.description}
                                    </p>
                                </div>
                            </div>

                            {/* People Involved */}
                            {(incident.involved_parties?.length || incident.witnesses?.length) && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {incident.involved_parties && incident.involved_parties.length > 0 && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Involved Parties
                                            </label>
                                            <div className="space-y-2">
                                                {incident.involved_parties.map((party, index) => (
                                                    <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                                        <p className="text-gray-900 dark:text-white">{party}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {incident.witnesses && incident.witnesses.length > 0 && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Witnesses
                                            </label>
                                            <div className="space-y-2">
                                                {incident.witnesses.map((witness, index) => (
                                                    <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                                        <p className="text-gray-900 dark:text-white">{witness}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Media Evidence */}
                        {incident.media.length > 0 && (
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Evidence & Media</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {incident.media.map((media) => (
                                        <div key={media.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <span className="text-2xl">
                                                    {media.type === 'photo' ? '📸' : media.type === 'video' ? '🎥' : '📄'}
                                                </span>
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                                                        {media.original_name}
                                                    </p>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                                                        {media.type}
                                                    </p>
                                                </div>
                                            </div>
                                            {media.description && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                                    {media.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actions & Follow-up */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Actions & Follow-up</h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Actions Taken
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={actionsTaken}
                                        onChange={(e) => setActionsTaken(e.target.value)}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="Describe actions taken in response to this incident..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Follow-up Required
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={followUp}
                                        onChange={(e) => setFollowUp(e.target.value)}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="Any additional actions or follow-up needed..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Status Update */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Update Status</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Current Status
                                    </label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="open">Open</option>
                                        <option value="investigating">Investigating</option>
                                        <option value="resolved">Resolved</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>

                                <button
                                    onClick={handleStatusUpdate}
                                    disabled={isUpdating}
                                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                                >
                                    {isUpdating ? 'Updating...' : 'Update Incident'}
                                </button>
                            </div>
                        </div>

                        {/* Reporter Information */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Reported By</h3>
                            
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                    <span className="text-2xl">👮</span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {incident.reported_by.user.name}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {incident.reported_by.rank}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center space-x-2">
                                    <span>🏷️</span>
                                    <span>Badge #{incident.reported_by.badge_number}</span>
                                </div>
                                
                                {incident.reported_by.team && (
                                    <>
                                        <div className="flex items-center space-x-2">
                                            <span>👥</span>
                                            <span>{incident.reported_by.team.name}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span>🏢</span>
                                            <span>{incident.reported_by.team.sector}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* GPS Coordinates */}
                        {(incident.latitude && incident.longitude) && (
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">GPS Location</h3>
                                
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Latitude:</span>
                                        <span className="text-gray-900 dark:text-white font-mono">
                                            {incident.latitude.toFixed(6)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Longitude:</span>
                                        <span className="text-gray-900 dark:text-white font-mono">
                                            {incident.longitude.toFixed(6)}
                                        </span>
                                    </div>
                                </div>
                                
                                <a
                                    href={`https://www.google.com/maps?q=${incident.latitude},${incident.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-green-600 text-white text-center px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors mt-4"
                                >
                                    📍 View on Map
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}