<?php

namespace App\Digimon\Models;

use Illuminate\Database\Eloquent\Model;

class Pagination extends Model
{
    protected $fillable = ['currentPage', 'elementsOnPage', 'totalElements', 'totalPages', 'previousPage', 'nextPage'];
}
