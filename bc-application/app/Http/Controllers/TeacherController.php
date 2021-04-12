<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\Schedule;
use App\Models\User;
use App\Models\Task;
use Illuminate\Support\Arr;
use App\Imports\ComparedPairsImport;
use Maatwebsite\Excel\Facades\Excel;

class TeacherController extends Controller
{
    public function index() {
        return Schedule::with('users')->get();
    }

    public function assignTask(Request $request) {

        $user = JWTAuth::parseToken()->authenticate();

        if ($user->role != 't')
        {
            return response()->json(['status' => 'unauthorized'], 400);
        }

        $task = $request->get('task_id');
        $array = array();

        for ($i = 0; $i < count($request->chosenStudents); $i++) {
            $temp = $request->chosenStudents[$i];
            $user = User::where('user_id', Arr::get($temp, 'user_id'))->first();
            $user->stud_tasks()->attach($task);

            $array[$i] = User::with('schedules')->with('stud_tasks')->with('enrolled_student')->with('submitted_assignments.result')->where('user_id', Arr::get($temp, 'user_id'))->first();
        }    
        $task = Task::with('stud_tasks')->with('submitted_assignments')->where('task_id', $request->get('task_id'))->first();

        return response()->json(['task' => $task, 'users' => $array], 201);
    }

    public function removeStudent(Task $task, User $user) {

        $teacher = JWTAuth::parseToken()->authenticate();

        if ($teacher->role != 't')
        {
            return response()->json(['status' => 'unauthorized'], 400);
        }

       $user->stud_tasks()->detach($task);

       $updated_task = Task::with('stud_tasks')->with('submitted_assignments')->where('task_id', $task->task_id)->first();
       $removed_user = User::with('schedules')->with('stud_tasks')->with('enrolled_student')->with('submitted_assignments.result')->where('user_id', $user->user_id)->first();

       return response()->json(['task' => $updated_task, 'user' => $removed_user], 200);
    }

    public function checkDuplicates(Task $task) {

        $type = $task->type;
        $id = $task->task_id;
        $command = 'java -jar C:\Users\Janci\Desktop\jplag-2.12.1-SNAPSHOT-jar-with-dependencies.jar -l c/c++ -r C:\Users\Janci\Desktop\Res\ -s C:\Users\Janci\Desktop\BC\Bc_thesis\bc-application\storage\app\public/'.$type.'/'.$id;
        
        exec($command);
        
        Excel::import(new ComparedPairsImport($type, $id), "C:\Users\Janci\Desktop\Res\matches_max.csv");

        $task->update(
            ['verified' => true]
        );

        return response()->json($command, 200);
    }
}
