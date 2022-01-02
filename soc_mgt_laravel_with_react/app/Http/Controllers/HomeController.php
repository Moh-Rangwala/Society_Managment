<?php

namespace App\Http\Controllers;

use App\Models\Contactususer;
use App\Models\Resident_photo_upload;
use Exception;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    //
    function addUserQueryToContactUs(Request $req)
    {
        try {
            $contactUsData = new Contactususer();
            $contactUsData->fullname = $req->input('fullname');
            $contactUsData->email = $req->input('email');
            $contactUsData->contact = $req->input('contact');
            $contactUsData->query = $req->input('queryDesc');
            $contactUsData->save();
            return response()->json(array("sent" => 1, "message" => "Query received!", "status" => "pass"));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function getResidentPhotoUploads(Request $req)
    {
        try {
            $galleryData = Resident_photo_upload::orderBy('id', 'desc')->get();
            return response()->json(array('data' => $galleryData, 'status' => 'success'));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }
}
