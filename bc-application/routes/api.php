<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\ResultController;

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
Route::post('/login', [UserController::class, 'login']);

Route::get('/control', [TestController::class, 'getAll']);
Route::get('/users', [UserController::class, 'index']);
Route::get('/tasks', [TaskController::class, 'index']);
Route::get('/schedules', [TeacherController::class, 'index']);
Route::get('/students', [StudentController::class, 'index']);


Route::group(['middleware' => ['jwt.verify']], function () {
    

    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/user', [UserController::class, 'getAuthenticatedUser']);
    Route::post('/tasks/store', [TaskController::class, 'store']);
    Route::put('/tasks/{task}', [TaskController::class, 'update']);
    Route::put('/tasks/hide/{task}', [TaskController::class, 'hide']);
    Route::put('/tasks/uncover/{task}', [TaskController::class, 'uncover']);
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy']);
    Route::post('/task/updateFile', [TaskController::class, 'updateFile']);

    Route::get('/tasks/loggedUsersTask', [TaskController::class, 'loggedUserTasks']);
    Route::post('/assign/students', [TeacherController::class, 'assignTask']);
    Route::delete('/remove/{task}/student/{user}', [TeacherController::class, 'removeStudent']);
    Route::put('check/duplicates/{task}', [TeacherController::class, 'checkDuplicates']);

    Route::post('submit/assignment', [StudentController::class, 'storeAssignment']);
    Route::post('update/assignment', [StudentController::class, 'updateAssignment']);
    
    Route::post('store/result', [ResultController::class, 'store']);
    Route::put('update/result/{result}', [ResultController::class, 'update']);

});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
