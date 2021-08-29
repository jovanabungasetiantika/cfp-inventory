<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class UserController extends Controller
{
    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $field = filter_var($request->email, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        if (Auth::attempt([$field => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $token = $user->createToken('cfpinv');
            $success['token'] = [
                'accessToken' => $token->accessToken,
                'created_at' => $token->token->created_at,
                'expires_at' => $token->token->expires_at,
            ];
            $success['user'] = $user;
            return response()->json($success, 200);
        } else {
            return response()->json(['error' => 'Your password not match'], 401);
        }
    }

    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'username' => 'required|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $token = $user->createToken('cfpinv');
        $success['token'] = [
            'accessToken' => $token->accessToken,
            'created_at' => $token->token->created_at,
            'expires_at' => $token->token->expires_at,
        ];
        $success['user'] = $user;
        return response()->json($success, 200);
    }

    /**
     * details api
     *
     * @return \Illuminate\Http\Response
     */
    public function details()
    {
        $user = Auth::user();
        if ($user) {
            return response()->json($user, 200);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    /**
     * logout api
     *
     * @return \Illuminate\Http\Response
     */
    public function logout()
    {
        $user = Auth::user();
        if ($user) {
            Auth::logout();
            return response()->json(['message' => 'Logout success'], 200);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    /**
     * Register Change Password
     *
     * @return \Illuminate\Http\Response
     */
    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'oldPassword' => 'required',
            'password' => 'required',
            'confirmPassword' => 'required|same:password',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = Auth::user();

        $user->password = $input['password'];
        $user->save();

        return response()->json(['message' => 'Password changed successfully'], 200);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $page = 1;
        $perPage = 10;
        $name = '';
        if ($request->page) {
            $page = $request->page;
        }
        if ($request->perPage) {
            $perPage = $request->perPage;
        }
        if ($request->name) {
            $name = $request->name;
        }
        return response()->json(User::where('name', 'LIKE', "%$name%")->orderBy('updated_at', 'DESC')->paginate($perPage, ['*'], 'page', $page), 200);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAll(Request $request)
    {
        return response()->json(User::all(), 200);
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
        $validator = Validator::make($request->all(), [
            'username' => 'requred',
            'name' => 'required',
            'email' => 'required|email',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        $User = new User;
        $User->username = $request->username;
        $User->name = $request->name;
        $User->password = $request->name;
        $User->email = $request->email;
        $User->save();

        return response()->json($User, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $User
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $id = $user->id;
        return response()->json($user->where('id', $id)->first(), 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\User  $User
     * @return \Illuminate\Http\Response
     */
    public function edit(User $User)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $User
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'username',
            'name' => 'required',
            'email' => 'required|email',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        $user->username = $request->username;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();
        return response()->json($user, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $User
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $User)
    {
        $User->delete();

        return response()->json([
            'message' => 'Data has been deleted successfully',
        ], 200);
    }
}
