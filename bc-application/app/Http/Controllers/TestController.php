<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class TestController extends Controller
{
    public function index(){
        dd( User::withCount('tasks')->get()->toArray());
        return User::all();
    }
}
