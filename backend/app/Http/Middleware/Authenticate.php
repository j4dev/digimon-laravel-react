<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        var_dump(env("LOGIN_URL"));
        //return $request->expectsJson() ? null : env("LOGIN_URL");
        return $request->expectsJson() ? null : "https://front-uta4.onrender.com";
    }
}
