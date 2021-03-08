<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $primaryKey = 'schedule_id';

    protected $guarded = [];

    public function users() {
        return $this->belongsToMany(User::class, 'assigned_students', 'schedule_id', 'user_id');
    }

    public function course() {
        return $this->hasOne(Course::class, 'course_id', 'course_id');
    }
}
