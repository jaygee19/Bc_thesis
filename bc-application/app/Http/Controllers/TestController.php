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
        //$assignment = SubmittedAssignment::where('assignment_id', 44)->first();
        $this->parseFile('C:\Users\Janci\Desktop\Test_folder\funkcie.c');

        // $my_file = file_get_contents('C:\Users\Janci\Desktop\Test_folder\ZIPKA\4\game_life\main.c');
        // $table = array(
        //     'À'=>'A', 'Á'=>'A', 'Â'=>'A', 'Ã'=>'A', 'Ä'=>'A', 'Å'=>'A', 'Æ'=>'A', 'Ç'=>'C', 'Č'=>'C', 'Ď'=>'D',
        //     'È'=>'E', 'É'=>'E', 'Ê'=>'E', 'Ë'=>'E', 'Ì'=>'I', 'Í'=>'I', 'Î'=>'I', 'Ï'=>'I', 'Ľ'=>'L', 'Ĺ'=>'L',
        //     'Ň'=>'N', 'Ò'=>'O', 'Ó'=>'O', 'Ô'=>'O','Õ'=>'O', 'Ö'=>'O', 'Ø'=>'O', 'Š'=>'S', 'Ť'=>'T', 'Ù'=>'U', 
        //     'Ú'=>'U', 'Û'=>'U', 'Ü'=>'U', 'Ý'=>'Y', 'Ž'=>'Z', 'Þ'=>'B', 'ß'=>'Ss',

        //     'à'=>'a', 'á'=>'a', 'â'=>'a', 'ã'=>'a', 'ä'=>'a', 'å'=>'a', 'æ'=>'a', 'ç'=>'c', 'č'=>'c', 'ď'=>'d',
        //     'è'=>'e', 'é'=>'e', 'ê'=>'e', 'ë'=>'e', 'ì'=>'i', 'í'=>'i', 'î'=>'i', 'ï'=>'i', 'ð'=>'o', 'ľ'=>'l',
        //     'ĺ'=>'l', 'ñ'=>'n', 'ň'=>'n', 'ò'=>'o', 'ó'=>'o', 'ô'=>'o', 'õ'=>'o', 'ö'=>'o', 'ø'=>'o', 'š'=>'s',
        //     'ť'=>'t', 'ù'=>'u', 'ú'=>'u', 'û'=>'u', 'ý'=>'y', 'ý'=>'y', 'þ'=>'b', 'ÿ'=>'y', 'ž'=>'z'
        // );
        // $result = strtr($my_file, $table);
        // file_put_contents('C:\Users\Janci\Desktop\Test_folder\ZIPKA\4\game_life\main.c', $result);
           // $allfiles = [];
       // $allfiles = exec('cd C:\Users\Janci\Desktop\Test_folder\ZIPKA\1 | dir ');
        //dd($allfiles);
    }

    public function parseFile($file) {
        $my_file = file_get_contents($file);
        //dd($my_file);

        $table = array(
            'À'=>'A', 'Á'=>'A', 'Â'=>'A', 'Ã'=>'A', 'Ä'=>'A', 'Å'=>'A', 'Æ'=>'A', 'Ç'=>'C', 'Č'=>'C', 'Ď'=>'D',
            'È'=>'E', 'É'=>'E', 'Ê'=>'E', 'Ë'=>'E', 'Ì'=>'I', 'Í'=>'I', 'Î'=>'I', 'Ï'=>'I', 'Ľ'=>'L', 'Ĺ'=>'L',
            'Ň'=>'N', 'Ò'=>'O', 'Ó'=>'O', 'Ô'=>'O','Õ'=>'O', 'Ö'=>'O', 'Ø'=>'O', 'Š'=>'S', 'Ť'=>'T', 'Ù'=>'U', 
            'Ú'=>'U', 'Û'=>'U', 'Ü'=>'U', 'Ý'=>'Y', 'Ž'=>'Z', 'Þ'=>'B', 'ß'=>'Ss', 'Ø'=>'t',

            'à'=>'a', 'á'=>'a', 'â'=>'a', 'ã'=>'a', 'ä'=>'a', 'å'=>'a', 'æ'=>'a', 'ç'=>'c', 'č'=>'c', 'ď'=>'d',
            'è'=>'e', 'é'=>'e', 'ê'=>'e', 'ë'=>'e', 'ì'=>'i', 'í'=>'i', 'î'=>'i', 'ï'=>'i', 'ð'=>'o', 'ľ'=>'l',
            'ĺ'=>'l', 'ñ'=>'n', 'ň'=>'n', 'ò'=>'o', 'ó'=>'o', 'ô'=>'o', 'õ'=>'o', 'ö'=>'o', 'ø'=>'o', 'š'=>'s',
            'ť'=>'t', 'ù'=>'u', 'ú'=>'u', 'û'=>'u', 'ý'=>'y', 'ý'=>'y', 'þ'=>'b', 'ÿ'=>'y', 'ž'=>'z'
        );
        $result = strtr($my_file, $table);
        
        file_put_contents($file, $result);
        $aftre_file = file_get_contents($file);
        dd($aftre_file);
     }
}
