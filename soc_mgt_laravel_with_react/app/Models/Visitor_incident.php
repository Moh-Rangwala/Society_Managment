<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visitor_incident extends Model
{
    use HasFactory;

    protected $fillable = [
        'visitor_name',
        'flat_detail',
        'incident_desc',
        'visitor_id',
    ];

    public $timestamps = false;
}
