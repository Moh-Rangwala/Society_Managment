<?php

namespace App\Http\Controllers;

use App\Models\Resident_photo_upload;
use App\Models\Service_request;
use App\Models\Visitor_visit_request;
use Exception;
use Illuminate\Http\Request;

class ResidentController extends Controller
{
    function getResidentServiceReqList(Request $req)
    {
        try {
            $servReqData = Service_request::where('owner_id', $req->input('id'))->get();
            return response()->json(array('data' => $servReqData, 'status' => 'success'));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function bookResidentServiceRequest(Request $req)
    {
        try {
            $checkBooked =  Service_request::where(['owner_id' => $req->input('owner_id'), 'service_id' => $req->input('service_id'), 'approve' => 0])->first();
            if ($checkBooked) {
                return response()->json(['status' => 'fail', 'message' => 'Service already booked, please wait for approval!']);
            } else {
                $srvcReq = new Service_request();
                $srvcReq->service_id = $req->input('service_id');
                $srvcReq->service_name = $req->input('service_name');
                $srvcReq->approve = '0';
                $srvcReq->owner_id = $req->input('owner_id');
                $srvcReq->flat_detail = $req->input('bldg') . ' ' . $req->input('apt');
                $srvcReq->save();
                return response()->json(array("sent" => 1, "message" => "Service booked successfully!", "status" => "pass"));
            }
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function getResidentVisitRequests(Request $req)
    {
        try {
            $status = $req->input('status');
            $resVisitReq = Visitor_visit_request::where(['owner_id' => $req->input('owner_id'), 'approval' => $status == 'new' ? 0 : 1])->get();

            return response()->json(array('data' => $resVisitReq, 'status' => 'pass'));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function approveVisitorRequest(Request $req)
    {
        try {
            Visitor_visit_request::where(['id' => $req->input('visit_request_id'),'owner_id' => $req->input('owner_id')])->update([
                'approval' => 1,
            ]);
            return response()->json(array("sent" => 1, "message" => "Visit Approved!", "status" => "pass"));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function addNewResidentPhotoUpload(Request $req)
    {
        try {
            $photoUploadData = new Resident_photo_upload();
            $photoUploadData->resident_email = $req->input('resEmail');
            $photoUploadData->caption = $req->input('caption');
            $photoUploadData->resident_name = $req->input('resName');
            $photoUploadData->image_path = $req->input('image');
            $photoUploadData->save();
            return response()->json(array("sent" => 1, "message" => "Photo Uploaded Successfully!", "status" => "pass"));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }
}
