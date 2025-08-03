<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreIncidentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|in:theft,vandalism,suspicious_activity,safety_hazard,medical_emergency,fire,other',
            'priority' => 'required|in:low,medium,high,critical',
            'location' => 'required|string|max:255',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'occurred_at' => 'required|date',
            'involved_parties' => 'nullable|array',
            'witnesses' => 'nullable|array',
            'actions_taken' => 'nullable|string',
            'follow_up_required' => 'nullable|string',
            'media' => 'nullable|array',
            'media.*' => 'file|max:10240|mimes:jpg,jpeg,png,gif,mp4,mov,avi,pdf,doc,docx',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Incident title is required.',
            'description.required' => 'Please provide a detailed description of the incident.',
            'type.required' => 'Please select an incident type.',
            'priority.required' => 'Please select the incident priority.',
            'location.required' => 'Location is required.',
            'occurred_at.required' => 'Please specify when the incident occurred.',
            'media.*.max' => 'Each file must be smaller than 10MB.',
            'media.*.mimes' => 'Invalid file type. Please upload images, videos, or documents only.',
        ];
    }
}