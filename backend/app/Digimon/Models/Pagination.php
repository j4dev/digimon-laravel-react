<?php

namespace App\Digimon\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Digimon list
 * @OA\Schema(
 *     title="pagination",
 * )
 */
class Pagination extends Model
{
    /**
     *@OA\Property(
     *       property="currentPage",
     *       type="number"
     *   ),
     *@OA\Property(
     *       property="elementsOnPage",
     *       type="number"
     *   ),
     *@OA\Property(
     *       property="totalElements",
     *       type="number"
     *   ),
     *@OA\Property(
     *       property="totalPages",
     *       type="number"
     *   ),
     * @OA\Property(
     *       property="previousPage",
     *       type="number"
     *   ),
     * @OA\Property(
     *       property="nextPage",
     *       type="number"
     *   ),
     */
    protected $fillable = ['currentPage', 'elementsOnPage', 'totalElements', 'totalPages', 'previousPage', 'nextPage'];
}
