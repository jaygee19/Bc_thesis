<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EnrolledStudent extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $guarded = [];

    public function course() {
        return $this->hasOne(Course::class, 'course_id', 'course_id');
    }

    public function user() {
        return $this->hasOne(User::class, 'user_id', 'user_id');
    }
}
