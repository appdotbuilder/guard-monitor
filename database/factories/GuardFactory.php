<?php

namespace Database\Factories;

use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Guard>
 */
class GuardFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $ranks = ['Security Officer', 'Senior Officer', 'Supervisor', 'Lead Guard', 'Security Specialist'];
        $certifications = [
            'First Aid Certified',
            'CPR Certified',
            'Security License',
            'Fire Safety Training',
            'Emergency Response',
        ];

        return [
            'user_id' => User::factory(),
            'team_id' => Team::factory(),
            'badge_number' => 'SG-' . fake()->unique()->numberBetween(1000, 9999),
            'rank' => fake()->randomElement($ranks),
            'phone' => fake()->phoneNumber(),
            'emergency_contact' => fake()->name() . ' - ' . fake()->phoneNumber(),
            'status' => 'active',
            'hire_date' => fake()->dateTimeBetween('-2 years', '-1 month'),
            'certifications' => fake()->randomElements($certifications, random_int(2, 4)),
        ];
    }

    /**
     * Indicate that the guard is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inactive',
        ]);
    }

    /**
     * Indicate that the guard is on leave.
     */
    public function onLeave(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'on_leave',
        ]);
    }
}