<?php

namespace App\Digimon\Models;

use Illuminate\Database\Eloquent\Model;

class Digimon extends Model
{
    protected $fillable = ['id', 'name', 'image'];

    protected $hidden = [
        'href'
    ];

}
