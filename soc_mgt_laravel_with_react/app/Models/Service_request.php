<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service_request extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'service_name',
        'approve',
        'owner_id',
        'flat_detail',
    ];

    public $timestamps = false;
}
