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
        Schema::create('incidents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reported_by')->constrained('guards')->onDelete('cascade');
            $table->string('incident_number')->unique()->comment('Auto-generated incident ID');
            $table->string('title');
            $table->text('description');
            $table->enum('type', ['theft', 'vandalism', 'suspicious_activity', 'safety_hazard', 'medical_emergency', 'fire', 'other']);
            $table->enum('priority', ['low', 'medium', 'high', 'critical'])->default('medium');
            $table->enum('status', ['open', 'investigating', 'resolved', 'closed'])->default('open');
            $table->string('location');
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->timestamp('occurred_at');
            $table->json('involved_parties')->nullable()->comment('People involved in the incident');
            $table->json('witnesses')->nullable()->comment('Witness information');
            $table->text('actions_taken')->nullable();
            $table->text('follow_up_required')->nullable();
            $table->timestamps();
            
            // Indexes for performance
            $table->index('incident_number');
            $table->index('type');
            $table->index('priority');
            $table->index('status');
            $table->index('location');
            $table->index('occurred_at');
            $table->index(['status', 'priority', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incidents');
    }
};