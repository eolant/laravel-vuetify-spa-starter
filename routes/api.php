<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['guest:api']], function () {
    Route::post('login', [LoginController::class, 'login']);
    Route::post('login/refresh', [LoginController::class, 'refresh']);

    Route::post('password/email', [ForgotPasswordController::class, 'sendResetLinkEmail']);
    Route::post('password/reset', [ResetPasswordController::class, 'reset']);

    Route::post('register', [RegisterController::class, 'register']);
});

Route::group(['middleware' => ['jwt']], function () {
    Route::post('logout', [LoginController::class, 'logout']);

    Route::get('me', [LoginController::class, 'me']);
    Route::put('profile', [ProfileController::class, 'update']);
});

