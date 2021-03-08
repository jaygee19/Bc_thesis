<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $primaryKey = 'course_id';

    protected $guarded = [];

    public function schedules() {
        return $this->hasMany(Schedule::class, 'course_id');
    }
}
