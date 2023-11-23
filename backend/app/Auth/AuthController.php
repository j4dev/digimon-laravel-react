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

/**
 * @OA\Tag(
 *     name="Authentication",
 *     description="Auth para usuarios por api",
 * )
 */
class AuthController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/v1/user/register",
     *     operationId="register",
     *     tags={"Authentication"},
     *     summary="Registrar un nuevo usuario",
     *     @OA\RequestBody(
     *         required=true,
     *         description="Información de usuario.",
     *          @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(ref="#/components/schemas/User")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Usuario registrado correctamente",
     *         @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Usuario registrado correctamente")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Parametros inválidos.",
     *     ),
     * )
     */
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

    /**
     * @OA\Post(
     *     path="/api/v1/user/login",
     *     operationId="login",
     *     tags={"Authentication"},
     *     summary="Login con credenciales existentes",
     *     @OA\RequestBody(
     *         required=true,
     *         description="User login information",
     *          @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                @OA\Property(property="email", type="string", required={"email"}),
     *                @OA\Property(property="password", type="string", required={"password"})
     *              )
     *          )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User logged in successfully",
     *         @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Usuario logeado correctamente"),
     *              @OA\Property(property="token", type="string", example="eyJ0eXAi.......")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="No se pudo iniciar sesión.",
     *     ),
     * )
     */
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

    /**
     * @OA\Get(
     *     path="/api/v1/user/logout",
     *     operationId="logout",
     *     tags={"Authentication"},
     *     summary="Logout usuario",
     *      @OA\Parameter(
     *         name="Authorization",
     *         in="header",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             format="Bearer {token}",
     *         ),
     *         description="JWT para verificación de usiaro",
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Se ha cerrado sesión correctamente",
     *     ),
     * )
     *   @OA\SecurityScheme(
     *     type="http",
     *     name="Authorization",
     *     description="JWT Token",
     *     in="header",
     *     scheme="bearer",
     *     bearerFormat="JWT",
     *     securityScheme="apiAuth",
     * )
     */
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
