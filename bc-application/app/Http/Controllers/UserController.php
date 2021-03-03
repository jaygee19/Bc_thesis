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


class UserController extends Controller
{
        
    public function authenticate(Request $request)
        {
            $validator = Validator::make($request->all(), [
                'password' => 'required|min:6',
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
                return response()->json(['errors' => ['could_not_create_token']], 500);
            }

            $user = User::where('ldap_login', $request->all()['ldap_login'])->first();
            $user->api_token = $token;
            $user->save();

            return response()->json(['token' => $token], 200);
    }

        public function register(Request $request)
        {
                $validator = Validator::make($request->all(), [
                //'name' => 'required|string|max:255',
                //'email' => 'required|string|email|max:255|unique:users',
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
                'role' => "t",
            ]);

            $token = JWTAuth::fromUser($user);

            return response()->json(compact('user','token'), 201);
        }

        public function getAuthenticatedUser()
            {
                 try {

                    if (! $user = JWTAuth::parseToken()->authenticate()) {
                        return response()->json(['user_not_found'], 404);
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
            // $this->validate($request, [
            //      'api_token' => 'required'
            // ]);
            
            // $user = User::where('api_token', $request->all()['api_token'])->get()->first();
            // $user->api_token = null;
            // $user->save();

            try {
                JWTAuth::invalidate($request->api_token);

                return response()->json([
                    'success' => true,
                    'message' => 'User logged out successfully'
                ]);
            } catch (JWTException $exception) {
                return response()->json([
                    'success' => false,
                    'message' => 'Sorry, the user cannot be logged out'
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
}
