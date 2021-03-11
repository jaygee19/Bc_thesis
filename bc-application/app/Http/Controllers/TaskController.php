<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;


class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Task::with('stud_tasks')->get();
    }

    public function loggedUserTasks() {
        $user = JWTAuth::parseToken()->authenticate();
        $tasks = Task::where('teacher_id', $user->user_id)->get();
        return response()->json($tasks);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();

        // $user = JWTAuth::parseToken()->authenticate();
        if ($user->role != 't')
        {
            return response()->json(['status' => 'unauthorized'], 400);
        }
            

        // $validator = $this->getValidator($request);

        // $validator = Validator::make($request->all(), [
        //     'teacher_id' => 'required',
        // ]);

        // if($validator->fails()){
        //         return response()->json($validator->errors()->toJson(), 400);
        // }


        $task = Task::create([
            'type' => $request->get('type'),
            'content' => $request->get('content'),
            'valid_from' => date(DATE_RSS),
            'deadline' => $request->get('deadline'),
            'teacher_id' => $user->user_id,
        ]);

        $created_id = $task->task_id;
        $created_task = Task::with('stud_tasks')->where('task_id', $created_id)->first();
        return response()->json($created_task, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Task $task)
    {
        $user = JWTAuth::parseToken()->authenticate();
        // if (!$user->is_admin)
        //     return response()->json(['status' => 'unauthorized'], 400);

        // $validator = $this->getValidator($request);

        // if ($validator->fails())
        //     return response()->json($validator->errors(), 400);

        if ($user->role != 't')
        {
            return response()->json(['status' => 'unauthorized'], 400);
        }

        $task->update($request->all());
        $updated_id = $task->task_id;
        $updated_task = Task::with('stud_tasks')->where('task_id', $updated_id)->first();
        return response()->json($updated_task, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        $user = JWTAuth::parseToken()->authenticate();

        if ($user->role != 't')
        {
            return response()->json(['status' => 'unauthorized'], 400);
        }

        //$taskForDelete = Task::with('stud_tasks')->where('task_id', $task->task_id)->first();

        //$taskForDelete->delete();

        $task->delete();

        return response()->json(null, 204);
    }
}
