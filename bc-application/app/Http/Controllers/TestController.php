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
        // $a = '7NAsngtxwoK03yrv4dQ8WUiOHzxWys8aQayd0S7P.zip';
        // $b = '33';
        // exec('cd C:\Users\Janci\Desktop\BC\Bc_thesis\bc-application\storage\app\public\semester_work & tar -xf '.$a.' -C C:\Users\Janci\Desktop\BC\Bc_thesis\bc-application\storage\app\public\semester_work/'.$b);

        //Excel::import(new ComparedPairsImport, "C:\Users\Janci\Desktop\Res\matches_max.csv");
        //exec("java -jar C:\Users\Janci\Desktop\jplag-2.12.1-SNAPSHOT-jar-with-dependencies.jar -l c/c++ -r C:\Users\Janci\Desktop\Res\ -s C:\Users\Janci\Desktop\Test_folder\ ");
        //dd($array);
    }
}
