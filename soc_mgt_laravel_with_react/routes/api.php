
<?php

use App\Http\Controllers\AdminManagerController;
use App\Http\Controllers\BuildingController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ResidentController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\VisitorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// ------------------------------------HOME API------------------------------------
Route::post('contact-us-query',[HomeController::class,'addUserQueryToContactUs']);

Route::get('get-resident-photo-uploads-data',[HomeController::class,'getResidentPhotoUploads']);

// ------------------------------------USER API------------------------------------
Route::post('register-user',[UsersController::class,'register']);

Route::post('login-user',[UsersController::class,'login']);

// ------------------------------------COMMON API--------------------------------------------
Route::get('get-buildings',[BuildingController::class,'getBuildingData']);

//------------------------------------ ADMIN-MANAGER CRUD API------------------------------------

// GET
Route::get('get-dashboard-data',[AdminManagerController::class,'getDashboardData']);

Route::get('get-managers',[AdminManagerController::class,'getManagerList']);

Route::get('get-buildings-data',[AdminManagerController::class,'getBuildingsList']);

Route::get('get-services-data',[AdminManagerController::class,'getServicesList']);

Route::get('get-service-requests-data',[AdminManagerController::class,'getServiceRequestList']);

Route::get('get-resident-visitor-data',[AdminManagerController::class,'getResidentVisitorList']);

Route::get('get-amenity-data',[AdminManagerController::class,'getGardenPoolList']);

// UPDATE
Route::put('edit-manager',[AdminManagerController::class,'updateManagerDetail']);

Route::put('edit-flat-detail',[AdminManagerController::class,'updateFlatDetail']);

Route::put('edit-service-detail',[AdminManagerController::class,'updateServiceDetail']);

Route::put('edit-service-req-detail',[AdminManagerController::class,'updateServiceReqDetail']);

Route::put('edit-resident-visitor-detail',[AdminManagerController::class,'updateVisitorResidentDetail']);

Route::put('edit-amenity-detail',[AdminManagerController::class,'updateAmenityDetail']);

// DELETE
Route::delete('delete-manager',[AdminManagerController::class,'deleteManager']);

Route::delete('delete-flat-detail',[AdminManagerController::class,'deleteFlatDetail']);

Route::delete('delete-service-detail',[AdminManagerController::class,'deleteServiceDetail']);

Route::delete('delete-service-req-detail',[AdminManagerController::class,'deleteServiceReqDetail']);

Route::delete('delete-resident-visitor-detail',[AdminManagerController::class,'deleteResidentVisitorDetail']);

Route::delete('delete-amenity-detail',[AdminManagerController::class,'deleteAmenityDetail']);

// ADD/POST
Route::post('add-new-flat-detail',[AdminManagerController::class,'addNewFlatDetail']);

Route::post('add-new-service-detail',[AdminManagerController::class,'addNewServiceDetail']);

Route::post('add-new-amenity-detail',[AdminManagerController::class,'addNewAmenityDetail']);

//------------------------------------ RESIDENT API------------------------------------

Route::get('get-resident-service-req-list',[ResidentController::class,'getResidentServiceReqList']);

Route::post('book-resident-service-req',[ResidentController::class,'bookResidentServiceRequest']);

Route::get('get-resident-visit-requests',[ResidentController::class,'getResidentVisitRequests']);

Route::put('approve-visitor-request',[ResidentController::class,'approveVisitorRequest']);

Route::post('add-new-photo-resident',[ResidentController::class,'addNewResidentPhotoUpload']);

//------------------------------------ VISITOR API------------------------------------

Route::post('check-in-req-visitor-resident',[VisitorController::class,'checkInRequestVisitor']);

Route::get('get-visitor--checkin-req-list',[VisitorController::class,'getResidentVisitorList']);

Route::put('check-out-visitor-from-apt',[VisitorController::class,'checkOutVisitorFromApt']);

Route::get('get-garden-list-visitor',[VisitorController::class,'getGardenListVisitor']);

Route::get('check-garden-access-visitor',[VisitorController::class,'checkIfCanVisitGarden']);

Route::post('post-visitor-incident-detail',[VisitorController::class,'postVisitorIncidentDetails']);

//------------------------------------ CHAT API------------------------------------

Route::get('get-chat-data',[ChatController::class,'getChatData']);

Route::post('add-chat-data',[ChatController::class,'addChatData']);
