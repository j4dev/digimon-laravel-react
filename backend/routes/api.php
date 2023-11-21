<?php

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

});
