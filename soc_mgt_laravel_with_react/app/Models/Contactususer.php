<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contactususer extends Model
{
    use HasFactory;
    protected $fillable = [
        'fullname',
        'email',
        'contact',
        'query',
    ];

    public $timestamps = false;
}
