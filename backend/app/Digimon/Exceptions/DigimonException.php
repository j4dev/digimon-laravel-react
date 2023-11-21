<?php
namespace App\Digimon\Exceptions;

use Exception;

class DigimonException extends Exception
{
    protected $statusCode;
    protected $details;

    public function __construct($message, $statusCode = 500,$details = null)
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
