<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Response;
use Exception;



class UserController extends Controller
{

    public function index() {
        return User::with('schedules')
        ->with('stud_tasks')
        ->with('enrolled_student')
        ->with('submitted_assignments.compared_pair')
        ->with('submitted_assignments.result')
        ->get();
    }
    
    //inspirovane strankou https://blog.pusher.com/laravel-jwt/
    public function login(Request $request) {
            $validator = Validator::make($request->all(), [
                'password' => 'required',
                'ldap_login' => 'required',
            ], [
                'password.required' => 'Zadajte heslo',
                'ldap_login.required' => 'Zadajte vaše univerzitné LDAP meno',
            ]);

            if($validator->fails()){
                    return response()->json($validator->errors(), 400);
            }

            $token = JWTAuth::attempt($request->only('ldap_login', 'password'));

            try {
                if ($token == null) {
                    return response()->json(['errors' => ['Neplatné prihlasovacie údaje']], 400);
                }
            } catch (JWTException $e) {
                return response()->json(['errors' => ['Nie je možne vytvoriť token']], 500);
            }

            $user = User::where('ldap_login', $request->all()['ldap_login'])->first();
            $user->api_token = $token;
            $user->save();

            return response()->json(['token' => $token], 200);
    }

        public function register(Request $request)
        {
                $validator = Validator::make($request->all(), [
                'password' => 'required|string|min:6',
            ]);

            if($validator->fails()){
                    return response()->json($validator->errors()->toJson(), 400);
            }

            $user = User::create([
                'name' => $request->get('name'),
                'surname' => $request->get('surname'),
                'ldap_login' => $request->get('ldap_login'),
                'password' => Hash::make($request->get('password')),
                'role' => "s",
            ]);

            $token = JWTAuth::fromUser($user);

            return response()->json(compact('user','token'), 201);
        }

        //inspirovane strankou https://blog.pusher.com/laravel-jwt/
        public function getAuthenticatedUser()
            {
                 try {

                    if (! $user = JWTAuth::parseToken()->authenticate()) {
                        return response()->json(['Užívateľa sa nepodarilo nájsť'], 404);
                    }

                } catch (TokenExpiredException $e) {

                    return response()->json(['token_expired'], 'error');

                } catch (TokenInvalidException $e) {

                    return response()->json(['token_invalid'], 'error');

                } catch (JWTException $e) {

                    return response()->json(['token_absent'], 'error');

                }

             return response()->json(compact('user'));

        }

        public function logout(Request $request)
        {
            try {
                $user = User::where('user_id', $request->id)->first();
                $user->update([ 'api_token' => '', ]);  
                return response()->json(['result' => 'Užívateľ úspešne odhlásený'], 200);

            } catch (JWTException $exception) {
                return response()->json(['result' => 'Prepáčte, užívateľa sa nepodarilo odhlásiť'], 500);
            }
        }
}
