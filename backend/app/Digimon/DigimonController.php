<?php

namespace App\Digimon;

use App\Digimon\Exceptions\DigimonException;
use App\Digimon\Models\Digimon;
use App\Digimon\Models\Pagination;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DigimonController extends Controller
{

    public function getDigimons(Request $request)
    {
        $this->validateParams($request);

        $digimons = [];
        $pageNumber = $request->input('page');
        $pageSize = $request->input('pageSize');
        $apiResponse = $this->fetchDigimons($pageNumber, $pageSize);

        foreach ($apiResponse["content"] as $digimonData) {
            $digimon = Digimon::make($digimonData);
            array_push($digimons, $digimon);
        }

        $pageable = $apiResponse["pageable"];
        $pagination = Pagination::make([
            "currentPage" => $pageable["currentPage"] + 1,
            "elementsOnPage" => $pageable["elementsOnPage"],
            "totalElements" => $pageable["totalElements"],
            "totalPages" => $pageable["totalPages"],
            "previousPage" => $this->getPageNumberFromUrl($pageable["previousPage"]),
            "nextPage" => $this->getPageNumberFromUrl($pageable["nextPage"])
        ]);

        return array(
            "digimons" => $digimons,
            "pagination" => $pagination
        );
    }

    private function fetchDigimons(?int $pageNumber = null, ?int $pageSize = null)
    {
        if (($pageNumber !== null && $pageNumber < 1) || ($pageSize !== null && $pageSize < 1)) {
            throw new DigimonException('Datos no encontrada.', 404);
        }

        $apiUrl = env("API_URL") . "?" . http_build_query([
            'page' => $pageNumber !== null ? ($pageNumber - 1) : $pageNumber,
            'pageSize' => $pageSize
        ]);

        $client = new Client();
        $response = $client->get($apiUrl);
        $data = json_decode($response->getBody(), true);

        return $data;
    }

    private function getPageNumberFromUrl(?string $url)
    {
        if ($url === "" || $url === null) {
            return "";
        }
        $urlComponents = parse_url($url);
        parse_str($urlComponents['query'], $queryParameters);
        $pageNumber = isset($queryParameters['page']) ? $queryParameters['page'] : null;

        return (int)$pageNumber + 1;
    }

    private function validateParams(Request $request)
    {
        $validationRules = [
            'page' => 'numeric',
            'pageSize' => 'numeric'
        ];

        $validator = Validator::make($request->all(), $validationRules);
        if ($validator->fails()) {
            throw new DigimonException('Parametros inválidos.', 400, $validator->errors());
        }
    }
}
