<?php

namespace App\Http\Controllers;

use App\Models\EnrolledStudent;
use App\Models\SubmittedAssignment;
use App\Models\User;
use App\Models\Task;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    public function index()
    {
        return EnrolledStudent::with('user')
        ->with('course')
        ->get();
    }

    public function storeAssignment(Request $request)
    {

        $user = JWTAuth::parseToken()->authenticate();

        if ($user->role != 's') {
            return response()->json(['status' => 'unauthorized'], 400);
        }

        $validator = Validator::make($request->all(), [
            'ip_address' => 'required',
            'filename' => 'required|mimes:zip,c',
        ], [
            'filename.required' => 'Nepriložili ste žiaden súbor',
            'ip_address.required' => 'Zadajte vašu IP adresu',
            'filename.mimes' => 'Tento formát nie je podporovaný, podporované sú (.zip / .c)',
        ]);

        if($validator->fails()){
                return response()->json($validator->errors(), 400);
        }

        $concrete_task = Task::where('task_id', $request->get('task_id'))->first();
        $directory = 'public/uploads'; 

        date_default_timezone_set("Europe/Bratislava");

        $assignment = SubmittedAssignment::create([
            'task_id' => $request->get('task_id'),
            'student_id' => $user->user_id,
            'ip_address' => $request->get('ip_address'),
        ]);

        if ($concrete_task->type == 'semester_work') {
            $directory = 'public/semester_work'.'/'.$assignment->assignment_id;
        } else if ($concrete_task->type == 'second_check') {
            $directory = 'public/second_check/'.$concrete_task->task_id.'/'.$assignment->assignment_id;
        } else if ($concrete_task->type == 'first_check') {
            $directory = 'public/first_check';
        } else if ($concrete_task->type == 'homework') {
            $directory = 'public/homework';
        }

        $assignment->update(
            [ 'path_to_file' => $request->file('filename')->store($directory),
              'file_name' => $request->get('name'),
              'submit_date' => date(DATE_RSS, time()),
            ]
        );

        if ($concrete_task->type == 'semester_work') {  
            exec('cd C:\Users\Janci\Desktop\BC\Bc_thesis\bc-application\storage\app/'.$directory.' & tar -xf '.substr($assignment->path_to_file,22+strlen((string)$assignment->assignment_id)));
        }
        if ($concrete_task->type == 'second_check') {
            exec('cd C:\Users\Janci\Desktop\BC\Bc_thesis\bc-application\storage\app/'.$directory.' & tar -xf '.substr($assignment->path_to_file,25+strlen((string)$assignment->assignment_id)));
            //$this->parseFile('C:\Users\Janci\Desktop\BC\Bc_thesis\bc-application\storage\app/'.$directory.'/'.$assignment->assignment_id.'/'.substr($assignment->path_to_file,24));
        }

        $stored_by = User::with('schedules')
        ->with('stud_tasks')
        ->with('enrolled_student')
        ->with('submitted_assignments.result')
        ->with('submitted_assignments.compared_pair')
        ->where('user_id', $user->user_id)
        ->first();

        return response()->json($stored_by, 201);
    }

    public function updateAssignment(Request $request) {

        $user = JWTAuth::parseToken()->authenticate();

        if ($user->role != 's') {
            return response()->json(['status' => 'unauthorized'], 400);
        }
        
        $validator = Validator::make($request->all(), [
            'filename' => 'required|mimes:zip,c',
        ], [
            'filename.required' => 'Nepriložili ste žiaden súbor',
            'filename.mimes' => 'Tento formát nie je podporovaný, podporované sú (.zip / .c)',
        ]);

        if($validator->fails()){
                return response()->json($validator->errors(), 400);
        }

        $sub_assignment = SubmittedAssignment::where('assignment_id', $request->get('assignment_id'))->first();
        $concrete_task = Task::where('task_id', $sub_assignment->task_id)->first();
        $directory = 'public/uploads';

        if ($concrete_task->type == 'semester_work') {
            $directory = 'public/semester_work'.'/'.$sub_assignment->assignment_id;
            exec('cd C:\Users\Janci\Desktop\BC\Bc_thesis\bc-application\storage\app\public\semester_work & rmdir /Q/S '.$sub_assignment->assignment_id);
        } else if ($concrete_task->type == 'second_check') {
            $directory = 'public/second_check/'.$concrete_task->task_id.'/'.$sub_assignment->assignment_id;
            exec('cd C:\Users\Janci\Desktop\BC\Bc_thesis\bc-application\storage\app\public\second_check/'.$concrete_task->task_id.' & rmdir /Q/S '.$sub_assignment->assignment_id);
        } else if ($concrete_task->type == 'first_check') {
            $directory = 'public/first_check';
        } else if ($concrete_task->type == 'homework') {
            $directory = 'public/homework';
        }

        if ($sub_assignment->path_to_file != null)
        {
            Storage::delete($sub_assignment->path_to_file);
        }

        date_default_timezone_set("Europe/Bratislava");

        $sub_assignment->update(
            [ 'path_to_file' => $request->file('filename')->store($directory),
              'file_name' => $request->get('name'),
              'submit_date' => date(DATE_RSS, time()),
            ]
        );

        if ($concrete_task->type == 'semester_work') {
            exec('cd C:\Users\Janci\Desktop\BC\Bc_thesis\bc-application\storage\app/'.$directory.' & tar -xf '.substr($sub_assignment->path_to_file,22+strlen((string)$sub_assignment->assignment_id)));
        }
        if ($concrete_task->type == 'second_check') {
            exec('cd C:\Users\Janci\Desktop\BC\Bc_thesis\bc-application\storage\app/'.$directory.' & tar -xf '.substr($sub_assignment->path_to_file,25+strlen((string)$sub_assignment->assignment_id)));
            //$this->parseFile('C:\Users\Janci\Desktop\BC\Bc_thesis\bc-application\storage\app/'.$sub_assignment->path_to_file);
        }

        $updated_by = User::with('schedules')
        ->with('stud_tasks')
        ->with('enrolled_student')
        ->with('submitted_assignments.result')
        ->with('submitted_assignments.compared_pair')
        ->where('user_id', $user->user_id)
        ->first();

        return response()->json($updated_by, 200);   
     }

     public function parseFile($file) {
        $my_file = file_get_contents($file);
        $table = array(
            'À'=>'A', 'Á'=>'A', 'Â'=>'A', 'Ã'=>'A', 'Ä'=>'A', 'Å'=>'A', 'Æ'=>'A', 'Ç'=>'C', 'Č'=>'C', 'Ď'=>'D',
            'È'=>'E', 'É'=>'E', 'Ê'=>'E', 'Ë'=>'E', 'Ì'=>'I', 'Í'=>'I', 'Î'=>'I', 'Ï'=>'I', 'Ľ'=>'L', 'Ĺ'=>'L',
            'Ň'=>'N', 'Ò'=>'O', 'Ó'=>'O', 'Ô'=>'O','Õ'=>'O', 'Ö'=>'O', 'Ø'=>'O', 'Š'=>'S', 'Ť'=>'T', 'Ù'=>'U', 
            'Ú'=>'U', 'Û'=>'U', 'Ü'=>'U', 'Ý'=>'Y', 'Ž'=>'Z', 'Þ'=>'B', 'ß'=>'Ss',

            'à'=>'a', 'á'=>'a', 'â'=>'a', 'ã'=>'a', 'ä'=>'a', 'å'=>'a', 'æ'=>'a', 'ç'=>'c', 'č'=>'c', 'ď'=>'d',
            'è'=>'e', 'é'=>'e', 'ê'=>'e', 'ë'=>'e', 'ì'=>'i', 'í'=>'i', 'î'=>'i', 'ï'=>'i', 'ð'=>'o', 'ľ'=>'l',
            'ĺ'=>'l', 'ñ'=>'n', 'ň'=>'n', 'ò'=>'o', 'ó'=>'o', 'ô'=>'o', 'õ'=>'o', 'ö'=>'o', 'ø'=>'o', 'š'=>'s',
            'ť'=>'t', 'ù'=>'u', 'ú'=>'u', 'û'=>'u', 'ý'=>'y', 'ý'=>'y', 'þ'=>'b', 'ÿ'=>'y', 'ž'=>'z'
        );
        $result = strtr($my_file, $table);
        file_put_contents($file, $result);
     }
}
