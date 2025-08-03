<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Team>
 */
class TeamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $shifts = ['morning', 'afternoon', 'night'];
        $sectors = ['Building A', 'Building B', 'Parking Lot', 'Main Entrance', 'Perimeter', 'Reception'];

        return [
            'name' => fake()->words(2, true) . ' Team',
            'description' => fake()->sentence(),
            'sector' => fake()->randomElement($sectors),
            'shift' => fake()->randomElement($shifts),
            'max_members' => fake()->numberBetween(3, 8),
            'is_active' => true,
        ];
    }

    /**
     * Indicate that the team is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}