<?php

namespace App\Auth\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Symfony\Component\HttpFoundation\Response;

class AuthError
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        var_dump("HOLA");
        $response = $next($request);

        if ($response->status() !== HttpResponse::HTTP_OK) {
            return response()->json(['error' => 'Error de autenticación personalizado'], 401);
        }

        return $response;
    }
}
