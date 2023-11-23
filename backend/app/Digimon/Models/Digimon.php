<?php

namespace App\Digimon\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Digimon list
 * @OA\Schema(
 *     title="digimon",
 * )
 */
class Digimon extends Model
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
     *       property="image",
     *       type="string"
     *   ),
     */
    protected $fillable = ['id', 'name', 'image'];

    protected $hidden = [
        'href'
    ];
}
