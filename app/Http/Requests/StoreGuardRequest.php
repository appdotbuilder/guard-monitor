<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGuardRequest extends FormRequest
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
            'user_id' => 'required|exists:users,id',
            'team_id' => 'nullable|exists:teams,id',
            'badge_number' => 'required|string|unique:guards,badge_number',
            'rank' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'emergency_contact' => 'nullable|string',
            'hire_date' => 'required|date',
            'certifications' => 'nullable|array',
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
            'user_id.required' => 'Please select a user.',
            'user_id.exists' => 'Selected user does not exist.',
            'badge_number.required' => 'Badge number is required.',
            'badge_number.unique' => 'This badge number is already assigned.',
            'rank.required' => 'Guard rank is required.',
            'hire_date.required' => 'Hire date is required.',
        ];
    }
}