<?php

namespace App\Digimon\Exceptions;

use Exception;
use Illuminate\Http\Response;

class DigimonException extends Exception
{
    protected $statusCode;
    protected $details;

    public function __construct($message, $statusCode = Response::HTTP_INTERNAL_SERVER_ERROR, $details = null)
    {
        parent::__construct($message);
        $this->statusCode = $statusCode;
        $this->details = $details;
    }

    public function render()
    {
        $response = ['message' => $this->getMessage()];

        if ($this->details !== null) {
            $response['details'] = $this->details;
        }

        return response()->json($response, $this->statusCode);
    }
}
