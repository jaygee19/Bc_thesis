<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class TestController extends Controller
{
    
    public function index(){
        $users = User::all();
        dd($users->toArray());
        return view('welcome');
    }

}
