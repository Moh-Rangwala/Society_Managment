<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Exception;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    //
    function addChatData(Request $req)
    {
        try {
            $chatData = new Chat();
            $chatData->room = $req->input('room');
            $chatData->author = $req->input('author');
            $chatData->message = $req->input('message');
            $chatData->time = $req->input('time');
            $chatData->save();
            return response()->json(array("sent" => 1, "message" => "message Saved!", "status" => "pass"));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function getChatData(Request $req)
    {
        try {
            $chatData = Chat::where('room', $req->input('room'))->get();
            return response()->json(array('data' => $chatData, 'status' => 'success'));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }
}
