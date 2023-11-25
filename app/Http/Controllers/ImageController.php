<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Exception;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function store($id, $images)
    {

        foreach ($images as $image) {

            $imageData = file_get_contents($image->getRealPath());

            $newImage = new Image();
            $newImage->filename = $image->getClientOriginalName();
            $newImage->mime = $image->getClientMimeType();
            $newImage->data = $imageData;


            try {
                Image::create([
                    'prescription_id' => $id,
                    'filename' => $newImage->filename,
                    'mime' => $newImage->mime,
                    'pres_code' => "123"
                ]);

                $image->move(public_path('uploads'), $newImage->filename);
            } catch (Exception $e) {
                dd($e->getMessage());
            }
        }
    }
}
