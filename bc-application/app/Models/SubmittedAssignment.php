<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubmittedAssignment extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $primaryKey = 'assignment_id';

    protected $guarded = [];

    
}
