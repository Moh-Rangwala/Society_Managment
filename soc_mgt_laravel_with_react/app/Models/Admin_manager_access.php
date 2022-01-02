<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin_manager_access extends Model
{
    use HasFactory;

    protected $fillable = [
        'role',
        'access_id',
        'email_user',
    ];

    public $timestamps = false;
}
