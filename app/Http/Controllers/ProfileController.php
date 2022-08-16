<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\JsonResponse;

class ProfileController extends Controller
{
    /**
     * Update user
     *
     * @param ProfileUpdateRequest $request
     * @return JsonResponse
     */
    public function update(ProfileUpdateRequest $request): JsonResponse
    {
        $user = $request->user();
        $user->fill([
            'name' => $request->input('name'),
            'email' => $request->input('email')
        ]);

        if ($request->input('password')) {
            $user->password = bcrypt($request->input('password'));
        }

        $user->save();
        return response()->json(compact('user'));
    }
}
