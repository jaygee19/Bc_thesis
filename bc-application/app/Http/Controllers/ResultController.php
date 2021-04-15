<?php

namespace App\Http\Controllers;

use App\Models\EnrolledStudent;
use App\Models\Result;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class ResultController extends Controller
{
    public function store(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();

        if ($user->role != 't')
        {
            return response()->json(['status' => 'unauthorized'], 400);
        }

        $validator = Validator::make($request->all(), [
            'evaluation' => 'required|numeric',
            'comment' => 'required',
        ], [
            'evaluation.required' => 'Zadajte počet získaných bodov',
            'evaluation.numeric' => 'Hodnotenie obsahuje aj iné znaky ako sú čísla',
            'comment.required' => 'Zadajte komentár',
        ]);

        if($validator->fails()){
                return response()->json($validator->errors(), 400);
        }
        
        Result::create([
                'evaluation' => $request->get('evaluation'),
                'comment' => $request->get('comment'),
                'assignment_id' => $request->get('id'),
                'teacher_id' => $user->user_id,
        ]);

        $enrolled = EnrolledStudent::where('user_id', $request->get('user_id'))->first();
        $enrolled->increment('points', $request->get('evaluation'));
        
        $updated_student = User::with('schedules')
        ->with('stud_tasks')
        ->with('enrolled_student')
        ->with('submitted_assignments.result')
        ->with('submitted_assignments.compared_pair')
        ->where('user_id', $request->get('user_id'))
        ->first();

        return response()->json($updated_student, 201);
    }

    public function update(Request $request, Result $result)
    {
        $user = JWTAuth::parseToken()->authenticate();
        
        if ($user->role != 't')
        {
            return response()->json(['status' => 'unauthorized'], 400);
        }

        $validator = Validator::make($request->all(), [
            'evaluation' => 'required|numeric',
            'comment' => 'required',
        ], [
            'evaluation.required' => 'Zadajte počet získaných bodov',
            'evaluation.numeric' => 'Hodnotenie obsahuje aj iné znaky ako sú čísla',
            'comment.required' => 'Zadajte komentár',
        ]);

        if($validator->fails()){
                return response()->json($validator->errors(), 400);
        }

        $result->update(
            ['evaluation' => $request->get('evaluation'),
             'comment' => $request->get('comment'),
             'teacher_id' => $user->user_id,
            ]
        );

        $updated_student = User::with('schedules')
        ->with('stud_tasks')
        ->with('enrolled_student')
        ->with('submitted_assignments.result')
        ->with('submitted_assignments.compared_pair')
        ->where('user_id', $request->get('user_id'))
        ->first();

        return response()->json($updated_student, 200);
    }
}
