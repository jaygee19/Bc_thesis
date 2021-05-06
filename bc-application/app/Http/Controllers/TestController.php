<?php

namespace App\Http\Controllers;

use App\Imports\ComparedPairsImport;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Schedule;
use App\Models\Course;
use App\Models\EnrolledStudent;
use App\Models\SubmittedAssignment;
use App\Models\Task;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\UniquesImport;


class TestController extends Controller
{
    public function getAll() {
        return null;
    }
}
