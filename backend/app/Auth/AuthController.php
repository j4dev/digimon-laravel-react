<?php

namespace App\Auth;

use App\Auth\Models\User;
use App\Digimon\Exceptions\DigimonException;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        $validationRules = [
            "name" => "required",
            "email" => "required|email|unique:users",
            "password" => "required"
        ];
        $this->validateRequest($request, $validationRules);

        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => Hash::make($request->password)
        ]);

        event(new Registered($user));
        return response()->json([
            "message" => "Usuario registrado correctamente"
        ], Response::HTTP_CREATED);
    }

    public function login(Request $request)
    {

        $validationRules = [
            "email" => "required|email",
            "password" => "required"
        ];
        $this->validateRequest($request, $validationRules);

        $token = JWTAuth::attempt([
            "email" => $request->email,
            "password" => $request->password
        ]);

        if (empty($token)) {
            throw new DigimonException('No se pudo iniciar sesión.', Response::HTTP_UNAUTHORIZED);
        }

        return response()->json([
            "message" => "Usuario logeado correctamente",
            "token" => $token
        ]);
    }

    public function profile()
    {
        $userdata = auth()->user();

        return response()->json(
            $userdata
        );
    }

    public function refreshToken()
    {
        $newToken = auth()->refresh();

        return response()->json([
            "token" => $newToken
        ]);
    }

    public function logout()
    {

        auth()->logout();

        return response()->json([
            "message" => "Se ha cerrado sesión correctamente"
        ]);
    }

    private function validateRequest(Request $request, array $validationRules)
    {
        $validator = Validator::make($request->all(), $validationRules);
        if ($validator->fails()) {
            throw new DigimonException('Parametros inválidos.', Response::HTTP_BAD_REQUEST, $validator->errors());
        }
    }
}
