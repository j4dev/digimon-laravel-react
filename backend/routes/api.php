<?php

use App\Auth\AuthController;
use App\Digimon\DigimonController;
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
Route::prefix('v1')->group(function () {
    //  Get all digmons
    Route::get('digimons', [DigimonController::class, 'getDigimons']);

    // Get Digimon by Id
    Route::get('digimons/{id}', [DigimonController::class, 'getDigimonById']);

    // Users operations
    Route::post("user/register", [AuthController::class, "register"]);
    Route::post("user/login", [AuthController::class, "login"]);
});

Route::group([
    "middleware" => ["auth:api"],
    "prefix" => "v1/user",
], function () {

    Route::get("profile", [AuthController::class, "profile"]);
    Route::get("refresh", [AuthController::class, "refreshToken"]);
    Route::get("logout", [AuthController::class, "logout"]);
});
