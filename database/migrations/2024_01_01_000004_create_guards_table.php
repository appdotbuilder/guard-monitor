<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('guards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('team_id')->nullable()->constrained()->onDelete('set null');
            $table->string('badge_number')->unique();
            $table->string('rank')->comment('Guard rank or position');
            $table->string('phone')->nullable();
            $table->text('emergency_contact')->nullable();
            $table->enum('status', ['active', 'inactive', 'on_leave'])->default('active');
            $table->date('hire_date');
            $table->json('certifications')->nullable()->comment('Security certifications');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('badge_number');
            $table->index('rank');
            $table->index('status');
            $table->index(['team_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guards');
    }
};