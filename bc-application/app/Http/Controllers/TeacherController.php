<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\Schedule;
use App\Models\User;
use App\Models\Task;
use Illuminate\Support\Arr;

class TeacherController extends Controller
{
    public function index() {
        //$user = JWTAuth::parseToken()->authenticate();
        return Schedule::with('users')->get();
    }

    public function assignTask(Request $request) {

        $task = $request->get('task_id');

        for ($i = 0; $i < count($request->chosenStudents); $i++) {
            $temp = $request->chosenStudents[$i];
            $user = User::where('user_id', Arr::get($temp, 'user_id'))->first();
            $user->stud_tasks()->attach($task);
        }    
        $task = Task::with('stud_tasks')->where('task_id', $request->get('task_id'))->first();
        $changed_user = User::with('stud_tasks')->where('user_id', $user->user_id)->first();

        return response()->json(['task' => $task, 'user' => $changed_user], 201);
    }
}
