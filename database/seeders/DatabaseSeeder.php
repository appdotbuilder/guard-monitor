<?php

namespace Database\Seeders;

use App\Models\Guard;
use App\Models\Incident;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $adminUser = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@securepatrol.com',
        ]);

        // Create test users
        $testUser = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create teams
        $teams = Team::factory(6)->create();

        // Create guard users and profiles
        $guardUsers = User::factory(15)->create();
        
        foreach ($guardUsers as $user) {
            Guard::factory()->create([
                'user_id' => $user->id,
                'team_id' => $teams->random()->id,
            ]);
        }

        // Create admin guard profile
        Guard::factory()->create([
            'user_id' => $adminUser->id,
            'team_id' => $teams->first()->id,
            'badge_number' => 'SG-0001',
            'rank' => 'Security Chief',
        ]);

        // Create test user guard profile
        Guard::factory()->create([
            'user_id' => $testUser->id,
            'team_id' => $teams->random()->id,
            'badge_number' => 'SG-0002',
            'rank' => 'Security Officer',
        ]);

        // Create incidents
        $guards = Guard::all();
        
        // Create recent incidents (last 30 days)
        Incident::factory(25)->create([
            'reported_by' => $guards->random()->id,
        ]);

        // Create some high priority incidents
        Incident::factory(5)->highPriority()->create([
            'reported_by' => $guards->random()->id,
        ]);

        // Create critical incidents
        Incident::factory(2)->critical()->open()->create([
            'reported_by' => $guards->random()->id,
        ]);
    }
}