<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class ProfileController extends Controller
{
    /**
     * Update user
     *
     * @param  Request $request
     * @return App\User
     */
    public function update(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:191',
            'email' => 'required|string|email|max:191|unique:users,email,' . $request->user()->id,
            'password' => 'nullable|string|min:6|confirmed'
        ];

        $this->validate($request, $rules);

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
