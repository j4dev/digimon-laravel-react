<?php

namespace App\Digimon\Models;

use Illuminate\Database\Eloquent\Model;

class DigimonInfo extends Model
{
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
