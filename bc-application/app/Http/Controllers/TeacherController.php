<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\Schedule;

class TeacherController extends Controller
{
    public function index() {
        //$user = JWTAuth::parseToken()->authenticate();
        return Schedule::with('users')->get();
    }
}
