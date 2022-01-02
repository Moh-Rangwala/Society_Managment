<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Garden_and_pool extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'name',
        'start_time',
        'end_time',
    ];

    public $timestamps = false;

}
