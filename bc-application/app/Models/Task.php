<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $primaryKey = 'task_id';

    protected $guarded = [];
    
    public function user(){
        return $this->belongsTo(User::class);
    }
}
