<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StudentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'authenticate']);

Route::get('/users', [UserController::class, 'index']);
Route::get('/tasks', [TaskController::class, 'index']);
Route::get('/schedules', [TeacherController::class, 'index']);
Route::get('/students', [StudentController::class, 'index']);

Route::get('/control', [TestController::class, 'getAll']);

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/logout', [UserController::class, 'logout']);
    Route::get('/user', [UserController::class, 'getAuthenticatedUser']);
    Route::post('/tasks/store', [TaskController::class, 'store']);
    Route::put('/tasks/{task}', [TaskController::class, 'update']);
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy']);
    Route::post('/task/updateFile', [TaskController::class, 'updateFile']);

    Route::get('/tasks/loggedUsersTask', [TaskController::class, 'loggedUserTasks']);
    Route::post('/assign/students', [TeacherController::class, 'assignTask']);
    Route::delete('/remove/{task}/student/{user}', [TeacherController::class, 'removeStudent']);

    Route::post('submit/assignment', [StudentController::class, 'storeAssignment']);
    Route::post('update/assignment', [StudentController::class, 'updateAssignment']);

});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
