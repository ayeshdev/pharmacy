<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'prescription_id',
        'filename', 
        'mime',
        'pres_code'];

    public function prescription()
    {
        return $this->belongsTo(Prescription::class);
    }
}
