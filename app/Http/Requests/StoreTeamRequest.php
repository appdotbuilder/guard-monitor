<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTeamRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'sector' => 'required|string|max:255',
            'shift' => 'required|in:morning,afternoon,night',
            'max_members' => 'required|integer|min:1|max:20',
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
            'name.required' => 'Team name is required.',
            'sector.required' => 'Please specify the sector this team covers.',
            'shift.required' => 'Please select a shift.',
            'max_members.required' => 'Please specify the maximum number of team members.',
            'max_members.min' => 'A team must have at least 1 member.',
            'max_members.max' => 'A team cannot have more than 20 members.',
        ];
    }
}