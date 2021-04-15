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

    public function result() {
        return $this->hasOne(Result::class, 'assignment_id', 'assignment_id');
    }

    public function compared_pair() {
        return $this->hasOne(ComparedPair::class, 'assignment_first_id', 'assignment_id');
    }
}
