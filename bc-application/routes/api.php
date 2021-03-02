<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;

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

Route::get('/users', [TestController::class, 'index']);
Route::get('/tasks', [TaskController::class, 'index']);
Route::get('/tasks/loggedUsersTask', [TaskController::class, 'loggedUserTasks']);


Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/logout', [UserController::class, 'logout']);
    Route::get('/user', [UserController::class, 'getAuthenticatedUser']);
    Route::post('/tasks/store', [TaskController::class, 'store']);
    Route::put('/tasks/{task}', [TaskController::class, 'update']);
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy']);

});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
