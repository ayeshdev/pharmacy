<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Prescription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class PrescriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request,ImageController $imageController)
    {
        //
    $userId = Auth::id();
    $images = $request->file('images');
    $uniqueCode = 123;

        $data = $request->validate([
        'note'=>'required',
        'street_1'=>'required',
        'street_2'=>'required',
        'district'=>'required',
        'delivery_time'=>'required',
        ]);

        $savedData = Prescription::create([
        'note'=>$request->note,
        'street_1'=>$request->street_1,
        'street_2'=>$request->street_2,
        'district'=>$request->district,
        'delivery_time'=>$request->delivery_time,
        'user_id'=>$userId,
        'pres_code'=>$uniqueCode
        ]);

    
        // dd($newImage);

        // $prescription = new Prescription();
        // $prescription->images()->save($newImage);

        $pres_id = $savedData->id;

        $imageController->store($pres_id,$images);

        // $response = Http::post(route('images.store'),['pres_id'=>$pres_id]);
        // return $response->status();
    
    // dd($images);

    // foreach ($images as $image) {

    //     $imageData = file_get_contents($image->getRealPath());

    //     $newImage = new Image();
    //     $newImage->filename = $image->getClientOriginalName();
    //     $newImage->mime = $image->getClientMimeType();
    //     $newImage->data = $imageData;

    //     dd($newImage);

    //     $prescription->images()->save($newImage);
    // }

    }

    /**
     * Display the specified resource.
     */
    public function show(Prescription $prescription)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Prescription $prescription)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Prescription $prescription)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Prescription $prescription)
    {
        //
    }
}