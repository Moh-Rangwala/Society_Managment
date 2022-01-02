<?php

namespace App\Http\Controllers;

use App\Models\Building;
use App\Models\Garden_and_pool;
use App\Models\Visitor_incident;
use App\Models\Visitor_visit_request;
use Exception;
use Illuminate\Http\Request;

class VisitorController extends Controller
{
    //
    function checkInRequestVisitor(Request $req)
    {
        try {
            $checkOwnerExist =  Building::where(['bldgnum' => $req->input('bldg'), 'aptnum' => $req->input('apt')])->where('owner_id', '<>', 'null')->first();
            if ($checkOwnerExist) {
                $checkVisitRequested = Visitor_visit_request::where(['bldg' => $req->input('bldg'), 'apt' => $req->input('apt'), 'visitor_id' => $req->input('visitor_id'), 'approval' => 0])->first();
                if ($checkVisitRequested) {
                    return response()->json(['status' => 'fail', 'message' => "Already requested for visit, please wait!"]);
                } else {
                    $checkIfCheckedIn = Visitor_visit_request::where(['bldg' => $req->input('bldg'), 'apt' => $req->input('apt'), 'visitor_id' => $req->input('visitor_id'), 'approval' => 1, 'checked_out' => 0])->first();
                    if ($checkIfCheckedIn) {
                        return response()->json(['status' => 'fail', 'message' => "Already checked into this apartment, please checkout first!"]);
                    } else {
                        try {
                            $checkInReq = new Visitor_visit_request();
                            $checkInReq->visitor_name = $req->input('visitor_name');
                            $checkInReq->bldg = $req->input('bldg');
                            $checkInReq->apt = $req->input('apt');
                            $checkInReq->visit_reason = $req->input('visit_reason');
                            $checkInReq->approval = 0;
                            $checkInReq->owner_id = $checkOwnerExist['owner_id'];
                            $checkInReq->suggestion = 'nothing';
                            $checkInReq->visitor_id = $req->input('visitor_id');
                            $checkInReq->save();
                            return response()->json(array("sent" => 1, "message" => "Request sent to resident, please wait for approval!", "status" => "pass"));
                        } catch (Exception $e) {
                            return response()->json($e);
                        }
                    }
                }
            } else {
                return response()->json(['status' => 'fail', 'message' => "No resident has occupied that property or property doesn't exist!"]);
            }
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function getResidentVisitorList(Request $req)
    {
        try {
            $visitReqs = Visitor_visit_request::where('visitor_id', $req->input('visitor_id'))->get();
            return response()->json(array('data' => $visitReqs, 'status' => 'success'));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function checkOutVisitorFromApt(Request $req)
    {
        try {
            Visitor_visit_request::where(['id' => $req->input('visit_request_id'), 'visitor_id' => $req->input('visitor_id')])->update([
                'checked_out' => 1,
            ]);
            return response()->json(array("sent" => 1, "message" => "Checkout successfull!", "status" => "pass"));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function getGardenListVisitor(Request $req)
    {
        try {
            $gardenList = Garden_and_pool::where('type', 'garden')->get();
            return response()->json(array('gardenData' => $gardenList, 'status' => 'pass'));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function checkIfCanVisitGarden(Request $req)
    {
        try {
            $checkGardenAccess = Visitor_visit_request::where(['approval' => 1, 'checked_out' => 0, 'visitor_id' => $req->input('visitor_id')])->first();
            if ($checkGardenAccess) {
                return response()->json(array("sent" => 1, "message" => "You can visit this garden!", "status" => "pass"));
            } else {
                return response()->json(['status' => 'fail', 'message' => "You will need approval from resident first!"]);
            }
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function postVisitorIncidentDetails(Request $req)
    {
        try {
            $visitorIncident = new Visitor_incident();
            $visitorIncident->visitor_name = $req->input('visitor_name');
            $visitorIncident->flat_detail = $req->input('flat_detail');
            $visitorIncident->incident_desc = $req->input('incident_desc');
            $visitorIncident->visitor_id = $req->input('visitor_id');
            $visitorIncident->save();
            return response()->json(array("sent" => 1, "message" => "Your incident has been recorded, a confirmation mail will be sent!", "status" => "pass"));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }
}
