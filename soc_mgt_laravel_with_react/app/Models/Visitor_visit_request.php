<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visitor_visit_request extends Model
{
    use HasFactory;

    protected $fillable = [
        'visitor_name',
        'bldg',
        'apt',
        'visit_reason',
        'approval',
        'owner_id',
        'suggestion',
        'visitor_id',
        'checked_out',
    ];

    public $timestamps = false;
}
