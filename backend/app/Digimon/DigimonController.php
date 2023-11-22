<?php

namespace App\Digimon;

use App\Digimon\Exceptions\DigimonException;
use App\Digimon\Models\Digimon;
use App\Digimon\Models\DigimonInfo;
use App\Digimon\Models\Pagination;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

const MIN_PAGE_NUMBER = 1;
const MIN_PAGE_SIZE = 1;
const PAGE_NUMBER_OFFSET = 1;
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
            "currentPage" => $pageable["currentPage"] + PAGE_NUMBER_OFFSET,
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

    public function getDigimonById(Request $request, $id)
    {
        $digimonInfo = $this->fetchDigimonById($id);
        $digimon = DigimonInfo::make($digimonInfo);

        return $digimon;
    }

    private function fetchDigimons(?int $pageNumber = null, ?int $pageSize = null)
    {
        if (($pageNumber !== null && $pageNumber < MIN_PAGE_NUMBER) || ($pageSize !== null && $pageSize < MIN_PAGE_NUMBER))
            throw new DigimonException('Datos no encontrada.', Response::HTTP_NOT_FOUND);

        $apiUrl = env("API_URL") . "?" . http_build_query([
            'page' => $pageNumber !== null ? ($pageNumber - PAGE_NUMBER_OFFSET) : $pageNumber,
            'pageSize' => $pageSize
        ]);

        $client = new Client();
        $response = $client->get($apiUrl);
        if ($response->getStatusCode() !== Response::HTTP_OK)
            throw new DigimonException('Ha ocurrido un error inesperado.', Response::HTTP_BAD_GATEWAY);

        $data = json_decode($response->getBody(), true);

        return $data;
    }

    private function fetchDigimonById(int $id)
    {
        if ($id === null || $id < PAGE_NUMBER_OFFSET) {
            throw new DigimonException('Digimon no encontrado.', Response::HTTP_NOT_FOUND);
        }

        $apiUrl = env("API_URL") . "/" . $id;

        $client = new Client();
        $response = $client->get($apiUrl);
        if ($response->getStatusCode() !== Response::HTTP_OK)
            throw new DigimonException('Ha ocurrido un error inesperado.', Response::HTTP_BAD_GATEWAY);

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

        return (int)$pageNumber + PAGE_NUMBER_OFFSET;
    }

    private function validateParams(Request $request)
    {
        $validationRules = [
            'page' => 'numeric',
            'pageSize' => 'numeric'
        ];

        $validator = Validator::make($request->all(), $validationRules);
        if ($validator->fails()) {
            throw new DigimonException('Parametros inválidos.', Response::HTTP_BAD_REQUEST, $validator->errors());
        }
    }
}
