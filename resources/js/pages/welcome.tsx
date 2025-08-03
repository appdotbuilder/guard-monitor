import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="SecurePatrol - Security Monitoring System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-sm shadow-sm dark:bg-gray-900/80">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">🛡️</span>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SecurePatrol</h1>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex space-x-3">
                                        <Link
                                            href={route('login')}
                                            className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors dark:text-gray-300 dark:hover:text-blue-400"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-16">
                        <div className="mb-6">
                            <span className="text-6xl">🛡️</span>
                        </div>
                        <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            Advanced Security Patrol
                            <span className="block text-blue-600">& Area Monitoring</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                            Comprehensive security management system for incident reporting, team coordination, 
                            and real-time monitoring. Keep your facilities safe with professional-grade tools.
                        </p>
                        {!auth.user && (
                            <div className="flex justify-center space-x-4">
                                <Link 
                                    href={route('register')}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                                >
                                    Get Started Free
                                </Link>
                                <Link 
                                    href={route('login')}
                                    className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
                                >
                                    Sign In
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">📋</div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Incident Reporting</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Quick and detailed incident reporting with photo/video uploads, GPS location tracking, 
                                and priority classification for immediate response.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">👥</div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Team Management</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Organize security guards into teams by sector and shift. Track certifications, 
                                assignments, and performance across your entire security force.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">🔔</div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Real-time Alerts</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Instant notifications for new incidents, status updates, and team assignments. 
                                Never miss critical security events with priority-based alerting.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">📸</div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Media Evidence</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Upload photos, videos, and documents as incident evidence. Secure cloud storage 
                                with organized file management for legal and insurance purposes.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">🗺️</div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Location Tracking</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                GPS-enabled incident reporting with precise location data. Map view of all incidents 
                                for pattern analysis and strategic patrol planning.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Analytics Dashboard</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Comprehensive reporting and analytics. Track incident trends, response times, 
                                and team performance with detailed insights and exportable reports.
                            </p>
                        </div>
                    </div>

                    {/* Stats Section */}
                    {auth.user && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-16">
                            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
                                Your Security Operations at a Glance
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                                    <div className="text-gray-600 dark:text-gray-300">Monitoring</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600 mb-2">∞</div>
                                    <div className="text-gray-600 dark:text-gray-300">Incidents Tracked</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-600 mb-2">🚀</div>
                                    <div className="text-gray-600 dark:text-gray-300">Fast Response</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-orange-600 mb-2">🔒</div>
                                    <div className="text-gray-600 dark:text-gray-300">Secure Platform</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CTA Section */}
                    <div className="text-center bg-blue-600 rounded-xl p-12 text-white">
                        <h3 className="text-3xl font-bold mb-4">Ready to Secure Your Operations?</h3>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Join security professionals who trust SecurePatrol for comprehensive incident management 
                            and team coordination. Start protecting what matters most.
                        </p>
                        {!auth.user ? (
                            <Link 
                                href={route('register')}
                                className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                            >
                                Start Your Free Trial
                            </Link>
                        ) : (
                            <Link 
                                href={route('dashboard')}
                                className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                            >
                                Go to Dashboard
                            </Link>
                        )}
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-gray-400">
                            Built with ❤️ for security professionals by{" "}
                            <a 
                                href="https://app.build" 
                                target="_blank" 
                                className="text-blue-400 hover:text-blue-300 font-medium"
                            >
                                app.build
                            </a>
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}