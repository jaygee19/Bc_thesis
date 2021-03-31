<?php

namespace App\Http\Controllers;

use App\Models\EnrolledStudent;
use App\Models\SubmittedAssignment;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    public function index()
    {
        return EnrolledStudent::with('user')->with('course')->get();
    }

    public function storeAssignment(Request $request)
    {

        $user = JWTAuth::parseToken()->authenticate();

        if ($user->role != 's') {
            return response()->json(['status' => 'unauthorized'], 400);
        }

        $validator = Validator::make($request->all(), [
            'ip_address' => 'required',
            'filename' => 'required',
        ], [
            'filename.required' => 'Neodovzdali ste zadanie',
            'ip_address.required' => 'Zadajte vašu IP adresu',
        ]);

        if($validator->fails()){
                return response()->json($validator->errors(), 400);
        }
        
        SubmittedAssignment::create([
            'task_id' => $request->get('task_id'),
            'student_id' => $user->user_id,
            'path_to_file' => $request->file('filename')->store('public/uploads'),
            'submit_date' => date(DATE_RSS),
            'ip_address' => $request->get('ip_address'),
        ]);

        $stored_by = User::with('schedules')->with('stud_tasks')->with('enrolled_student')->with('submitted_assignments.result')->where('user_id', $user->user_id)->first();

        return response()->json($stored_by, 201);
    }

    public function updateAssignment(Request $request) {

        $user = JWTAuth::parseToken()->authenticate();

        if ($user->role != 's') {
            return response()->json(['status' => 'unauthorized'], 400);
        }
        
        $validator = Validator::make($request->all(), [
            'filename' => 'required',
        ], [
            'filename.required' => 'Neodovzdali ste zadanie',
            // 'filename.mimes' => 'Tento format nie je podporovany',
        ]);

        if($validator->fails()){
                return response()->json($validator->errors(), 400);
        }

        $sub_assignment = SubmittedAssignment::where('assignment_id', $request->get('assignment_id'))->first();

        if ($sub_assignment->path_to_file != null)
        {
            Storage::delete($sub_assignment->path_to_file);
        }

        $sub_assignment->update(
            [ 'path_to_file' => $request->file('filename')->store('public/uploads'),
              'submit_date' => date(DATE_RSS),
            ]
        );

        $updated_by = User::with('schedules')->with('stud_tasks')->with('enrolled_student')->with('submitted_assignments.result')->where('user_id', $user->user_id)->first();

        return response()->json($updated_by, 200);   
     }
}
