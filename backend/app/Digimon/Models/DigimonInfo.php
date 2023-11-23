<?php

namespace App\Digimon\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Digimon Info
 * @OA\Schema(
 *     title="digimon_info",
 * )
 */
class DigimonInfo extends Model
{
    /**
     *@OA\Property(
     *       property="id",
     *       type="number"
     *   ),
     *@OA\Property(
     *       property="name",
     *       type="string"
     *   ),
     *@OA\Property(
     *       property="images",
     *       type="array",
     *  @OA\Items(
     *         type="object",
     *         @OA\Property(property="href", type="string"),
     *         @OA\Property(property="transparent", type="string")
     *     )
     *   ),
     * @OA\Property(
     *       property="levels",
     *       type="array",
     *      @OA\Items(
     *         type="object",
     *         @OA\Property(property="id", type="number"),
     *         @OA\Property(property="level", type="string")
     *     )
     *   ),
     *@OA\Property(
     *       property="types",
     *       type="array",
     *     @OA\Items(
     *         type="object",
     *         @OA\Property(property="id", type="number"),
     *         @OA\Property(property="type", type="string")
     *     )
     *   ),
     *@OA\Property(
     *       property="attributes",
     *       type="array",
     *      @OA\Items(
     *         type="object",
     *         @OA\Property(property="id", type="number"),
     *         @OA\Property(property="attribute", type="string"),
     *     )
     *   ),
     * @OA\Property(
     *       property="fields",
     *       type="array",
     *       @OA\Items(
     *         type="object",
     *         @OA\Property(property="id", type="number"),
     *         @OA\Property(property="field", type="string"),
     *         @OA\Property(property="image", type="string"),
     *     )
     *   ),
     */
    protected $fillable = [
        'id',
        'name',
        'images',
        'levels',
        'types',
        'attributes',
        'fields',
    ];

    protected $hidden = [
        'releaseDate',
        'descriptions',
        'skills',
        'priorEvolutions',
        'nextEvolutions'
    ];
}
