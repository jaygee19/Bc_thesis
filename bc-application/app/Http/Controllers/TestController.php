<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Schedule;
use App\Models\Course;
use App\Models\EnrolledStudent;
use App\Models\SubmittedAssignment;
use App\Models\Task;
use Illuminate\Support\Facades\Storage;


class TestController extends Controller
{
    

    // public function addingScheduling(Request $request)
    // {
    //     $scheduleV = Schedule::where('schedule_id', 2)->first();
    //     $scheduleV->update($request->all());
    //     //$scheduleV->course()->associate($request->all);
    //     return response()->json($scheduleV, 201);
    // }

    // public function addCourse(Request $request) 
    // {
    //     $course = Course::create([
    //         'name' => $request->get('name')
    //     ]);

    //     return response()->json($course, 201);
    // }

    // public function uploadFile(Request $request) {

    //     //$uniqueid=uniqid();
    //     //$extension=$request->file('image')->getClientOriginalExtension();
    //     //$name=$uniqueid.'.'.$extension;



    //     // if ($request->hasFile('filename')) {
    //     //     $path = $request->file('filename')->store('public/uploads');  
    //     //     //$path = Storage::put('file.jpg', $request->file('filename'));  
    //     // }else{
    //     //     $path = "MISTAKE";
    //     // }

    //     //$file = Storage::files('public/uploads/');

    //     $task = Task::with('stud_tasks')->where('task_id', $request->get('id'))->first();

    //     if ($task->path_to_file != null)
    //     {
    //         Storage::delete($task->path_to_file);
    //     }

    //     $task->update(['path_to_file' => $request->file('filename')->store('public/uploads')]);

    //     return response()->json($task, 200);   
    //  }

    public function getAll() {
        //dd(Schedule::with('course')->get()->toArray());
        //dd(Task::with('user')->get()->toArray());
        //dd(User::with('tasks')->get()->toArray());
        //dd(Task::with('stud_tasks')->get()->toArray());
        dd(User::with('submitted_assignments')->get()->toArray());
        //dd(Schedule::where('course_id', '!=', null)->with('courses')->get()->toArray());
        //return Schedule::where('course_id', '!=', null)->with('courses')->get();
    }

    // public function detach(Request $request) {
    //     $user = User::where('user_id', $request->student_id)->first();
    //     $schedule = $request->get('schedule_id');

    //     $user->schedules()->attach($schedule);
    //     return response()->json(201);

    // }
    // public function control() {
    //     // $tracks = Track::withCount('users')->orderBy('users_count', 'desc')->where('genre','=', $genre)->get();
    //     $user = Schedule::with('users')->get()->toArray();
    //     dd($user);

    // }
}
