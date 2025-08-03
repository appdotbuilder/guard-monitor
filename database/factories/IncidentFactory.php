<?php

namespace Database\Factories;

use App\Models\Guard;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Incident>
 */
class IncidentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['theft', 'vandalism', 'suspicious_activity', 'safety_hazard', 'medical_emergency', 'fire', 'other'];
        $priorities = ['low', 'medium', 'high', 'critical'];
        $statuses = ['open', 'investigating', 'resolved', 'closed'];
        $locations = [
            'Building A - Main Entrance',
            'Building B - Floor 2',
            'Parking Lot - Section C',
            'Reception Area',
            'Loading Dock',
            'Cafeteria',
            'Emergency Exit - East Wing'
        ];

        $type = fake()->randomElement($types);
        $incidentCount = \App\Models\Incident::count();
        
        return [
            'reported_by' => Guard::factory(),
            'incident_number' => 'INC-' . date('Y') . '-' . str_pad((string)($incidentCount + 1), 6, '0', STR_PAD_LEFT),
            'title' => $this->generateTitleByType($type),
            'description' => fake()->paragraphs(2, true),
            'type' => $type,
            'priority' => fake()->randomElement($priorities),
            'status' => fake()->randomElement($statuses),
            'location' => fake()->randomElement($locations),
            'latitude' => fake()->latitude(40.7, 40.8),
            'longitude' => fake()->longitude(-74.1, -73.9),
            'occurred_at' => fake()->dateTimeBetween('-30 days', 'now'),
            'involved_parties' => fake()->randomElements([
                'John Doe - Visitor',
                'Jane Smith - Employee',
                'Unknown individual',
                'Contractor - ABC Company'
            ], random_int(0, 2)),
            'witnesses' => fake()->randomElements([
                'Mary Johnson - Security Guard',
                'Bob Wilson - Maintenance',
                'Sarah Brown - Receptionist'
            ], random_int(0, 2)),
            'actions_taken' => fake()->sentence(),
            'follow_up_required' => fake()->boolean(30) ? fake()->sentence() : null,
        ];
    }

    /**
     * Generate a title based on incident type.
     */
    protected function generateTitleByType(string $type): string
    {
        $titles = [
            'theft' => [
                'Laptop stolen from office',
                'Unauthorized removal of equipment',
                'Missing inventory items',
                'Wallet theft reported'
            ],
            'vandalism' => [
                'Graffiti on building wall',
                'Broken window in parking area',
                'Damaged security camera',
                'Vandalized company vehicle'
            ],
            'suspicious_activity' => [
                'Unidentified person loitering',
                'Unusual activity after hours',
                'Suspicious vehicle in parking',
                'Person taking unauthorized photos'
            ],
            'safety_hazard' => [
                'Wet floor causing slip risk',
                'Broken glass in walkway',
                'Electrical hazard reported',
                'Blocked emergency exit'
            ],
            'medical_emergency' => [
                'Employee collapse in office',
                'Visitor injury in lobby',
                'Chest pain reported',
                'Allergic reaction incident'
            ],
            'fire' => [
                'Small electrical fire contained',
                'Smoke detected in storage room',
                'Fire alarm activation',
                'Overheated equipment smoking'
            ],
            'other' => [
                'Noise complaint from neighbors',
                'Lost keys security concern',
                'System malfunction reported',
                'General security matter'
            ]
        ];

        return fake()->randomElement($titles[$type] ?? $titles['other']);
    }

    /**
     * Indicate that the incident is open.
     */
    public function open(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'open',
        ]);
    }

    /**
     * Indicate that the incident is high priority.
     */
    public function highPriority(): static
    {
        return $this->state(fn (array $attributes) => [
            'priority' => 'high',
        ]);
    }

    /**
     * Indicate that the incident is critical.
     */
    public function critical(): static
    {
        return $this->state(fn (array $attributes) => [
            'priority' => 'critical',
        ]);
    }
}