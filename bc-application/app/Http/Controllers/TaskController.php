<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Storage;



class TaskController extends Controller
{
    public function index()
    {
        return Task::with('stud_tasks')->with('submitted_assignments')->get();
    }

    public function loggedUserTasks() {
        $user = JWTAuth::parseToken()->authenticate();
        $tasks = Task::where('teacher_id', $user->user_id)->get();
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();

        if ($user->role != 't')
        {
            return response()->json(['status' => 'Neautorizovaný prístup'], 400);
        }

        // $validator = $this->getValidator($request);

        // if ($validator->fails())
        //     return response()->json($validator->errors(), 400);

        if($request->file('filename') == null){
            $task = Task::create([
                'type' => $request->get('type'),
                'content' => $request->get('content'),
                'title' => $request->get('title'),
                'valid_from' => date(DATE_RSS),
                'deadline' => $request->get('deadline'),
                'teacher_id' => $user->user_id,
            ]);
        } else {
            $task = Task::create([
                'type' => $request->get('type'),
                'content' => $request->get('content'),
                'title' => $request->get('title'),
                'valid_from' => date(DATE_RSS),
                'deadline' => $request->get('deadline'),
                'teacher_id' => $user->user_id,
                'path_to_file' => $request->file('filename')->store('public/uploads'),
            ]);
        }
        
        $created_id = $task->task_id;
        $created_task = Task::with('stud_tasks')->with('submitted_assignments')->where('task_id', $created_id)->first();

        return response()->json($created_task, 201);
    }

    public function update(Request $request, Task $task)
    {
        $user = JWTAuth::parseToken()->authenticate();

        // $validator = $this->getValidator($request);

        // if ($validator->fails())
        //     return response()->json($validator->errors(), 400);

        if ($user->role != 't')
        {
            return response()->json(['status' => 'unauthorized'], 400);
        }

        $task->update($request->all());
        $updated_id = $task->task_id;
        $updated_task = Task::with('stud_tasks')->with('submitted_assignments')->where('task_id', $updated_id)->first();

        return response()->json($updated_task, 200);
    }

    public function destroy(Task $task)
    {
        $user = JWTAuth::parseToken()->authenticate();

        if ($user->role != 't')
        {
            return response()->json(['status' => 'unauthorized'], 400);
        }

        if ($task->path_to_file != null)
        {
            Storage::delete($task->path_to_file);
        }

        $task->delete();

        return response()->json(null, 204);
    }

    public function updateFile(Request $request) {

        $user = JWTAuth::parseToken()->authenticate();

        if ($user->role != 't')
        {
            return response()->json(['status' => 'unauthorized'], 400);
        }

        $task = Task::with('stud_tasks')->with('submitted_assignments')->where('task_id', $request->get('id'))->first();

        if ($task->path_to_file != null)
        {
            Storage::delete($task->path_to_file);
        }

        $task->update(
            ['path_to_file' => $request->file('filename')->store('public/uploads')]
        );

        return response()->json($task, 200);   
    }

    public function hide(Task $task)
    {
        $user = JWTAuth::parseToken()->authenticate();

        if ($user->role != 't')
        {
            return response()->json(['status' => 'unauthorized'], 400);
        }

        $task->update(
            ['hidden' => true]
        );

        return response()->json($task, 200);   
    }

    public function uncover(Task $task)
    {
        $user = JWTAuth::parseToken()->authenticate();

        if ($user->role != 't')
        {
            return response()->json(['status' => 'unauthorized'], 400);
        }

        $task->update(
            ['hidden' => false]
        );

        return response()->json($task, 200);   
    }
}
