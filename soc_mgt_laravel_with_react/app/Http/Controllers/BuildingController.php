<?php

namespace App\Http\Controllers;

use App\Models\Building;
use Exception;
use Illuminate\Http\Request;

class BuildingController extends Controller
{
    //
    public function getBuildingData()
    {
        try {
            //code...\
            $bldg = Building::distinct()->get(['bldgnum']);
            $apt = Building::distinct()->get(['aptnum']);
            return response()->json(array('bldg' => $bldg, 'apt' => $apt, 'status' => 'success'));
        } catch (Exception $e) {
            return response()->json($e);
        }
    }
}
