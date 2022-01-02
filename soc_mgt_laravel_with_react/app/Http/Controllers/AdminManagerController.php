<?php

namespace App\Http\Controllers;

use App\Models\Building;
use App\Models\Garden_and_pool;
use App\Models\Service;
use App\Models\Service_request;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class AdminManagerController extends Controller
{
    //-------------------- GET FUNCTIONS--=-=-=-=-=-=-=-=-=-=-=-=
    function getDashboardData(Request $req)
    {
        try {
            $users = User::groupBy('role')
                ->selectRaw('count(*) as count, role')
                ->get();
            $bldgData = Building::selectRaw('count(distinct bldgnum) as bldgcount, count(aptnum) as aptcount')
                ->get();
            $amenityData = Garden_and_pool::groupBy('type')
                ->selectRaw('count(*) as count, type')
                ->get();
            $serviceData = Service::selectRaw('count(*) as servicecount')
                ->get();
            $serviceReqData = Service_request::selectRaw('count(*) as servicereqcount')
                ->get();
            return response()->json(array(
                'userData' => $users, 'bldgData' => $bldgData, "amenityData" => $amenityData,
                "servicesData" => $serviceData,
                "serviceReqData" => $serviceReqData, 'status' => 'pass'
            ));
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function getManagerList(Request $req)
    {
        try {
            $mgrs = User::where('role', 'manager')->get();
            return response()->json(array('data' => $mgrs, 'status' => 'pass'));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function getBuildingsList(Request $req)
    {
        try {
            $bldgData = Building::get();
            return response()->json(array('data' => $bldgData, 'status' => 'success'));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function getServicesList(Request $req)
    {
        try {
            $serviceData = Service::get();
            return response()->json(array('data' => $serviceData, 'status' => 'success'));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function getServiceRequestList(Request $req)
    {
        try {
            $serviceReqData = Service_request::get();
            return response()->json(array('data' => $serviceReqData, 'status' => 'success'));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function getResidentVisitorList(Request $req)
    {
        try {
            $userList = User::where('role', $req->input('role'))->get();
            return response()->json(array('data' => $userList, 'status' => 'success'));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function getGardenPoolList(Request $req)
    {
        try {
            $amenityList = Garden_and_pool::where('type', $req->input('type'))->get();
            return response()->json(array('data' => $amenityList, 'status' => 'success'));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    // --------------------------UPDATE FUNCTIONS------------------------
    function updateManagerDetail(Request $req)
    {
        try {
            User::where('email', $req->input('email'))->update([
                'fname' => $req->input('fname'),
                'lname' => $req->input('lname'),
                'contact' => $req->input('contact'),
                'dob' => $req->input('dob'),
                'license' => $req->input('lic'),
                'address' => $req->input('address'),
            ]);
            return response()->json(array("sent" => 1, "message" => "Info updated successfully!", "status" => "pass"));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function updateFlatDetail(Request $req)
    {
        try {
            $user = User::where('email', $req->ownerId)->first();
            if ($user) {
                try {
                    Building::where('bldgnum', $req->input('bldg'))->where('aptnum', $req->input('apt'))->update([
                        'owner' => $req->input('owner'),
                        'owner_id' => $req->input('ownerId'),
                    ]);
                    return response()->json(array("sent" => 1, "message" => "Info updated successfully!", "status" => "pass"));
                } catch (Exception $e) {
                    return response()->json($e);
                }
            } else {
                return response()->json(['status' => 'fail', 'message' => 'No user found with that ID!']);
            }

            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function updateServiceDetail(Request $req)
    {
        try {
            Service::where('id', $req->input('id'))->update([
                'service_name' => $req->input('service_name'),
                'category' => $req->input('category'),
                'start_time' => $req->input('start_time'),
                'end_time' => $req->input('end_time'),
            ]);
            return response()->json(array("sent" => 1, "message" => "Info updated successfully!", "status" => "pass"));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function updateServiceReqDetail(Request $req)
    {
        try {
            Service_request::where('id', $req->input('id'))->update([
                'approve' => $req->input('approve'),
            ]);
            return response()->json(array("sent" => 1, "message" => "Info updated successfully!", "status" => "pass"));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function updateVisitorResidentDetail(Request $req)
    {
        try {
            User::where('email', $req->input('email'))->update([
                'fname' => $req->input('fname'),
                'lname' => $req->input('lname'),
                'contact' => $req->input('contact'),
                'dob' => $req->input('dob'),
                'license' => $req->input('lic'),
                'address' => $req->input('address'),
            ]);
            return response()->json(array("sent" => 1, "message" => "Info updated successfully!", "status" => "pass"));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function updateAmenityDetail(Request $req)
    {
        try {
            Garden_and_pool::where('id', $req->input('id'))->update([
                'name' => $req->input('amenityName'),
                'start_time' => $req->input('start_time'),
                'end_time' => $req->input('end_time'),
            ]);
            return response()->json(array("sent" => 1, "message" => "Info updated successfully!", "status" => "pass"));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    //-=-=-=-=--=-=-=-=-=- DELETE FUNCTIONS-=-=-=-=--=-=-=--=-=-=-=-=-=-
    function deleteManager(Request $req)
    {
        try {
            User::where('email', $req->input('email'))->delete();
            return response()->json(array("sent" => 1, "message" => "Info deleted successfully!", "status" => "pass"));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function deleteFlatDetail(Request $req)
    {
        try {
            Building::where('bldgnum', $req->input('bldg'))->where('aptnum', $req->input('apt'))->delete();
            return response()->json(array("sent" => 1, "message" => "Info deleted successfully!", "status" => "pass"));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function deleteServiceDetail(Request $req)
    {
        try {
            Service::where('id', $req->input('id'))->delete();
            return response()->json(array("sent" => 1, "message" => "Info deleted successfully!", "status" => "pass"));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function deleteServiceReqDetail(Request $req)
    {
        try {
            Service_request::where('id', $req->input('id'))->delete();
            return response()->json(array("sent" => 1, "message" => "Info deleted successfully!", "status" => "pass"));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function deleteResidentVisitorDetail(Request $req)
    {
        try {
            User::where('email', $req->input('email'))->delete();
            return response()->json(array("sent" => 1, "message" => "Info deleted successfully!", "status" => "pass"));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function deleteAmenityDetail(Request $req)
    {
        try {
            Garden_and_pool::where('id', $req->input('id'))->delete();
            return response()->json(array("sent" => 1, "message" => "Info deleted successfully!", "status" => "pass"));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }


    // -=-=-=-=-=-=-=-=-=-=-ADD/POST FUNCTIONS=-=-=-=-=-=-=-=-=-=-=-=

    function addNewFlatDetail(Request $req)
    {
        try {
            $user = User::where('email', $req->ownerId)->first();
            $bldgData = new Building();
            if ($user) {
                $bldgData->bldgnum = $req->input('bldg');
                $bldgData->aptnum = $req->input('apt');
                $bldgData->owner = $req->input('owner');
                $bldgData->owner_id = $req->input('ownerId');
                $bldgData->save();
                return response()->json(array("sent" => 1, "message" => "Info added successfully!", "status" => "pass"));
            } else {
                return response()->json(['status' => 'fail', 'message' => 'No user found with that ID!']);
            }
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function addNewServiceDetail(Request $req)
    {
        try {
            $srviceData = new Service();
            $srviceData->service_name = $req->input('service_name');
            $srviceData->category = $req->input('category');
            $srviceData->start_time = $req->input('start_time');
            $srviceData->end_time = $req->input('end_time');
            $srviceData->save();
            return response()->json(array("sent" => 1, "message" => "Info added successfully!", "status" => "pass"));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    function addNewAmenityDetail(Request $req)
    {
        try {
            $amenityData = new Garden_and_pool();
            $amenityData->type = $req->input('type');
            $amenityData->name = $req->input('amenityName');
            $amenityData->start_time = $req->input('start_time');
            $amenityData->end_time = $req->input('end_time');
            $amenityData->save();
            return response()->json(array("sent" => 1, "message" => "Info added successfully!", "status" => "pass"));
            //code...
        } catch (Exception $e) {
            return response()->json($e);
        }
    }
}
