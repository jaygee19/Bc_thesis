<?php

namespace App\Http\Controllers;

use App\Models\EnrolledStudent;
use Illuminate\Http\Request;

class StudentController extends Controller
{
 public function index() {
     return EnrolledStudent::with('user')->with('course')->get();
 }
}
