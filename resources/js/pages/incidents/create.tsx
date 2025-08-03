import { AppShell } from '@/components/app-shell';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function CreateIncident() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: '',
        priority: 'medium',
        location: '',
        latitude: '',
        longitude: '',
        occurred_at: '',
        involved_parties: [''],
        witnesses: [''],
        actions_taken: '',
        follow_up_required: '',
    });
    
    const [files, setFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleArrayChange = (field: 'involved_parties' | 'witnesses', index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }));
    };

    const addArrayItem = (field: 'involved_parties' | 'witnesses') => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }));
    };

    const removeArrayItem = (field: 'involved_parties' | 'witnesses', index: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData(prev => ({
                        ...prev,
                        latitude: position.coords.latitude.toString(),
                        longitude: position.coords.longitude.toString(),
                    }));
                },
                (error) => {
                    console.error('Error getting location:', error);
                    alert('Unable to get your location. Please enter manually if needed.');
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = new FormData();
        
        // Add form fields
        Object.entries(formData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                // Filter out empty strings from arrays
                const filteredArray = value.filter(item => item.trim() !== '');
                if (filteredArray.length > 0) {
                    submitData.append(key, JSON.stringify(filteredArray));
                }
            } else if (value) {
                submitData.append(key, value);
            }
        });

        // Add files
        files.forEach((file, index) => {
            submitData.append(`media[${index}]`, file);
        });

        router.post(route('incidents.store'), submitData, {
            onSuccess: () => {
                setIsSubmitting(false);
            },
            onError: (errors) => {
                setErrors(errors);
                setIsSubmitting(false);
            },
            forceFormData: true,
        });
    };



    return (
        <AppShell>
            <Head title="Report Incident" />
            
            <div className="p-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            🚨 Report New Incident
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Provide detailed information about the security incident
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Information */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Basic Information</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Incident Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="Brief description of the incident"
                                        required
                                    />
                                    {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Incident Type *
                                    </label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => handleInputChange('type', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        required
                                    >
                                        <option value="">Select incident type</option>
                                        <option value="theft">🚨 Theft</option>
                                        <option value="vandalism">💥 Vandalism</option>
                                        <option value="suspicious_activity">👁️ Suspicious Activity</option>
                                        <option value="safety_hazard">⚠️ Safety Hazard</option>
                                        <option value="medical_emergency">🏥 Medical Emergency</option>
                                        <option value="fire">🔥 Fire</option>
                                        <option value="other">📋 Other</option>
                                    </select>
                                    {errors.type && <p className="text-red-600 text-sm mt-1">{errors.type}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Priority Level *
                                    </label>
                                    <select
                                        value={formData.priority}
                                        onChange={(e) => handleInputChange('priority', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="low">🟢 Low</option>
                                        <option value="medium">🟡 Medium</option>
                                        <option value="high">🟠 High</option>
                                        <option value="critical">🔴 Critical</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Date & Time Occurred *
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={formData.occurred_at}
                                        onChange={(e) => handleInputChange('occurred_at', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        required
                                    />
                                    {errors.occurred_at && <p className="text-red-600 text-sm mt-1">{errors.occurred_at}</p>}
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Detailed Description *
                                </label>
                                <textarea
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="Provide a detailed description of what happened..."
                                    required
                                />
                                {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                            </div>
                        </div>

                        {/* Location Information */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Location Information</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Location Description *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => handleInputChange('location', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="e.g., Building A, Floor 2, Room 205"
                                        required
                                    />
                                    {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location}</p>}
                                </div>

                                <div className="flex items-end">
                                    <button
                                        type="button"
                                        onClick={getCurrentLocation}
                                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        📍 Get GPS Location
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Latitude
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.latitude}
                                        onChange={(e) => handleInputChange('latitude', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="Auto-filled by GPS"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Longitude
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.longitude}
                                        onChange={(e) => handleInputChange('longitude', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="Auto-filled by GPS"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* People Involved */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">People Involved</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Involved Parties
                                    </label>
                                    {formData.involved_parties.map((party, index) => (
                                        <div key={index} className="flex space-x-2 mb-2">
                                            <input
                                                type="text"
                                                value={party}
                                                onChange={(e) => handleArrayChange('involved_parties', index, e.target.value)}
                                                className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                placeholder="Name and details of person involved"
                                            />
                                            {formData.involved_parties.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeArrayItem('involved_parties', index)}
                                                    className="text-red-600 hover:text-red-700 px-2"
                                                >
                                                    ❌
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem('involved_parties')}
                                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                    >
                                        + Add Another Person
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Witnesses
                                    </label>
                                    {formData.witnesses.map((witness, index) => (
                                        <div key={index} className="flex space-x-2 mb-2">
                                            <input
                                                type="text"
                                                value={witness}
                                                onChange={(e) => handleArrayChange('witnesses', index, e.target.value)}
                                                className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                placeholder="Name and contact info of witness"
                                            />
                                            {formData.witnesses.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeArrayItem('witnesses', index)}
                                                    className="text-red-600 hover:text-red-700 px-2"
                                                >
                                                    ❌
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem('witnesses')}
                                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                    >
                                        + Add Another Witness
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Actions & Follow-up */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Actions & Follow-up</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Actions Taken
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={formData.actions_taken}
                                        onChange={(e) => handleInputChange('actions_taken', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="Describe any immediate actions taken..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Follow-up Required
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={formData.follow_up_required}
                                        onChange={(e) => handleInputChange('follow_up_required', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="Any additional actions needed..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Media Upload */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Evidence & Media</h2>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Upload Photos, Videos, or Documents
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,video/*,.pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                    You can upload multiple files. Supported formats: Images, Videos, PDF, Word documents (max 10MB each)
                                </p>
                                {files.length > 0 && (
                                    <div className="mt-4">
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Selected files ({files.length}):
                                        </p>
                                        <div className="space-y-1">
                                            {files.map((file, index) => (
                                                <div key={index} className="text-sm text-gray-600 dark:text-gray-400">
                                                    📎 {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => router.get(route('incidents.index'))}
                                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-red-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Submitting...' : '🚨 Submit Incident Report'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}