<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resident_photo_upload extends Model
{
    use HasFactory;
    protected $fillable = [
        'image_path',
        'resident_email',
        'caption',
        'resident_name'
    ];

    public $timestamps = false;
}
