<?php

use App\Auth\AuthController;
use App\Digimon\DigimonController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/

// Digimons V1 api routes
Route::group([
    "middleware" => ["auth:api"],
    "prefix" => "v1",
], function () {
    //  Get all digmons
    Route::get('digimons', [DigimonController::class, 'getDigimons']);

    // Get Digimon by Id
    Route::get('digimons/{id}', [DigimonController::class, 'getDigimonById']);

    Route::get("user/profile", [AuthController::class, "profile"]);
    Route::get("user/refresh", [AuthController::class, "refreshToken"]);
    Route::get("user/logout", [AuthController::class, "logout"]);
});


Route::group([
    "prefix" => "v1",
], function () {

    // Users operations
    Route::post("user/register", [AuthController::class, "register"]);
    Route::post("user/login", [AuthController::class, "login"]);
});

// Email routing
Route::get('/email/verify', function () {
    return view('auth.verify-email');
})->middleware('auth')->name('verification.notice');


Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return redirect('/home');
})->middleware(['auth', 'signed'])->name('verification.verify');


Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');
