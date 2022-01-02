<?php

namespace App\Http\Controllers;

use App\Models\Admin_manager_access;
use App\Models\Building;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    //
    function register(Request $req)
    {
        try {
            //code...\
            $checkUser = User::where('email', $req->email)->first();
            $user = new User();
            $userRole = $req->input('role');
            $user->email = $req->input('email');
            $user->fname = $req->input('fname');
            $user->lname = $req->input('lname');
            $user->pass = Hash::make($req->input('pass'));
            $user->contact = $req->input('contact');
            $user->role = $req->input('role');
            if ($userRole == 'resident') {
                $user->bldg = $req->input('bldg');
                $user->apt = $req->input('apt');
            }
            if ($userRole != 'resident') {
                $user->address = $req->input('address');
            }
            $user->dob = $req->input('dob');
            $user->license = $req->input('lic');
            $fullname = $req->input('fname') . ' ' .  $req->input('lname');

            if ($userRole == "resident") {
                if (!$checkUser) {
                    $checkFlatOccupied = User::where('apt', '=', $req->apt)
                        ->where('bldg', '=', $req->bldg)
                        ->first();
                    $checkFlatAvailable = Building::where('aptnum', '=', $req->apt)
                        ->where('bldgnum', '=', $req->bldg)
                        ->first();
                    if (!$checkFlatOccupied && $checkFlatAvailable) {
                        try {
                            //code...
                            $user->save();
                            Building::where('bldgnum', $req->input('bldg'))->where('aptnum', $req->input('apt'))->update(['owner' => $fullname, 'owner_id' => $req->input('email')]);
                            return response()->json(['status' => 'pass', 'message' => 'The user registered successfully.', 'data' => $user]);
                        } catch (Exception $e) {
                            //throw $th;
                            return response()->json($e);
                        }
                    } else {
                        return response()->json(['status' => 'fail', 'message' => 'Flat already occupied or not available!']);
                    }
                } else {
                    return response()->json(['status' => 'fail', 'message' => 'Email already present!']);
                }
            } else if ($userRole == "visitor") {
                if (!$checkUser) {
                    $user->save();
                    return response()->json(['status' => 'pass', 'message' => 'The user registered successfully.', 'data' => $user]);
                } else {
                    return response()->json(['status' => 'fail', 'message' => 'Email already present!']);
                }
            } else {
                if (!$checkUser) {
                    $checkAccessId = Admin_manager_access::where('access_id', '=', $req->input('id'))
                        ->first();
                    if($checkAccessId) {
                        try {
                            $user->save();
                            Admin_manager_access::where('access_id', $req->input('id'))->update(['role' => $userRole, 'email_user' => $req->input('email')]);
                            return response()->json(['status' => 'pass', 'message' => 'The user registered successfully.', 'data' => $user]);
                            //code...
                        } catch (Exception $e) {
                            //throw $th;
                            return response()->json($e);
                        } 
                    }   else {
                        return response()->json(['status' => 'fail', 'message' => 'Access Id not present!']);
                    }
                  
                } else {
                    return response()->json(['status' => 'fail', 'message' => 'Email already present!']);
                }
            }
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function login(Request $req)
    {
        $user = User::where('email', strip_tags($req->email))->first();
        if (!$user || !Hash::check(strip_tags($req->pass), $user->pass)) {
            return response()->json(['status' => 'fail', 'message' => 'Incorrect credentials!']);
        } else {
            return response()->json(['status' => 'pass', 'message' => 'Correct credentials.', 'data' => $user]);
        }
    }
}
